<template>
    <div class="sub-tasks-container">
        <div class="sub-tasks-header" @click="toggleShowSubTasks">
            <h3>Sub Tasks</h3>
            <div :class="['chevron', showSubTasks && 'open']">
                <img :src="chevIcons[theme]" alt="chevron-icon">
            </div>
        </div>
        <div :class="['sub-tasks-wrapper', showSubTasks && 'show']">
            <div class="sub-tasks">
                <div
                    :class="['sub-task', subTask.isCompleted && 'completed']"
                    v-for="subTask in subTasks"
                    :key="subTask.id"
                >
                    <div class="checkbox" @click="() => toggleCompleteSubTask(subTask.id)">
                        <img :src="checkIcons[theme]" alt="check-icon" v-if="subTask.isCompleted">
                    </div>
                    <div class="sub-task-title">
                        <input
                            type="text"
                            :value="subTask.title"
                            :readonly="isDisabled"
                            @keyup.enter="(e:KeyboardEvent) => updateSubTask(e, subTask.id)"
                        />
                    </div>
                    <div class="actions" v-if="!isDisabled">
                        <div class="delete" @click="() => deleteSubTask(subTask.id)">
                            <img :src="crossIcons[theme]" alt="cross-icon">
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-sub-task" v-if="!isDisabled">
                <input
                    type="text"
                    placeholder="Enter Sub Task"
                    v-model="subTaskInput"
                    @keyup.enter="addSubTask"
                />
                <div class="add" @click="addSubTask">
                    <img :src="plusIcons[theme]" alt="plus-icon">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import lightThemePlusIcon from "../assets/icons/plus.svg";
    import darkThemePlusIcon from "../assets/icons/plus-dark.svg";
    import lightThemeCheckIcon from "../assets/icons/check.svg";
    import darkThemeCheckIcon from "../assets/icons/check-dark.svg";
    import lightThemeChevIcon from "../assets/icons/chevron.svg";
    import darkThemeChevIcon from "../assets/icons/chevron-dark.svg";
    import { ISubtasksProp, TGeneralObject } from "../interfaces";
    import { ref, Ref } from "vue";
    import { useThemeStore } from "../store/theme";
    import { useTasksStore } from "../store/tasks";
    import { useSnackbarStore } from "../store/snackbar";

    const { subTasks, subTasksOf, isDisabled = false, isCreateTaskView = false } = defineProps<ISubtasksProp>();
    const emit = defineEmits(["createSubTask", "updateSubTask", "deleteSubTask", "toggleCompleteSubtask"]);

    const theme = useThemeStore().theme;
    const store = useTasksStore();
    const snackbar = useSnackbarStore();

    const plusIcons: TGeneralObject = {
        light: lightThemePlusIcon,
        dark: darkThemePlusIcon
    };
    const crossIcons: TGeneralObject = {
        light: darkThemePlusIcon,
        dark: lightThemePlusIcon
    };
    const checkIcons: TGeneralObject = {
        light: lightThemeCheckIcon,
        dark: darkThemeCheckIcon
    };
    const chevIcons: TGeneralObject = {
        light: lightThemeChevIcon,
        dark: darkThemeChevIcon
    };

    const showSubTasks: Ref<boolean> = ref(!!subTasks.length);
    const subTaskInput = ref();

    function toggleShowSubTasks() {
        showSubTasks.value = !showSubTasks.value;
    }

    function addSubTask() {
        if(!subTaskInput.value) return;
        if(isCreateTaskView) {
            emit("createSubTask", {
                id: crypto.randomUUID(),
                title: subTaskInput.value,
                isCompleted: false
            });
        }
        else {
            store.createSubTask({
                id: crypto.randomUUID(),
                title: subTaskInput.value,
                isCompleted: false
            }, subTasksOf);
        }
        subTaskInput.value = "";
        snackbar.setMessage("Sub Task Created");
    }

    function updateSubTask(event: KeyboardEvent, id: string) {
        const target = event.target as HTMLInputElement;
        if(isCreateTaskView) {
            emit("updateSubTask", {
                id,
                title: target.value,
                isCompleted: false
            });
        }
        else {
            store.updateSubTask({
                id,
                title: target.value,
                isCompleted: false
            }, subTasksOf);
        }
        snackbar.setMessage("Sub Task Updated");
    }

    function deleteSubTask(id: string) {
        if(isCreateTaskView) {
            emit("deleteSubTask", id);
        }
        else {
            store.deleteSubTask(id, subTasksOf);
        }
    }

    function toggleCompleteSubTask(id:string) {
        if(isDisabled) return;
        if(isCreateTaskView) {
            emit("toggleCompleteSubtask", id);
            return;
        }
        store.toggleCompleteSubTask(id, subTasksOf);
    }
</script>

<style scoped>
    .sub-tasks-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
        & .sub-tasks-header {
            display: flex;
            align-items: center;
            gap: 6px;
            color: var(--text);

            & h3 {
                font-size: 16px;
            }

            & .chevron {
                width: 24px;
                height: 24px;
                transform: rotate(-90deg);
                &.open {
                    transform: rotate(0deg);
                }
            }
        }

        & .sub-tasks-wrapper {
            padding-left: 40px;
            display: none;

            &.show {
                display: block;
            }

            @media(max-width: 425px) {
                padding-left: 10px;
            }
        }

        & .sub-tasks {
            display: flex;
            flex-direction: column;
            gap: 15px;

            & .sub-task {
                display: flex;
                align-items: center;
                gap: 6px;
                background-color: var(--subtask-bg);
                box-shadow: 0 0 5px 2px var(--shadow);
                padding: 10px;

                &.completed {
                    & .sub-task-title {
                        opacity: 0.7;
                    }
                }

                & .checkbox {
                    width: 20px;
                    height: 20px;
                    border: 2px solid var(--border);
                    cursor: pointer;
                }

                & .sub-task-title {
                    position: relative;
                    flex-grow: 1;
                    & input {
                        display: block;
                        outline: none;
                        color: var(--text);
                        background-color: transparent;
                        border: none;
                        width: max-content;
                    }
                }

                & .actions {
                    display: flex;
                    align-items: center;

                    & .delete {
                        width: 15px;
                        height: 15px;
                        transform: rotate(45deg);
                        cursor: pointer;
                    }
                }
            }
        }

        & .add-sub-task {
            display: flex;
            align-items: flex-end;
            gap: 30px;
            margin-top: 40px;

            & input {
                border: none;
                border-bottom: 2px solid var(--border);
                outline: none;
                flex-grow: 1;
                background-color: transparent;
                padding: 8px;
                color: var(--text);
            }

            & .add {
                width: 30px;
                height: 30px;
                background-color: var(--accent);
                padding: 5px;
                border: 2px solid var(--border);
                cursor: pointer;
                &:hover {
                    opacity: 0.7;
                }
            }
        }
    }
</style>