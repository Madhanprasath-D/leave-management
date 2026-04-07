import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker  } from "@mui/x-date-pickers/DatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

const CustomDatePicker = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());

  return (
    <DatePicker
      value={value}
      onChange={(newValue) => setValue(newValue)}
      slotProps={{
        textField: {
          fullWidth: true,
        },
      }}
    />
  );
};

export default CustomDatePicker;