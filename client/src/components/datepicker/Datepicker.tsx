import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomDatePicker = ({ value, onChange }: any) => {
    const [open, setOpen] = React.useState(false);
  return (
    <DatePicker
      value={value}

      className="bg-appbg-section rounded-md p-3"
      onChange={(newValue) => onChange(newValue)}

      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      
      slotProps={{
        textField: {
          onClick: () => setOpen(true),
          variant: "outlined",
          fullWidth: true,
          InputProps: {
            className:
              " border p-2 bg-appbg-section border-white/20 text-txt-sub outline-none rounded-lg",
          },
          sx: {
            "& .MuiInputBase-root": {
              border: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              padding: "10px 12px",
            },
            "& .MuiSvgIcon-root": {
              color: "#94A3B8", 
            },
          },
        },
      }}
    />
  );
};

export default CustomDatePicker;