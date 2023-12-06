export type StoredFilesType = {
    id: number;
    filename: string;
    filetype: string;
    size: number;
    created_at: string;
};

export const storedFiles: StoredFilesType[] = [
    {
        id: 1,
        filename: "liBros.xls",
        filetype: "Excel file",
        size: 4324521,
        created_at: "2023-11-21T18:54:23.081Z",
    },
    {
        id: 2,
        filename: "budged.xls",
        filetype: "Excel file",
        size: 232341,
        created_at: "2023-10-27T13:50:50.687Z",
    },
    {
        id: 3,
        filename: "application.pdf",
        filetype: "PDF file",
        size: 324521,
        created_at: "2023-10-27T13:50:55.646Z",
    },
    {
        id: 4,
        filename: "avatar.jpeg",
        filetype: "Image file",
        size: 11,
        created_at: "2023-11-13T18:07:15.732Z",
    },
    {
        id: 5,
        filename: "",
        filetype: "Image file",
        size: 2800521,
        created_at: "2023-11-14T18:07:15.732Z",
    },
    {
        id: 6,
        filename: "extensions.doc",
        filetype: "Word file",
        size: 4800521,
        created_at: "2023-11-22T18:07:15.732Z",
    },
    {
        id: 7,
        filename: "logo.csv",
        filetype: "Image file",
        size: 700521,
        created_at: "2023-11-01T18:07:15.732Z",
    },
];
