<template>
    <div :class="['sidebar', isNested && 'nested']">
        <template v-for="folder in folders.children" :key="folder.id">
            <SidebarItem :item="folder" :is-active="store.openFolders.has(folder.id)"
                @toggle-nested-sidebar="toggleNestedSidebar" />
            <SideBar v-if="folder.type === 'folder' && store.openFolders.has(folder.id)" :folders="folder"
                is-nested />
        </template>
    </div>
</template>

<script setup lang="ts">
import { ISidebarProps } from '../interfaces';
import SidebarItem from './SidebarItem.vue';
import { useTaskifyStore } from '../store';
import { onUpdated } from 'vue';

const { folders, isNested = false } = defineProps<ISidebarProps>();

const store = useTaskifyStore();

function toggleNestedSidebar(isOpen: boolean, spaceId: string) {
    store.updateOpenFolders(isOpen ? "add" : "remove", spaceId);
}

onUpdated(() => console.log("updated sidebar"));
</script>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-top: 10px;

    &.nested {
        padding: 2px;
        padding-left: 12px;
    }

    @media(max-width: 950px) {
        padding-top: 50px;
    }
}
</style>