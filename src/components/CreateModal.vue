<template>
    <div class="overlay" @click.self="hideModal">
        <div class="modal">
            <Input
                :label="label"
                :has-error="isInputEmpty"
                :placeholder="placeholder"
                v-model="inputValue"
            />
            <div class="actions">
                <button class="cancel" @click="hideModal">Cancel</button>
                <button class="create" @click="create">Create</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, Ref } from 'vue';
    import Input from './Input.vue';
    import { ICreateModalProps } from '../interfaces';

    const { label, placeholder } = defineProps<ICreateModalProps>();
    const emit = defineEmits(["create", "hideModal"]);

    const inputValue: Ref<string> = ref("");
    const isInputEmpty: Ref<boolean> = ref(false);

    function create() {
        isInputEmpty.value = inputValue.value === "";
        if(isInputEmpty.value) return;
        emit("create", inputValue.value);
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