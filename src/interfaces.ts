export interface ITask {
    id: string,
    title: string,
    description?: string,
    status: string,
    group: string
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
    isCreateTaskView?: boolean
};

export interface ITaskProps {
    task: ITask
};

export interface IGroupedTask {
    group: string,
    tasks: ITask[]
};

export interface IGroupedTaskProps {
    group: string
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

export type TGeneralObject = {[key: string] : any};

export type TDateNumerals = {[key: number] : string};

export type TSnackbarMessageType = "success" | "error" | "warning";