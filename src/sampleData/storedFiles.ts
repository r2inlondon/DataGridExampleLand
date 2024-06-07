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
        filename: "libros.xlsx",
        filetype: "Excel file",
        size: 4324521,
        created_at: "2023-11-21T18:54:23.081Z",
    },
    {
        id: 2,
        filename: "budged.xlsx",
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
        filename: "TGL414134_titleplan.pdf",
        filetype: "PDF file",
        size: 270564,
        created_at: "2024-06-05T12:00:55.627Z",
    },
    {
        id: 5,
        filename: "Curriculum.pdf",
        filetype: "PDF file",
        size: 2800521,
        created_at: "2023-11-14T18:07:15.732Z",
    },
    {
        id: 6,
        filename: "extensions.docx",
        filetype: "Word file",
        size: 4800521,
        created_at: "2023-11-22T18:07:15.732Z",
    },
    {
        id: 7,
        filename: "logo.eml",
        filetype: "email file",
        size: 700521,
        created_at: "2023-11-01T18:07:15.732Z",
    },
    {
        id: 8,
        filename: "TGL414134_register.pdf",
        filetype: "PDF file",
        size: 86439,
        created_at: "2024-06-05T12:00:01.321Z",
    },
    {
        id: 9,
        filename: "some email.eml",
        filetype: "email file",
        size: 11,
        created_at: "2023-11-13T18:07:15.732Z",
    },
];
