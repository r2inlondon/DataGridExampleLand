import DataGridComponent from "./DataGridComp";
import { parseISO, format, parse } from "date-fns";
import { initColumnsWithOperators } from "./initColumnsWithOperators";

// import { dummyData } from "./dummyData";

export default function App() {
    const gridColumns = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
            disableColumnMenu: true,
            hide: true,
            type: "number",
        },
        {
            field: "name",
            headerName: "name",
            disableColumnMenu: true,
            minWidth: 130,
            type: "string",
            // filterOperators: getGridNumberOperators()
        },
        {
            field: "filetype",
            headerName: "Type",
            disableColumnMenu: true,
            flex: 1,
            type: "string",
        },
        {
            field: "size",
            headerName: "Size",
            disableColumnMenu: true,
            flex: 150,
            type: "string",
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
            },
            // filterOperators: getGridNumberOperators()
        },
    ];

    const columnsWithOperators = initColumnsWithOperators(gridColumns);
    const baseColumn = columnsWithOperators[1];

    return (
        <div
            className="App"
            style={{
                backgroundColor: "#e3e3e3",
                height: "120vh",
            }}
        >
            <DataGridComponent
                data={storedFiles}
                gridColumns={columnsWithOperators}
                baseColumn={baseColumn}
            />
        </div>
    );
}
