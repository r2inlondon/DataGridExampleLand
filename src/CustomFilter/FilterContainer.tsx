import React, { Fragment, useState } from "react";

import { IconButton, Badge, Popover } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { GridColDef } from "@mui/x-data-grid";

import { DocumentsColumnsWithOpValues } from "./utils/columnsTypes";
import { StoredFilesType } from "../sampleData/storedFiles";

import CustomFilterPanel from "./CustomFilterPanel";

export type CachedFilterType = {
    column: DocumentsColumnsWithOpValues;
    operator: string;
    value: string;
};

type ComponentProps = {
    documents: StoredFilesType[];
    filteredItems: StoredFilesType[];
    setFilteredItems: (items: StoredFilesType[]) => void;
    columns: GridColDef[];
    handlePopoverOpen: (event: any) => void;
    open: boolean;
    anchorEl: any;
    handlePopoverClose: () => void;
    isFilterOn: boolean;
    setIsFilterOn: (isFilterOn: boolean) => void;
    titleDeedFilter: boolean;
};

function FilterContainer(props: ComponentProps) {
    const {
        documents,
        filteredItems,
        setFilteredItems,
        columns,
        handlePopoverOpen,
        open,
        anchorEl,
        handlePopoverClose,
        isFilterOn,
        setIsFilterOn,
        titleDeedFilter,
    } = props;

    const [cachedFilter, setCachedFilter] = useState<
        CachedFilterType | undefined
    >();

    const baseColumn: GridColDef = columns[1];

    return (
        <Fragment>
            <IconButton
                size="small"
                color="primary"
                id={open ? "simple-popover" : undefined}
                aria-haspopup="true"
                onClick={handlePopoverOpen}
            >
                <Badge badgeContent={isFilterOn ? 1 : 0} color="primary">
                    <FilterListIcon />
                </Badge>
            </IconButton>
            <Popover
                id="simple-popover"
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <CustomFilterPanel
                    data={documents}
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                    columns={columns}
                    baseColumn={baseColumn}
                    setIsFilterOn={setIsFilterOn}
                    isFilterOn={isFilterOn}
                    cachedFilter={cachedFilter}
                    setCachedFilter={setCachedFilter}
                    handlePopoverClose={handlePopoverClose}
                    titleDeedFilter={titleDeedFilter}
                />
            </Popover>
        </Fragment>
    );
}

FilterContainer.defaultProps = {
    titleDeedFilter: false,
};

export default FilterContainer;
