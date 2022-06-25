import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { FilterOptions, Message, Participant } from "./common/types";
import UserDetail from "./components/User Detail/UserDetail";
import * as jsonData1 from "./json files/message_1.json";
import * as jsonData2 from "./json files/message_2.json";
import * as jsonData3 from "./json files/message_3.json";
import * as jsonData4 from "./json files/message_4.json";
import * as jsonData5 from "./json files/message_5.json";
import * as jsonData6 from "./json files/message_6.json";
import * as jsonData7 from "./json files/message_7.json";
import * as jsonData8 from "./json files/message_8.json";
import * as jsonData9 from "./json files/message_9.json";
import * as jsonData10 from "./json files/message_10.json";
import * as jsonData11 from "./json files/message_11.json";
import * as jsonData12 from "./json files/message_12.json";
import * as jsonData13 from "./json files/message_13.json";
import * as jsonData14 from "./json files/message_14.json";
import * as jsonData15 from "./json files/message_15.json";
import * as jsonData16 from "./json files/message_16.json";
import * as jsonData17 from "./json files/message_17.json";
import * as jsonData18 from "./json files/message_18.json";
import * as jsonData19 from "./json files/message_19.json";
import ResultGrid from "./components/Result Grid/ResultGrid";

const dataset1 = jsonData1;
const dataset2 = jsonData2;
const dataset3 = jsonData3;
const dataset4 = jsonData4;
const dataset5 = jsonData5;
const dataset6 = jsonData6;
const dataset7 = jsonData7;
const dataset8 = jsonData8;
const dataset9 = jsonData9;
const dataset10 = jsonData10;
const dataset11 = jsonData11;
const dataset12 = jsonData12;
const dataset13 = jsonData13;
const dataset14 = jsonData14;
const dataset15 = jsonData15;
const dataset16 = jsonData16;
const dataset17 = jsonData17;
const dataset18 = jsonData18;
const dataset19 = jsonData19;

const App = () => {
  const dataset = useRef<Message[]>();
  const [participants, setParticipants] = useState<Participant[]>();
  const [callHistory, setCallHistory] = useState<Message[]>();
  const [filters, setFilters] = useState<FilterOptions | undefined>({
    userName: "",
    startDate: new Date(),
    endDate: new Date()
  });

  useEffect(() => {
    setParticipants(dataset1.participants);

    dataset.current = [
      ...dataset1.messages,
      ...dataset2.messages,
      ...dataset3.messages,
      ...dataset4.messages,
      ...dataset5.messages,
      ...dataset6.messages,
      ...dataset7.messages,
      ...dataset8.messages,
      ...dataset9.messages,
      ...dataset10.messages,
      ...dataset11.messages,
      ...dataset12.messages,
      ...dataset13.messages,
      ...dataset14.messages,
      ...dataset15.messages,
      ...dataset16.messages,
      ...dataset17.messages,
      ...dataset18.messages,
      ...dataset19.messages
    ];
  }, []);

  useEffect(() => {
    if (filters && filters.startDate && filters.endDate) {
      setCallHistory(
        dataset.current
          ?.filter(
            (x) =>
              x.type === "Call" &&
              x.timestamp_ms > new Date(filters.startDate).getTime() &&
              x.timestamp_ms < new Date(filters.endDate).getTime()
          )
          .sort((x) => x.timestamp_ms)
      );
    }
  }, [filters]);

  const applyFilters = (filters: FilterOptions) => {
    setFilters(filters);
  };

  return (
    <div className="App">
      <UserDetail applyFilters={applyFilters} />
      <ResultGrid callHistory={callHistory ?? []} participants={participants ?? []} />
    </div>
  );
};

export default App;
