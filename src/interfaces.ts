export interface ITask {
    id: string,
    title: string,
    description?: string,
    status: string,
    priority: string,
    startDate: string,
    endDate: string,
    subTasks?: ISubtask[]
};

export interface ISubtask {
    id: string,
    title: string,
    isCompleted: boolean
};

export interface ISubtasksProp {
    subTasks: ISubtask[],
    subTasksOf: string,
    isDisabled?: boolean,
    isCreateTaskView?: boolean,
    group: string
};

export interface ITaskProps {
    task: ITask,
    currentGroup: string
};

export interface IGroupedTasks {
    id: string,
    name: string,
    tasks: ITask[]
};

export interface IBoard {
    id: string,
    name: string,
    type: "board",
    groups: IGroupedTasks[]
};

export interface IFolder {
    id: string,
    name: string,
    type: "folder",
    children: (IBoard | IFolder)[]
};

/*
    {
        id: "12345",
        name: "My Space",
        type: "space",
        children: [
            {
                id: "09876",
                name: "My Board",
                type: "board",
                groups: {
                    Tasks: [],
                    Home: [],
                    College: []
                }
            }
        ]
    }
*/

export interface IGroupedTaskProps {
    group: string,
    tasks: ITask[]
};

export interface IInputProps {
    label: string,
    hasError: boolean,
    placeholder?: string,
    multiline?: boolean,
    date?: boolean,
    readonly?: boolean
};

export interface IDropdownProps {
    label: string
    options: string[],
    readonly?: boolean
};

export interface IContextMenuProps {
    isMenuVisible: boolean,
    nested?: boolean
};

export interface ISidebarProps {
    folders: IFolder,
    isNested?: boolean
};

export interface ISidebarItemProps {
    item: IFolder | IBoard,
    isActive: boolean
};

export interface IModal {
    type: string,
    params: TGeneralObject
};

export interface ICreateModalProps {
    label: string,
    placeholder: string
};

export type TGeneralObject = {[key: string] : any};

export type TDateNumerals = {[key: number] : string};

export type TSnackbarMessageType = "success" | "error" | "warning";

export type TNode = (IFolder | IBoard);

export type TReturnNode = TNode | undefined;