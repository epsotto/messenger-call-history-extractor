import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";
import { FilterOptions } from "../../common/types";

type UserDetailProps = {
  applyFilters: (filters: FilterOptions) => void;
};

const UserDetail = (props: UserDetailProps) => {
  const [userName, setUserName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <div style={{ marginTop: "20px" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TextField
          required
          value={userName}
          onChange={(element) => setUserName(element.currentTarget.value)}
          id="user-name"
          label="Facebook Username"
          placeholder="John Doe"
        />
        <DesktopDatePicker
          label="Start Date"
          maxDate={endDate}
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="Start Date"
          maxDate={new Date()}
          minDate={startDate}
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <Button
          onClick={() =>
            props.applyFilters({
              userName: userName ?? "",
              startDate: startDate ?? new Date(),
              endDate: endDate ?? new Date()
            })
          }
          variant="contained"
        >
          Apply
        </Button>
      </LocalizationProvider>
    </div>
  );
};

export default UserDetail;
