<template>
    <div class="explorer-header">
        <FolderPath />
        <div class="create-new">
            <button class="create-new-button" @click="showModal">CREATE NEW</button>
        </div>
    </div>
    <Teleport defer to="body .taskify-main">
        <CreateModal
            v-if="isModalVisible"
            label="Create New Folder"
            placeholder="Enter Folder Name"
            @hide-modal="hideModal"
            @create="createNew"
        />
    </Teleport>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import CreateModal from './CreateModal.vue';
    import FolderPath from './FolderPath.vue';
    import { useTaskifyStore } from '../store';

    const store = useTaskifyStore();

    const isModalVisible: Ref<boolean> = ref(false);
    
    function showModal() {
        isModalVisible.value = true;
    }

    function hideModal() {
        isModalVisible.value = false;
    }

    function createNew(folderName: string) {
        store.addNode({
            id: crypto.randomUUID(),
            name: folderName,
            type: "folder",
            children: []
        }, store.activeFolder.id);
        hideModal();
    }
    
</script>

<style scoped>
    .explorer-header {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--border);
        padding: 10px 15px;
        & .create-new {
            & .create-new-button {
                background-color: var(--accent);
                color: var(--text);
                font-weight: bold;
                border: 2px solid var(--border);
                cursor: pointer;
            }
        }
    }
</style>