<template>
    <div class="overlay" @click.self="hideModal">
        <div class="modal">
            <h3>Are you sure?</h3>
            <div class="actions">
                <button class="cancel" @click="hideModal">Cancel</button>
                <button class="delete" @click="handleDelete">Delete</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const emit = defineEmits(["handleDelete", "hideModal"]);

    function handleDelete() {
        emit("handleDelete");
    }

    function hideModal() {
        emit("hideModal");
    }
</script>

<style scoped>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--overlay);
        display: grid;
        place-items: center;
        z-index: 1;
        
        & .modal {
            width: 30%;
            background-color: var(--background);
            padding: 18px;
            box-shadow: 0 0 5px 5px var(--shadow);

            & h3{
                color: var(--text);
                margin-bottom: 50px;
            }

            & .actions {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 10px;

                & button {
                    cursor: pointer;
                    border: 2px solid var(--border);
                }

                & .cancel {
                    background-color: var(--secondary);
                    color: var(--text);
                }

                & .delete {
                    background-color: var(--delete);
                    color: var(--text);
                }
            }
        }
    }

    @media(max-width: 768px) {
        .overlay {
            & .modal {
                width: 50%;
            }
        }
    }

    @media(max-width: 500px) {
        .overlay {
            & .modal {
                width: 80%;
            }
        }
    }
</style>