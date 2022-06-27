import { Alert, Button, Snackbar, styled, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useRef, useState } from "react";
import { FilterOptions } from "../../common/types";

type UserDetailProps = {
  applyFilters: (filters: FilterOptions) => void;
};

const ContainerHiddenOnPrint = styled("div")({
  marginTop: "20px",
  "@media print": {
    display: "none"
  }
});

const UserDetail = (props: UserDetailProps) => {
  const [userName, setUserName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const errorMessage = useRef<string>();

  const handleApply = () => {
    if (userName === "") {
      errorMessage.current = "User name should be filled out.";
      setOpenSnackbar(true);
      return;
    }
    props.applyFilters({
      userName: userName ?? "",
      startDate: startDate ?? new Date(),
      endDate: endDate ?? new Date()
    });
  };

  return (
    <ContainerHiddenOnPrint>
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
        <Button onClick={() => handleApply()} variant="contained">
          Apply
        </Button>
      </LocalizationProvider>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={4000}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: "100%" }}>
          {errorMessage.current}
        </Alert>
      </Snackbar>
    </ContainerHiddenOnPrint>
  );
};

export default UserDetail;
