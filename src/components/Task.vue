<template>
    <div class="task-container">
        <div class="task">
            <div class="task-info" v-bind="$attrs">
                <p class="title">{{ task.title }}</p>
            </div>
            <div class="menu-items">
                <div class="sub-tasks-icon" @click="toggleShowSubTasks" title="Sub Tasks">
                    <img :src="subTaskIcons[theme]" alt="sub-task-icon">
                </div>
                <div class="status tag">
                    {{ capitalize(task.status) }}
                </div>
                <div class="priority tag">
                    {{ capitalize(task.priority) }}
                </div>
                <div class="menu-dots" @click="toggleShowMenu">
                    <img :src="menuDots[theme]" alt="menu-dots-icon" title="options">
                    <ContextMenu
                        :is-menu-visible="showMenu"
                    >
                        <div class="menu-item edit" @click="editTask">
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
                        <div class="menu-item move-to" @click.stop="toggleShowGroup" v-if="groups.length > 1">
                            <p>Move to group</p>
                            <div :class="['icon', 'move', showGroup && 'open']">
                                <img :src="menuIcons.move_task[theme]" alt="edit-icon">
                            </div>
                            <ContextMenu
                                :is-menu-visible="showGroup"
                                nested
                            >
                                <template  v-for="group in store.groupNames" :key="group">
                                    <div class="menu-item"
                                        v-if="group !== currentGroup"
                                        @click="() => moveTask(group, task.id)"
                                    >
                                        <p>{{ group }}</p>
                                    </div>
                                </template>
                            </ContextMenu>
                        </div>
                    </ContextMenu>
                </div>
            </div>
        </div>
        <div class="sub-tasks" v-if="showSubTasks">
            <SubTasks
                :sub-tasks="task.subTasks ?? []"
                :sub-tasks-of="task.id"
                :group="currentGroup"
            />
        </div>
    </div>
    <DeleteModal
        @handle-delete="deleteTask"
        @hide-modal="fnHideModal"
        v-if="showModal"
    />
</template>

<script setup lang="ts">
    import { ITaskProps, TGeneralObject } from '../interfaces';
    import { useThemeStore } from '../store/theme';
    import lightThemeMenuDots from "../assets/icons/menu-dots.svg";
    import darkThemeMenuDots from "../assets/icons/menu-dots-dark.svg";
    import { capitalize, Ref, ref } from 'vue';
    import { useTasksStore } from '../store/tasks';
    import DeleteModal from './DeleteModal.vue';
    import ContextMenu from './ContextMenu.vue';
    import SubTasks from './SubTasks.vue';
    import lightThemeEditIcon from '../assets/icons/edit.svg';
    import darkThemeEditIcon from '../assets/icons/edit-dark.svg';
    import lightThemeDeleteIcon from '../assets/icons/delete.svg';
    import darkThemeDeleteIcon from '../assets/icons/delete-dark.svg';
    import lightThemeMoveIcon from '../assets/icons/chevron.svg';
    import darkThemeMoveIcon from '../assets/icons/chevron-dark.svg';
    import lightThemeSubTasksIcon from '../assets/icons/sub-tasks.svg';
    import darkThemeSubTasksIcon from '../assets/icons/sub-tasks-dark.svg';

    defineOptions({
        inheritAttrs: false
    });
    const { task, currentGroup } = defineProps<ITaskProps>();
    const emit = defineEmits(["editTask"]);

    const store = useTasksStore();
    const themeStore = useThemeStore();

    const theme: string = themeStore.theme;

    const priorities: TGeneralObject = {
        high: "var(--priority-high)",
        medium: "var(--priority-medium)",
        low: "var(--priority-low)"
    }

    const menuDots: TGeneralObject = {
        light: lightThemeMenuDots,
        dark: darkThemeMenuDots
    }

    const subTaskIcons: TGeneralObject = {
        light: lightThemeSubTasksIcon,
        dark: darkThemeSubTasksIcon
    }

    const menuIcons: {[key: string]: TGeneralObject} = {
        edit_task: {
            light: lightThemeEditIcon,
            dark: darkThemeEditIcon
        },
        delete_task: {
            light: lightThemeDeleteIcon,
            dark: darkThemeDeleteIcon
        },
        move_task: {
            light: lightThemeMoveIcon,
            dark: darkThemeMoveIcon
        }
    }

    const groups = store.groupNames;

    const showMenu: Ref<boolean> = ref(false);
    const showGroup: Ref<boolean> = ref(false);
    const showModal: Ref<boolean> = ref(false);
    const showSubTasks: Ref<boolean> = ref(false);

    function toggleShowMenu() {
        showMenu.value = !showMenu.value;
    }

    function toggleShowGroup() {
        showGroup.value = !showGroup.value;
    }

    function toggleShowSubTasks() {
        showSubTasks.value = !showSubTasks.value;
    }

    function editTask() {
        emit("editTask");
    }

    function deleteTask() {
        store.removeTask(task.id, currentGroup);
        showModal.value = false;
    }

    function fnHideModal() {
        showModal.value = false;
    }

    function fnShowModal() {
        showModal.value = true;
    }
    function moveTask(group: string, id: string) {
        store.moveTo(group, currentGroup, id);
    }
</script>

<style scoped>
    .task-container {
        & .sub-tasks {
            padding: 10px 0;
            padding-left: 20px;
        }
    }
    .task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 2px solid var(--border);
        padding: 10px;

        & .task-info {
            flex-grow: 1;
        }

        & .title {
            font-weight: 600;
            color: var(--text);
            font-size: 1.125rem;
        }

        & .menu-items {
            display: flex;
            align-items: center;
            gap: 5px;
            & .tag {
                flex-grow: 1;
                font-size: 0.75rem;
                padding: 2px 6px;
                border: 0.5px solid var(--border);
                color: var(--text);
                &.priority {
                    background-color: v-bind('priorities[task.priority.toLowerCase()]');
                }
                &.status {
                    background-color: var(--status-bg);
                }
            }
            & .sub-tasks-icon {
                width: 24px;
                height: 24px;
                cursor: pointer;
                transform: rotateY(180deg);

                &:hover {
                    & img {
                        opacity: 0.7;
                    }
                }

                @media(max-width: 425px) {
                    width: 20px;
                    height: 20px;
                }
            }
            & .menu-dots {
                width: 24px;
                height: 24px;
                cursor: pointer;
                position: relative;

                &:hover {
                    & img {
                        opacity: 0.7;
                    }
                }

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

                @media(max-width: 425px) {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
</style>