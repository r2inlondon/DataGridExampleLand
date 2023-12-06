import React, { Fragment, useState } from "react";

import { IconButton, Badge, Popover } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

import {
    DocumentsColumnsInt,
    DocumentsColumnsWithOpValues,
} from "./utils/columnsTypes";
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
    columns: DocumentsColumnsInt[];
    handlePopoverOpen: (event: any) => void;
    open: boolean;
    anchorEl: any;
    handlePopoverClose: () => void;
    isFilterOn: boolean;
    setIsFilterOn: (isFilterOn: boolean) => void;
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
    } = props;

    const [cachedFilter, setCachedFilter] = useState<
        CachedFilterType | undefined
    >();

    const baseColumn: DocumentsColumnsInt = columns[1];

    return (
        <Fragment>
            <IconButton
                data-test="filter-button"
                size="small"
                color="primary"
                id={open ? "simple-popover" : undefined}
                aria-haspopup="true"
                onClick={handlePopoverOpen}
            >
                <Badge
                    data-test="filter-badge"
                    badgeContent={isFilterOn ? 1 : 0}
                    color="primary"
                >
                    <FilterListIcon />
                </Badge>
            </IconButton>
            <Popover
                data-test="filter-popover"
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
                />
            </Popover>
        </Fragment>
    );
}

export default FilterContainer;
