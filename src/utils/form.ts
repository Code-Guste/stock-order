import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

export type InputProps<Value> = {
  onChange?: (value: Value) => void;
  //onBlur?: (e?: FocusEvent) => void;
  value: Value;
  name: string;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
};

export const mapToInputProps = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}): InputProps<FieldPathValue<TFieldValues, TName>> => {
  return {
    onChange: field.onChange,
    // onBlur: field.onBlur,
    value: field.value,
    name: field.name,
    inputRef: field.ref,
    error: fieldState.error?.message,
  };
};
