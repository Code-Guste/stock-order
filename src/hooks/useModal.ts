import { useState } from "react";

export const useModal = (initialState = false) => {
  const [isModalOpen, setModalOpen] = useState(initialState);
  const toggleModal = () => setModalOpen(!isModalOpen);
  return { isModalOpen, setModalOpen, toggleModal };
};
