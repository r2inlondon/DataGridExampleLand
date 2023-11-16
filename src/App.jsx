import React, { useState, useEffect } from "react";
import "./styles.css";
import { parseISO, format } from "date-fns";
import { IconButton } from "@material-ui/core";

import { addNumberOperators, getOperatorsFromBase } from "./numberOperators";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DataGridComponent from "./DataGridComp";

import { dummyData } from "./dummyData";

export default function App() {
    const [rowsData, setRowsData] = useState([]);

    useEffect(() => {
        setRowsData(dummyData);
    }, [dummyData]);

    function handleDelete(deleteRow) {
        setRowsData((prevRows) =>
            prevRows.filter((row) => row.id !== deleteRow.id)
        );
    }

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
            width: 200,
            type: "string",
        },
        {
            field: "body",
            headerName: "body",
            disableColumnMenu: true,
            flex: 1,
            type: "string",
        },
        {
            field: "actions",
            headerName: " ",
            type: "actions",
            width: 100,
            disableColumnMenu: true,
            renderCell: ({ row }) => (
                <IconButton onClick={() => handleDelete(row)}>
                    <DeleteOutlineIcon />
                </IconButton>
            ),
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
                data={rowsData}
                gridColumns={columnsChecked}
                baseColumn={baseColumn}
                baseColumnOperators={baseColumnOperators}
            />
        </div>
    );
}
