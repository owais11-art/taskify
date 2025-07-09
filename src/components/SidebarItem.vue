<template>
    <div class="sidebar-item">
        <div :class="['icon', isOpen && 'open', item.type !== 'folder' && 'file']" @click="() => toggleIsOpen()">
            <img
                :src="item.type === 'folder' ? chevronIcons[theme] : boardIcons[theme]"
                alt="icon"
            />
        </div>
        <!-- <p class="item-name">{{ item.name }}</p> -->
         <input type="text" class="item-name" ref="itemName" :value="item.name" :readonly="isItemNameReadOnly" @keydown.enter="(e: KeyboardEvent) => updateNode(item, (e.target as HTMLInputElement).value)">
        <div class="context-menu-wrapper" @click.stop="toggleIsContextMenuVisible">
            <img :src="menuDotsIcons[theme]" alt="menu-dots-icon">
            <ContextMenu :is-menu-visible="isContextMenuVisible">
                <div class="menu-item" @click.stop="() => deleteNode(item.id)">
                    <p>Delete</p>
                    <div class="context-item-icon">
                        <img :src="menuIcons.delete_item[theme]" alt="edit-icon">
                    </div>
                </div>
                <div class="menu-item" @click.stop="() => makeItemNameWritable()">
                    <p>Rename</p>
                    <div class="context-item-icon">
                        <img :src="menuIcons.edit_item[theme]" alt="edit-icon">
                    </div>
                </div>
            </ContextMenu>
        </div>
    </div>
</template>

<script setup lang="ts">
    import lightThemeChevronIcon from '../assets/icons/chevron.svg'; 
    import darkThemeChevronIcon from '../assets/icons/chevron-dark.svg';
    import lightThemeBoardIcon from '../assets/icons/board.svg';
    import darkThemeBoardIcon from '../assets/icons/board-dark.svg';
    import lightThemeMenuIcon from '../assets/icons/menu-dots.svg';
    import darkThemeMenuIcon from '../assets/icons/menu-dots-dark.svg';
    import { ISidebarItemProps, TGeneralObject } from '../interfaces';
    import { useThemeStore } from '../store/theme';
    import { onMounted, onUpdated, Ref, ref } from 'vue';
    import ContextMenu from './ContextMenu.vue';
    import lightThemeEditIcon from '../assets/icons/edit.svg';
    import darkThemeEditIcon from '../assets/icons/edit-dark.svg';
    import lightThemeDeleteIcon from '../assets/icons/delete.svg';
    import darkThemeDeleteIcon from '../assets/icons/delete-dark.svg';
    import { useDismissContextMenu } from '../composables/useDismissContextMenu';
    import { useNodeManipulation } from '../composables/useNodeManipulation';

    const { item, isActive } = defineProps<ISidebarItemProps>();
    const emit = defineEmits(['toggleNestedSidebar']);

    const theme = useThemeStore().theme;

    const chevronIcons: TGeneralObject = {
        light: lightThemeChevronIcon,
        dark: darkThemeChevronIcon
    };
    const boardIcons: TGeneralObject = {
        light: lightThemeBoardIcon,
        dark: darkThemeBoardIcon
    };
    const menuDotsIcons: TGeneralObject = {
        light: lightThemeMenuIcon,
        dark: darkThemeMenuIcon
    };
    const menuIcons: {[key: string]: TGeneralObject} = {
        edit_item: {
            light: lightThemeEditIcon,
            dark: darkThemeEditIcon
        },
        delete_item: {
            light: lightThemeDeleteIcon,
            dark: darkThemeDeleteIcon
        }
    }

    const isOpen: Ref<boolean> = ref(isActive);
    const isContextMenuVisible: Ref<boolean> = ref(false);
    const isItemNameReadOnly: Ref<boolean> = ref(true);
    const itemName = ref();

    const { deleteNode, updateNode, makeItemNameWritable } = useNodeManipulation(itemName, isItemNameReadOnly, isContextMenuVisible);

    useDismissContextMenu(isContextMenuVisible);

    function toggleIsOpen(isOpenValue: boolean = isOpen.value) {
        isOpen.value = !isOpenValue;
        emit('toggleNestedSidebar', isOpen.value, item.id);
    }

    function toggleIsContextMenuVisible() {
        isContextMenuVisible.value = !isContextMenuVisible.value;
    }

    onMounted(() => {
        if(isOpen.value) emit('toggleNestedSidebar', isOpen.value, item.id);
    });
    onUpdated(() => {
        if(isActive) toggleIsOpen(!isActive);
    });
</script>

<style scoped>
    .sidebar-item {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 5px;
        &:hover {
            background-color: #CCC;
        }
        & .icon, & .context-menu-wrapper {
            width: 18px;
            height: 18px;
            cursor: pointer;
        }
        & .context-menu-wrapper {
            position: relative;

            & .menu-item {
                font-size: 0.875rem;
                color: var(--text);
                padding: 8px 7px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                & .context-item-icon {
                    width: 15px;
                    height: 15px;
                }

                &:hover {
                    background-color: var(--background);
                }
            }
        }
        & .icon {
            transform: rotate(-90deg);
            &.open:not(.file) {
                transform: rotate(0deg);
            }
        }
        & .item-name {
            flex-grow: 1;
            color: var(--text);
            font-size: 0.75rem;
            font-weight: 600;
            background-color: transparent;
            border: none;
            outline: none;
            &:focus {
                outline: none;
                border: none;
            }
        }
    }
</style>