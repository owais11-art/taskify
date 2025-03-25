<template>
    <div class="task-form">
        <Input
            label="Title"
            :has-error="isTaskNameEmpty"
            placeholder="Enter Task Name"
            :readonly="isShowTaskView"
            v-model="task.title"
        />
        <div class="form-flex-wrapper">
            <Dropdown
                label="Status"
                :options="['Todo', 'Doing', 'Done']"
                :readonly="isShowTaskView"
                v-model="task.status"
            />
            <Dropdown
                label="Priority"
                :options="['High', 'Medium', 'Low']"
                :readonly="isShowTaskView"
                v-model="task.priority"
            />
        </div>
        <div class="form-flex-wrapper">
            <Input
                label="Start Date"
                :has-error="false"
                v-model="task.startDate"
                :readonly="isShowTaskView"
                date
            />
            <Input
                label="End Date"
                :has-error="false"
                v-model="task.endDate"
                :readonly="isShowTaskView"
                date
            />
        </div>
        <SubTasks
            :sub-tasks="task.subTasks ?? []"
            :sub-tasks-of="task.id"
            :is-disabled="isShowTaskView"
            :is-create-task-view="isCreateTaskView"
            @create-sub-task="createSubTask"
            @update-sub-task="updateSubTask"
            @delete-sub-task="deleteSubTask"
            @toggle-complete-subtask="toggleCompleteSubTask"
        />
        <Input
            label="Description"
            :has-error="false"
            placeholder="Write description..."
            v-model:texarea="task.description"
            :readonly="isShowTaskView"
            multiline
        />
        <button class="add-task" v-if="!isShowTaskView" @click="submit">{{ isCreateTaskView ? "CREATE" : "EDIT" }}</button>
    </div>
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import Input from '../components/Input.vue';
    import Dropdown from '../components/Dropdown.vue';
    import SubTasks from '../components/SubTasks.vue';
    import { Ref, ref } from 'vue';
    import { getCurrentDate } from '../helpers';
    import { ISubtask, ITask } from '../interfaces';
    import { useTasksStore } from '../store/tasks';
    import { useSnackbarStore } from '../store/snackbar';

    const route = useRoute();
    const router = useRouter();
    const store = useTasksStore();
    const snackbar = useSnackbarStore();

    const isCreateTaskView: boolean = route.query.view === "create";
    const isEditTaskView: boolean = route.query.view === "edit";
    const isShowTaskView: boolean = route.query.view === "show";

    const task: Ref<ITask> = ref(getTask());
    const isTaskNameEmpty: Ref<boolean> = ref(false);

    function getTask(): ITask {
        if(isCreateTaskView) {
            return {
                id: route.params.id as string,
                title: "",
                status: "Todo",
                priority: "Medium",
                startDate: getCurrentDate(),
                endDate: getCurrentDate(),
                description: "",
                group: route.query.group as string,
                subTasks: []
            };
        }
        return store.allTasks.find((item: ITask) => item.id === route.params.id);
    }

    function submit() {
        if(isCreateTaskView) addTask();
        else if(isEditTaskView) updateTask();
    }

    function addTask() {
        isTaskNameEmpty.value = task.value.title === "";
        if(isTaskNameEmpty.value) return;
        store.createTask(task.value);
        snackbar.setMessage("Task Created");
        router.go(-1);
    }

    function updateTask(message: string = "Task Updated") {
        isTaskNameEmpty.value = task.value.title === "";
        if(isTaskNameEmpty.value) return;
        store.editTask(task.value);
        snackbar.setMessage(message);
    }

    function createSubTask(subTask: ISubtask) {
        task.value.subTasks?.unshift(subTask);
    }

    function updateSubTask(updatedSubTask: ISubtask, subTaskId: string) {
        task.value.subTasks = task.value.subTasks?.map(
            (subTask: ISubtask) => subTask.id === subTaskId
                ? updatedSubTask
                : subTask
        );
    }

    function deleteSubTask(subTaskId: string) {
        task.value.subTasks = task.value.subTasks?.filter(
            (subTask: ISubtask) => subTask.id !== subTaskId
        );
    }

    function toggleCompleteSubTask(subTaskId: string) {
        task.value.subTasks = task.value.subTasks?.map(
            (subTask: ISubtask) => subTask.id === subTaskId
                ? { ...subTask, isCompleted: !subTask.isCompleted }
                : subTask
        );
    }
</script>

<style scoped>
    .task-form {
        max-width: 70%;
        margin: auto;
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 15px;

        & .form-flex-wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
             & > * {
                flex-grow: 1;
             }
        }

        & .add-task{
            width: max-content;
            padding: 6px 20px;
            background-color: var(--accent);
            border: 2px solid var(--border);
            align-self: flex-end;
            cursor: pointer;
            color: var(--text);
            font-weight: 700;
            letter-spacing: 1.1px;
            &:hover {
                opacity: 0.7;
            }
        }
    }

    @media(max-width: 500px) {
        .task-form {
            max-width: 90%;

            & .form-flex-wrapper {
                flex-direction: column;

                & > * {
                    width: 100%;
                }
            }
        }
    }
</style>