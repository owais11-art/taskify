<template>
    <div class="task-header">
        <button class="create-group" @click="showCreateGroupModal">Create New Group</button>
    </div>
    <GroupedTasks
        v-for="group in store.taskGroups"
        :key="group"
        :group="group"
        @create-task="createTask"
        @edit-task="editTask"
        @show-task="showTask"
    />
    <CreateGroupModal
        v-if="isCreateGroupModalVisible"
        @create-group="createNewGroup"
        @hide-modal="hideCreateGroupModal"
    />
</template>

<script setup lang="ts">
    import { useTasksStore } from '../store/tasks';
    import GroupedTasks from '../components/GroupedTasks.vue';
    import { useRouter } from 'vue-router';
    import CreateGroupModal from '../components/CreateGroupModal.vue';
    import { ref, Ref } from 'vue';
    import { useSnackbarStore } from '../store/snackbar';

    const router = useRouter();
    const store = useTasksStore();
    const snackbar = useSnackbarStore();

    const isCreateGroupModalVisible: Ref<boolean> = ref(false);

    function createTask(group: string) {
        router.push({name: "task", query: {view: "create", group}, params: {id: crypto.randomUUID()}});
    }

    function editTask({group, taskId}: {group: string, taskId: string}) {
        router.push({name: "task", query: {view: "edit", group}, params: {id: taskId}});
    }

    function showTask({group, taskId}: {group: string, taskId: string}) {
        router.push({name: "task", query: {view: "show", group}, params: {id: taskId}});
    }

    function createNewGroup(group: string) {
        store.createGroup(group);
        snackbar.setMessage("New Group Created");
        hideCreateGroupModal();
    }

    function hideCreateGroupModal() {
        isCreateGroupModalVisible.value = false;
    }

    function showCreateGroupModal() {
        isCreateGroupModalVisible.value = true;
    }

</script>

<style scoped>
    .task-header {
        border-bottom: 1px dashed var(--border);
        padding: 5px 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        & .create-group {
            border: 2px solid var(--border);
            background-color: var(--secondary);
            cursor: pointer;
            padding: 2px 8px;
            color: var(--text);
            font-weight: 700;
        }
    }
</style>