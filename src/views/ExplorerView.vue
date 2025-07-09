<template>
    <ExplorerHeader />
    <div class="explorer">
        <div class="explorer-item"
            v-for="(explorerItem, index) in store.activeFolder.children" 
            :key="explorerItem.id"
            :id="explorerItem.id"
            @dblclick="() => changeFolder(explorerItem.id, explorerItem.type === 'folder')"
            @contextmenu.prevent="(e: Event) => showContextMenu((e.currentTarget as HTMLElement).id)"
        >
            <div class="icon">
                <img :src="explorerItem.type === 'folder' ? spaceIcons[theme] : boardIcons[theme]" alt="icon" />
            </div>
            <!-- <p 
                class="name" 
                :contenteditable="!isItemNameReadOnly" 
                ref="itemName"
                @keydown.enter="() => updateNode(explorerItem)"
            >
                {{ explorerItem.name }}
            </p> -->
             <input type="text" class="name" size="7" :value="explorerItem.name" ref="itemName" @keydown.enter="(e: KeyboardEvent) => updateNode(explorerItem, (e.target as HTMLInputElement).value)" :readonly="isItemNameReadOnly">
            <ContextMenu :is-menu-visible="contextMenuTargetId === explorerItem.id">
                <div class="menu-item" @click.stop="() => deleteNode(explorerItem.id)">
                    <p>Delete</p>
                    <div class="context-item-icon">
                        <img :src="menuIcons.delete_item[theme]" alt="edit-icon">
                    </div>
                </div>
                <div class="menu-item" @click.stop="() => makeItemNameWritable(index)">
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
import { useTaskifyStore } from '../store';
import lightThemeSpaceIcon from '../assets/icons/space-explorer.svg';
import darkThemeSpaceIcon from '../assets/icons/space-explorer-dark.svg';
import lightThemeBoardIcon from '../assets/icons/board.svg';
import darkThemeBoardIcon from '../assets/icons/board-dark.svg';
import { TGeneralObject } from '../interfaces';
import { useThemeStore } from '../store/theme';
import ExplorerHeader from '../components/ExplorerHeader.vue';
import ContextMenu from '../components/ContextMenu.vue';
import lightThemeEditIcon from '../assets/icons/edit.svg';
import darkThemeEditIcon from '../assets/icons/edit-dark.svg';
import lightThemeDeleteIcon from '../assets/icons/delete.svg';
import darkThemeDeleteIcon from '../assets/icons/delete-dark.svg';
import { onBeforeUpdate, onMounted, onUpdated, ref, Ref } from 'vue';
import { useDismissContextMenu } from '../composables/useDismissContextMenu';
import { useNodeManipulation } from '../composables/useNodeManipulation';

const store = useTaskifyStore();
const theme = useThemeStore().theme;

const spaceIcons: TGeneralObject = {
    light: lightThemeSpaceIcon,
    dark: darkThemeSpaceIcon
};
const boardIcons: TGeneralObject = {
    light: lightThemeBoardIcon,
    dark: darkThemeBoardIcon
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

const contextMenuTargetId: Ref<string> = ref("");
const isItemNameReadOnly: Ref<boolean> = ref(true);
const itemName = ref([]);
const { deleteNode, updateNode, makeItemNameWritable } = useNodeManipulation(itemName, isItemNameReadOnly, contextMenuTargetId);

useDismissContextMenu(contextMenuTargetId);

function changeFolder(folderId: string, isFolder: boolean) {
    if (!isFolder) return;
    store.changeFolder({ id: folderId });
}

function showContextMenu(targetId: string) {    
    contextMenuTargetId.value = targetId;
}

// function deleteNode(nodeId: string) {
//     store.deleteNode(nodeId);
// }

// onBeforeUpdate(() => itemName.value = []);
onUpdated(() => console.log(itemName.value));

</script>

<style scoped>
.explorer {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 20px;

    & .explorer-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        cursor: pointer;
        position: relative;

        .icon {
            width: 34px;
            height: 34px;
            display: grid;
            place-items: center;
        }

        .name {
            font-size: 0.75rem;
            color: var(--text);
            border: none;
            outline: none;
            background-color: transparent;
            text-align: center;
        }

        & .menu-item {
            color: var(--text);
            font-size: 0.875rem;
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
}
</style>