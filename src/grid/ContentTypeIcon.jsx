import React from "react";

import FileGifIcon from "mdi-react/FileGifBoxIcon"; // GIF
import FileJpegIcon from "mdi-react/FileJpgBoxIcon"; // JPG/JPEG
import FilePngIcon from "mdi-react/FilePngBoxIcon"; //PNG
import FileXmlIcon from "mdi-react/XmlIcon"; // XML
import FileDelimitedIcon from "mdi-react/FileDelimitedIcon"; // CSV
import FilePdfIcon from "mdi-react/FilePdfBoxIcon"; // PDF
import FileJsonIcon from "mdi-react/CodeJsonIcon"; // JSON
import FileDocumentIcon from "mdi-react/FileDocumentIcon"; // WORD
import FileSpreadsheetIcon from "mdi-react/GoogleSpreadsheetIcon"; // EXCEL
import FilePresentationIcon from "mdi-react/FilePresentationBoxIcon"; // POWERPOINT
import FileTextIcon from "mdi-react/FileDocumentIcon"; // text/*
import FileImageIcon from "mdi-react/FileImageIcon"; // image/*
import FileAudioIcon from "mdi-react/FileMusicIcon"; // audio/*
import FileVideoIcon from "mdi-react/FileVideoIcon"; // video/*
import FileIcon from "mdi-react/FileIcon"; // video/*

function ContentTypeIcon({ contentType, ...otherProps }) {
    const mime = contentType.split("/");
    switch (mime[0]) {
        case "application":
            if (mime.length > 1) {
                switch (mime[1]) {
                    case "pdf":
                        return <FilePdfIcon {...otherProps} />;
                    case "json":
                        return <FileJsonIcon {...otherProps} />;
                    case "xml":
                        return <FileXmlIcon {...otherProps} />;
                }
                if (mime[1].includes("spreadsheet"))
                    return <FileSpreadsheetIcon {...otherProps} />;
                if (mime[1].includes("excel"))
                    return <FileSpreadsheetIcon {...otherProps} />;
                if (mime[1].includes("presentation"))
                    return <FilePresentationIcon {...otherProps} />;
                if (mime[1].includes("powerpoint"))
                    return <FilePresentationIcon {...otherProps} />;
                if (mime[1].includes("word"))
                    return <FileDocumentIcon {...otherProps} />;
                if (mime[1].includes("document"))
                    return <FileDocumentIcon {...otherProps} />;
                // TODO - Include zip files here?
            }
            break;
        case "text":
            if (mime.length > 1) {
                switch (mime[1]) {
                    case "csv":
                        return <FileDelimitedIcon {...otherProps} />;
                }
            }
            return <FileTextIcon />;
        case "image":
            if (mime.length > 1) {
                switch (mime[1]) {
                    case "gif":
                        return <FileGifIcon {...otherProps} />;
                    case "jpeg":
                        return <FileJpegIcon {...otherProps} />;
                    case "png":
                        return <FilePngIcon {...otherProps} />;
                }
            }
            return <FileImageIcon {...otherProps} />;
        case "audio":
            return <FileAudioIcon {...otherProps} />;
        case "video":
            return <FileVideoIcon {...otherProps} />;
    }
    return <FileIcon {...otherProps} />;
}

export default ContentTypeIcon;
