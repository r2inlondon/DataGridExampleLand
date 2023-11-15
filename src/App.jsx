import "./styles.css";
import DataGridComponent from "./DataGridComp";
import { parseISO, format, parse } from "date-fns";
import { addNumberOperators, getOperatorsFromBase } from "./numberOperators";

import { dummyData } from "./dummyData";

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
            field: "userId",
            headerName: "User ID",
            disableColumnMenu: true,
            minWidth: 130,
            type: "number",
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
        },
        {
            field: "title",
            headerName: "title",
            disableColumnMenu: true,
            minWidth: 200,
            type: "string",
        },
        {
            field: "body",
            headerName: "body",
            disableColumnMenu: true,
            flex: 1,
            type: "string",
        },
    ];

    const columnsChecked = addNumberOperators(gridColumns);
    const baseColumn = columnsChecked[1];
    const baseColumnOperators = getOperatorsFromBase(baseColumn);

    return (
        <div
            className="App"
            style={{
                backgroundColor: "#e3e3e3",
                height: "120vh",
            }}
        >
            <DataGridComponent
                data={dummyData}
                gridColumns={columnsChecked}
                baseColumn={baseColumn}
                baseColumnOperators={baseColumnOperators}
            />
        </div>
    );
}
