import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState, useEffect } from "react";
import { Message, Participant } from "../../common/types";

type ResultGridProps = {
  callHistory: Message[];
  participants: Participant[];
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
    <div>
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
              <TableCell>{new Date(x.timestamp_ms).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(x.timestamp_ms).toLocaleTimeString()}</TableCell>
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
