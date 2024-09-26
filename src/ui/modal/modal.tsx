import { produce } from "immer";
import React, { useCallback, useContext, useState } from "react";

import { noop } from "@Utils/utilities";

export type ModalProps = {
  closeModal: (param?: PromiseResolvePayload<"CLOSE">) => void;
};

type PromiseResolvePayload<A extends string = string> = { action: A; [key: string]: unknown };

type ModalContextType = {
  showModal<P extends ModalProps>(options: {
    component: React.FunctionComponent<P>;
    props?: Omit<P, "closeModal">;
    closeable?: boolean;
  }): Promise<NonNullable<Parameters<P["closeModal"]>[0]> | PromiseResolvePayload<"CLOSE">>;
  closeModal(data?: PromiseResolvePayload): void;
};

let modalId = 1;

const ModalContext = React.createContext<ModalContextType>({
  showModal: () => Promise.resolve({ action: "CLOSE" }),
  closeModal: noop,
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<{
    modals: {
      id: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: React.FunctionComponent<any>;
      props?: { [key: string]: unknown };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      resolve: (data: PromiseResolvePayload<any>) => void;
      closeable: boolean;
    }[];
  }>({
    modals: [],
  });

  const showModal = useCallback<ModalContextType["showModal"]>(({ component, props, closeable = true }) => {
    return new Promise((resolve) => {
      setState((prevState) =>
        produce(prevState, (draft) => {
          draft.modals.push({ component, props, resolve, closeable, id: modalId++ });
          return draft;
        }),
      );
    });
  }, []);

  const closeModal = useCallback<ModalContextType["closeModal"]>((data = { action: "CLOSE" }) => {
    setState((prevState) =>
      produce(prevState, (draft) => {
        const lastModal = draft.modals.pop();
        lastModal?.resolve(data);
        return draft;
      }),
    );
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {state.modals.map((modal) => {
        const Modal = modal.component;

        return (
          <div key={modal.id}>
            <div className="contents">
              <Modal {...modal.props} closeModal={closeModal} />
            </div>
          </div>
        );
      })}
    </ModalContext.Provider>
  );
};
