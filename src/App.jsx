import "./styles.css";
import DataGridComponent from "./DataGridComp";
import { parseISO, format, parse } from "date-fns";

import { dummyData } from "./dummyData";

export default function App() {
  const gridColumns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      disableColumnMenu: true,
      hide: true,
      type: "number"
    },
    {
      field: "userId",
      headerName: "userId",
      disableColumnMenu: true,
      minWidth: 130,
      type: "number"
      // filterOperators: getGridNumberOperators()
    },
    {
      field: "created_at",
      headerName: "Date",
      disableColumnMenu: true,
      minWidth: 230,
      type: "date",
      valueFormatter: ({ value }) => {
        if (value) {
          const date = parseISO(value);
          const formattedDate = format(date, "dd/MM/yyyy");
          return formattedDate;
        } else {
          return "";
        }
      }
      // valueGetter: ({ value }) => {
      //   console.log(value);
      //   const date = parse(value, "MM/dd/yyyy", new Date()).setHours(
      //     0,
      //     0,
      //     0,
      //     0
      //   );
      //   console.log(date);
      //   return date;
      // }
    },
    {
      field: "title",
      headerName: "title",
      disableColumnMenu: true,
      minWidth: 200
    },
    {
      field: "body",
      headerName: "body",
      disableColumnMenu: true,
      flex: 1
    }
  ];

  const baseColumn = {
    name: "date",
    type: "date"
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#e3e3e3",
        height: "120vh"
      }}
    >
      <DataGridComponent
        data={dummyData}
        gridColumns={gridColumns}
        baseColumn={baseColumn}
      />
    </div>
  );
}
