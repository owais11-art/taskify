<template>
    <div :class="['snackbar', snackbar.isSnackbarVisible && 'show']">
        <p class="message">{{ snackbar.message }}</p>
        <div class="cancel" @click="cancelSnackbar">
            <img src="/src/assets/icons/cancel.svg" alt="cancel-icon">
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useSnackbarStore } from '../store/snackbar';

    const snackbar = useSnackbarStore();

    function cancelSnackbar() {
        snackbar.display(false);
    }
</script>

<style scoped>
    .snackbar {
        display: flex;
        align-items: center;
        gap: 30px;
        padding: 7px 10px;
        background-color: var(--snackbar-bg);
        border: 1px solid var(--border);
        position: fixed;
        right: 10px;
        bottom: 5%;
        opacity: 0;
        transition: opacity 0.5s linear;
        &.show{
            opacity: 1;
        }
        & .message {
            font-size: 0.875rem;
        }

        & .cancel {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }
</style>