import { defineStore, StoreDefinition } from "pinia";
import { computed, Ref, ref } from "vue";
import { ISubtask, ITask, IGroupedTasks, ISpace } from "../interfaces";

export const useTasksStore: StoreDefinition = defineStore("tasks", () => {
    // States 👇🏻
    const allTasks: Ref<ITask[]> = ref([
        {
            id: "1",
            title: "Study",
            status: "Todo",
            group: "Tasks",
            priority: "Medium",
            startDate: "21/05/2025",
            endDate: "21/05/2025",
            subTasks: [
                {
                    id: "4",
                    title: "Physics",
                    isCompleted: false
                },
                {
                    id: "5",
                    title: "Chemistry",
                    isCompleted: false
                },
                {
                    id: "6",
                    title: "Mathematics",
                    isCompleted: false
                }
            ]
        },
        {
            id: "2",
            title: "Work",
            status: "Todo",
            group: "Tasks",
            priority: "High",
            startDate: "21/05/2025",
            endDate: "21/05/2025",
            subTasks: []
        },
        {
            id: "3",
            title: "Exercise",
            status: "Todo",
            group: "Tasks",
            priority: "Low",
            startDate: "21/05/2025",
            endDate: "21/05/2025",
            subTasks: []
        }
    ]);

    const groupedTasks: Ref<IGroupedTasks> = ref({
        Tasks: [
            {
                id: "1",
                title: "Study",
                status: "Todo",
                priority: "Medium",
                startDate: "21/05/2025",
                endDate: "21/05/2025",
                subTasks: [
                    {
                        id: "4",
                        title: "Physics",
                        isCompleted: false
                    },
                    {
                        id: "5",
                        title: "Chemistry",
                        isCompleted: false
                    },
                    {
                        id: "6",
                        title: "Mathematics",
                        isCompleted: false
                    }
                ]
            },
            {
                id: "2",
                title: "Work",
                status: "Todo",
                priority: "High",
                startDate: "21/05/2025",
                endDate: "21/05/2025",
                subTasks: []
            },
            {
                id: "3",
                title: "Exercise",
                status: "Todo",
                priority: "Low",
                startDate: "21/05/2025",
                endDate: "21/05/2025",
                subTasks: []
            }
        ],
        Home: [],
        Personal: [],
        Work: [],
        Yoga: [],
        Gym: []
    });

    const spaces: Ref<ISpace> = ref({
        id: "08cec8b7-6225-46c2-b832-f4a4a8af456d",
        name: "~root",
        type: "space",
        children: [
            {
                id: '33ce0bfb-37c1-4857-ac12-c1602c996e20',
                name: "My Board",
                type: "board",
                groups: groupedTasks
            },
            {
                id: '1b55dbed-cb85-4a15-837d-0872176a804d',
                name: "My Space",
                type: "space",
                children: [
                    {
                        id: 'ceedb777-2127-4c06-b853-2163ab74344b',
                        name: "My New Board",
                        type: "board",
                        groups: groupedTasks
                    }
                ]
            }
        ]
    });

    const taskGroups: Ref<string[]> = ref([
        "Tasks",
        "Home",
        "Personal",
        "Work",
        "Yoga",
        "Gym"
    ]);

    // Getters 👇🏻

    const groupNames = computed(() => Object.keys(groupedTasks.value));

    // Actions 👇🏻

    function getTask(group: string, id: string): ITask {
        return groupedTasks.value[group].find(
            (task: ITask) => task.id === id
        )!;
    }

    function createTask(task: ITask, group: string) {
        groupedTasks.value[group] = [task, ...groupedTasks.value[group]];
    }

    function editTask(edittedTask: ITask, group: string) {
        groupedTasks.value[group] = groupedTasks.value[group].map(
            (task: ITask) => task.id === edittedTask.id ? edittedTask : task
        );
    }

    function removeTask(id: string, group: string) {
        groupedTasks.value[group] = groupedTasks.value[group].filter((task:ITask) => task.id !== id);
    }

    function moveTo(group: string, fromGroup: string ,id: string) {
        const taskToMove = groupedTasks.value[fromGroup].find(
            (task: ITask) => task.id === id
        )!;
        groupedTasks.value[group] = [...groupedTasks.value[group], taskToMove];
        removeTask(id, fromGroup);
    }

    function createGroup(group: string) {
        groupedTasks.value[group] = [];
    }

    function updateGroup(group: string, updatedGroup: string) {
        const updatedGroupedTasks: IGroupedTasks = {};
        groupNames.value.forEach(
            (groupName: string) => {
                if(groupName === group) {
                    updatedGroupedTasks[updatedGroup] = groupedTasks.value[groupName];
                }
                else {
                    updatedGroupedTasks[groupName] = groupedTasks.value[groupName];
                }
            }
        );
        groupedTasks.value = updatedGroupedTasks;
    }

    function deleteGroup(group: string) {
        delete groupedTasks.value[group];
    }

    function findTask(tasks: ITask[], id: string) {
        return tasks.find(
            (task: ITask) => task.id === id
        );
    }

    function createSubTask(subTask: ISubtask, subTaskOfId: string, group: string) {
        const subTaskOf = findTask(groupedTasks.value[group], subTaskOfId);

        subTaskOf?.subTasks?.unshift(subTask);
    }

    function updateSubTask(subTask: ISubtask, subTaskOfId: string, group: string) {
        let subTaskOf = findTask(groupedTasks.value[group], subTaskOfId)!;

        subTaskOf.subTasks = subTaskOf?.subTasks?.map(
            (sTask: ISubtask) => sTask.id === subTask.id ? subTask : sTask
        );
    }

    function deleteSubTask(subTaskId: string, subTaskOfId: string, group: string) {
        let subTaskOf = findTask(groupedTasks.value[group], subTaskOfId)!;

        subTaskOf.subTasks = subTaskOf.subTasks?.filter(
            (sTask: ISubtask) => sTask.id !== subTaskId
        );
    }

    function toggleCompleteSubTask(subTaskId: string, subTaskOfId: string, group: string) {
        let subTaskOf = findTask(groupedTasks.value[group], subTaskOfId)!;
        
        subTaskOf.subTasks = subTaskOf?.subTasks?.map(
            (sTask: ISubtask) => {
                if(sTask.id === subTaskId) {
                    sTask.isCompleted = !sTask.isCompleted;
                }
                return sTask;
            }
        );
    }

    return {
        spaces,
        allTasks,
        groupedTasks,
        taskGroups,
        groupNames,
        getTask,
        createTask,
        editTask,
        removeTask,
        moveTo,
        createGroup,
        updateGroup,
        deleteGroup,
        createSubTask,
        updateSubTask,
        deleteSubTask,
        toggleCompleteSubTask
    };
});