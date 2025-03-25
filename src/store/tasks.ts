import { defineStore, StoreDefinition } from "pinia";
import { Ref, ref } from "vue";
import { ISubtask, ITask } from "../interfaces";

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

    const taskGroups: Ref<string[]> = ref([
        "Tasks",
        "Home",
        "Personal",
        "Work",
        "Yoga",
        "Gym"
    ]);

    // Actions 👇🏻

    function createTask(task: ITask) {
        allTasks.value.unshift(task);
    }

    function editTask(edittedTask: ITask) {
        allTasks.value = allTasks.value.map(
            (task: ITask) => task.id === edittedTask.id ? edittedTask : task
        );
    }

    function removeTask(id: string) {
        allTasks.value = allTasks.value.filter((task:ITask) => task.id !== id);
    }

    function moveTo(group: string, id: string) {
        allTasks.value = allTasks.value.map((task: ITask) => {
            if(task.id === id) {
                task.group = group;
            }
            return task;
        });
    }

    function createGroup(group: string) {
        taskGroups.value.push(group);
    }

    function updateGroup(group: string, updatedGroup: string) {
        taskGroups.value = taskGroups.value.map(
            (groupName: string) => groupName === group ? updatedGroup : groupName
        );
    }

    function deleteGroup(group: string) {
        taskGroups.value = taskGroups.value.filter(
            (groupName: string) => groupName !== group
        );
        allTasks.value = allTasks.value.filter(
            (task:ITask) => task.group !== group
        );
    }

    function findTask(id: string) {
        return allTasks.value.find(
            (task: ITask) => task.id === id
        );
    }

    function createSubTask(subTask: ISubtask, subTaskOfId: string) {
        const subTaskOf = findTask(subTaskOfId);

        subTaskOf?.subTasks?.unshift(subTask);
        console.log(subTaskOf);
    }

    function updateSubTask(subTask: ISubtask, subTaskOfId: string) {
        let subTaskOf = findTask(subTaskOfId)!;

        subTaskOf.subTasks = subTaskOf?.subTasks?.map(
            (sTask: ISubtask) => sTask.id === subTask.id ? subTask : sTask
        );
    }

    function deleteSubTask(subTaskId: string, subTaskOfId: string) {
        let subTaskOf = findTask(subTaskOfId)!;

        subTaskOf.subTasks = subTaskOf.subTasks?.filter(
            (sTask: ISubtask) => sTask.id !== subTaskId
        );
    }

    function toggleCompleteSubTask(subTaskId: string, subTaskOfId: string) {
        let subTaskOf = findTask(subTaskOfId)!;
        
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
        allTasks,
        taskGroups,
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