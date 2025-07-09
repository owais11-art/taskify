import { IFolder } from "./interfaces";

export const ROOT_SPACE_ID: string = "~root-04925050-b9f9-4d5f-96b5-cffbf799acae";

export const DUMMY_FOLDERS: IFolder = {
            id: ROOT_SPACE_ID,
            name: "~root",
            type: "folder",
            children: [
                {
                    id: "1",
                    name: "My Space",
                    type: "folder",
                    children: [
                        {
                            id: "A1",
                            name: "Internal Board",
                            type: "board",
                            groups: []
                        },
                        {
                            id: "A2",
                            name: "Internal Board 2",
                            type: "board",
                            groups: []
                        },
                        {
                            id: "A3",
                            name: "Internal Board 3",
                            type: "board",
                            groups: []
                        },
                        {
                            id: "A4",
                            name: "Internal Space",
                            type: "folder",
                            children: [
                                {
                                    id: "B1",
                                    name: "New Board",
                                    type: "board",
                                    groups: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "2",
                    name: "My Board",
                    type: "board",
                    groups: []
                }
            ]
        };