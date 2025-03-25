<template>
    <div class="overlay" @click.self="hideModal">
        <div class="modal">
            <Input
                label="Group Name"
                :has-error="isGroupNameEmpty"
                placeholder="Enter Group Name"
                v-model="group"
            />
            <div class="actions">
                <button class="cancel" @click="hideModal">Cancel</button>
                <button class="create" @click="createGroup">Create</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import Input from './Input.vue';

    const emit = defineEmits(["createGroup", "hideModal"]);

    const group: Ref<string> = ref("");
    const isGroupNameEmpty: Ref<boolean> = ref(false);

    function createGroup() {
        isGroupNameEmpty.value = group.value === "";
        if(isGroupNameEmpty.value) return;
        emit("createGroup", group.value);
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

            & .actions {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 30px;

                & button {
                    cursor: pointer;
                    border: 2px solid var(--border);
                }

                & .cancel {
                    background-color: var(--secondary);
                    color: var(--text);
                }

                & .create {
                    background-color: var(--accent);
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