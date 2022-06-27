import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Message, Participant, FilterOptions } from "../../common/types";

type ResultGridProps = {
  callHistory: Message[];
  participants: Participant[];
  filterDetails?: FilterOptions;
};

const ResultGrid = (props: ResultGridProps) => {
  const [gridData, setGridData] = useState<Message[]>();

  useEffect(() => {
    if (props.callHistory && props.callHistory.length > 0) {
      setGridData(props.callHistory);
    }
  }, [props.callHistory]);

  const convertDurationToTimeFormat = (duration: number): string => {
    const mins_num = parseFloat(duration + "");
    const hours = Math.floor(mins_num / 60);
    const minutes = Math.floor(mins_num - (hours * 3600) / 60);
    const seconds = Math.floor(mins_num * 60 - hours * 3600 - minutes * 60);

    return `${hours < 10 ? `0${hours}` : `${hours}`} : ${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${
      seconds < 10 ? `0${seconds}` : `${seconds}`
    }`;
  };

  return (
    <div style={{ padding: "10px" }}>
      {props.filterDetails?.userName !== "" && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h4" textAlign="left">
            Call History records for{" "}
            <span style={{ textTransform: "capitalize" }}>{props.filterDetails?.userName}</span> with{" "}
            {props.participants
              .filter((x) => x.name.toUpperCase() !== props.filterDetails?.userName.toUpperCase())
              .map((x) => x.name)}
            .
          </Typography>
          <Typography variant="h5" textAlign="left">
            {`Call History range from ${props.filterDetails?.startDate.toLocaleDateString("en-nz")} to
            ${props.filterDetails?.endDate.toLocaleDateString("en-nz")}`}
          </Typography>
        </div>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gridData?.map((x) => (
            <TableRow key={`data-${x.timestamp_ms}`}>
              <TableCell>{new Date(x.timestamp_ms).toLocaleDateString("en-nz")}</TableCell>
              <TableCell>{new Date(x.timestamp_ms).toLocaleTimeString("en-nz")}</TableCell>
              <TableCell>{x.content}</TableCell>
              <TableCell>{x.call_duration ? convertDurationToTimeFormat(x.call_duration) : ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultGrid;
