import React, { useState } from "react";

import {
    Paper,
    Box,
    makeStyles,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemText,
    ListItemIcon,
    Link,
    Icon,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import DownloadIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";

import { StoredFilesType } from "../sampleData/storedFiles";

type DocumentItemProps = {
    document: StoredFilesType;
    onDelete: Function;
};

function DocumentItem({ document, onDelete }: DocumentItemProps) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<any>(false);

    function handleOpenMenu(e: any) {
        setAnchorEl(e.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function handleDelete() {
        onDelete(document.id);
    }

    return (
        <Paper classes={{ root: classes.root }}>
            <div className={classes.header}>
                {/* <Icon className={classes.icon}>
                    <ContentTypeIcon contentType={document.contentType} />
                </Icon> */}
                <Typography classes={{ root: classes.title }}>
                    {document.filename}
                </Typography>
                <IconButton
                    classes={{ root: classes.moreButton }}
                    size="small"
                    onClick={handleOpenMenu}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem
                        component={Link}
                        href={`/api/documents/${document.id}?disposition=attachment`}
                    >
                        <ListItemIcon>
                            <DownloadIcon />
                        </ListItemIcon>
                        <ListItemText>Download</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </Paper>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    header: {
        display: "flex",
        height: 48,
        alignItems: "center",
        background: "#64b5f6",
    },
    icon: {
        padding: "0 12px",
    },
    title: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        flex: "1 1 auto",
        textAlign: "center",
    },
    moreButton: {
        marginRight: 8,
    },
    thumbnailRoot: {
        width: "auto",
        height: "auto",
        aspectRatio: "1 / 1",
        borderRadius: 4,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    thumbnail: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    },
    placeholderThumbnailRoot: {
        width: "auto",
        height: "auto",
        aspectRatio: "1 / 1",
        borderRadius: 4,
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
}));

export default DocumentItem;
