import { Chip, Stack } from "@mui/material";
import React from "react";

import { typedSx } from "@App/theme/sxTheme";
import { noop } from "@Utils/utilities";

type MultipleChipsInputProps = {
  options: { value: string; label: string }[];
  onChange?: (value: string) => void;
  value: string;
};

const MultipleChipsInput = ({ options, onChange = noop, value }: MultipleChipsInputProps) => {
  const handleChipClick = (value: string) => {
    onChange(value);
  };

  return (
    <Stack direction="row" spacing={2}>
      {options.map((chip) => {
        const isSelected = value === chip.value;

        return (
          <Chip
            key={chip.value}
            label={chip.label}
            color="default"
            onClick={() => handleChipClick(chip.value)}
            sx={{
              ...styles.chip,
              backgroundColor: isSelected
                ? (theme) => theme.palette.background.purple
                : (theme) => theme.palette.background.grey400,
              color: isSelected ? (theme) => theme.palette.text.white : (theme) => theme.palette.text.purple,
            }}
          />
        );
      })}
    </Stack>
  );
};

export default MultipleChipsInput;

const styles = typedSx({
  chip: {
    "&:hover": {
      opacity: 0.9,
    },
    "&:focus": {
      backgroundColor: (theme) => theme.palette.background.purple,
    },
  },
});
