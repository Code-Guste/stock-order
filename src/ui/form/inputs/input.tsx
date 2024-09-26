import { TextField } from "@mui/material";
import React from "react";

import { InputProps } from "@Utils/form";
import { noop } from "@Utils/utilities";

type FormInputProps<Value> = {
  label?: string;
  type?: string;
  disabled?: boolean;
  readOnly?: boolean;
} & InputProps<Value>;

const FormInput = <Value extends string | number | null>({
  value,
  onChange = noop,
  label,
  error,
  disabled,
  type = "text",
  readOnly,
  ...rest
}: FormInputProps<Value>) => {
  return (
    <TextField
      {...rest}
      fullWidth
      label={label}
      value={value || ""}
      onChange={(e) => {
        onChange(e.target.value as Value);
      }}
      type={type}
      aria-readonly={readOnly}
    />
  );
};

export default FormInput;
