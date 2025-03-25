<template>
    <div class="tasks">
        <div class="group">
            <div class="input-wrapper">
                <input
                    type="text"
                    v-model="groupName"
                    :class="['group-name', isGroupNameEmpty && 'has-error', canEdit && 'editable']"
                    :readonly="!canEdit"
                    ref="groupInput"
                    @keyup.enter="editGroup"
                >
                <p class="error" v-if="isGroupNameEmpty">This Field is Required</p>
            </div>
            <div class="menu-dots" @click="toggleShowMenu">
                <img :src="menuDots[theme]" alt="menu-dots-icon">
                <ContextMenu
                    :is-menu-visible="showMenu"
                >
                <div class="menu-item edit" @click="fnCanEdit">
                        <p>Edit</p>
                        <div class="icon">
                            <img :src="menuIcons.edit_task[theme]" alt="edit-icon">
                        </div>
                    </div>
                    <div class="menu-item delete" @click="fnShowModal">
                        <p>Delete</p>
                        <div class="icon">
                            <img :src="menuIcons.delete_task[theme]" alt="edit-icon">
                        </div>
                    </div>
                </ContextMenu>
            </div>
        </div>
        <div class="task-wrapper">
            <Task
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                @click="() => showTask(task.id)"
                @edit-task="() => editTask(task.id)"
            />
        </div>
        <div class="create-task">
            <div class="add" title="create new item" @click="createTask">
                <img :src="plusIcons[theme]" alt="plus-icon">
            </div>
        </div>
    </div>
    <DeleteModal
        v-if="showDeleteModal"
        @hide-modal="fnHideModal"
        @handle-delete="deleteGroup"
    />
</template>

<script setup lang="ts">
    import { useTasksStore } from '../store/tasks';
    import lightThemePlusIcon from "../assets/icons/plus.svg";
    import darkThemePlusIcon from "../assets/icons/plus-dark.svg";
    import Task from './Task.vue';
    import ContextMenu from './ContextMenu.vue';
    import DeleteModal from './DeleteModal.vue';
    import { IGroupedTaskProps, ITask, TGeneralObject } from '../interfaces';
    import { useThemeStore } from '../store/theme';
    import { computed, ref, Ref } from 'vue';
    import lightThemeMenuDots from "../assets/icons/menu-dots.svg";
    import darkThemeMenuDots from "../assets/icons/menu-dots-dark.svg";
    import lightThemeEditIcon from '../assets/icons/edit.svg';
    import darkThemeEditIcon from '../assets/icons/edit-dark.svg';
    import lightThemeDeleteIcon from '../assets/icons/delete.svg';
    import darkThemeDeleteIcon from '../assets/icons/delete-dark.svg';
    import { useSnackbarStore } from '../store/snackbar';

    const { group } = defineProps<IGroupedTaskProps>();
    const emit = defineEmits(["createTask", "editTask", "showTask"]);

    const store = useTasksStore();

    const snackbar = useSnackbarStore();

    const themeStore = useThemeStore();

    const theme: string = themeStore.theme;

    const tasks = computed(
        () => store.allTasks.filter(
            (task: ITask) => task.group.toLowerCase() === group.toLowerCase()
        )
    );
    const groupName: Ref<string> = ref(group);
    const showMenu: Ref<boolean> = ref(false);
    const canEdit: Ref<boolean> = ref(false);
    const showDeleteModal: Ref<boolean> = ref(false);
    const groupInput = ref();
    const isGroupNameEmpty: Ref<boolean> = ref(false);

    const menuDots: TGeneralObject = {
    light: lightThemeMenuDots,
    dark: darkThemeMenuDots
    }

    const menuIcons: {[key: string]: TGeneralObject} = {
        edit_task: {
            light: lightThemeEditIcon,
            dark: darkThemeEditIcon
        },
        delete_task: {
            light: lightThemeDeleteIcon,
            dark: darkThemeDeleteIcon
        }
    }

    const plusIcons: TGeneralObject = {
        light: lightThemePlusIcon,
        dark: darkThemePlusIcon
    };

    function createTask() {
        emit("createTask", group);
    }

    function editTask(id: string) {
        emit("editTask", {group, taskId: id});
    }

    function showTask(id: string) {
        emit("showTask", {group, taskId: id});
    }

    function toggleShowMenu() {
        showMenu.value = !showMenu.value;
    }

    function editGroup() {
        isGroupNameEmpty.value = groupName.value === "";
        if(isGroupNameEmpty.value) return;
        canEdit.value = false;
        store.updateGroup(group, groupName.value);
        snackbar.setMessage("Group Editted");
    }

    function fnCanEdit() {
        canEdit.value = true;
        groupInput.value.focus()
    }

    function fnShowModal() {
        showDeleteModal.value = true;
    }

    function fnHideModal() {
        showDeleteModal.value = false;
    }

    function deleteGroup() {
        store.deleteGroup(group);
    }
</script>

<style scoped>
     .tasks {
        margin: auto;
        padding-top: 40px;
        max-width: 70%;
        display: flex;
        flex-direction: column;
        gap: 15px;

        & .group {
            padding: 10px;
            border: 2px solid var(--group-shadow);
            box-shadow: 5px 5px var(--group-shadow);
            display: flex;
            align-items: center;
            justify-content: space-between;
            & .error {
                font-size: 0.75rem;
                text-align: end;
                color: var(--error);
            }
            & .group-name {
                border: none;
                outline: none;
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--primary);
                letter-spacing: 1.5px;
                background-color: transparent;

                &.editable {
                    border-bottom: 1px solid var(--border);
                }

                &.has-error {
                    border-bottom: 1px solid var(--error);
                }   
            }
            & .menu-dots {
                width: 24px;
                height: 24px;
                cursor: pointer;
                position: relative;

                .menu-item {
                    font-size: 0.875rem;
                    color: var(--text);
                    padding: 8px 7px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    &.move-to {
                        position: relative;
                    }
                    & .icon {
                        width: 15px;
                        height: 15px;

                        &.move {
                            transform: rotate(-90deg);

                            &.open {
                                transform: rotate(0deg);
                            }
                        }
                    }
                    &:hover {
                        background-color: var(--background);
                    }
                }
            }
        }

        & .task-wrapper {
            padding: 0 8px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        & .create-task {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            & .add {
                width: 40px;
                height: 40px;
                background-color: var(--accent);
                padding: 10px;
                border: 2px solid var(--border);
                cursor: pointer;
                &:hover {
                    opacity: 0.7;
                }
            }

        }
    }

    @media(max-width: 500px) {
        .tasks {
            max-width: 90%;
        }
    }
</style>