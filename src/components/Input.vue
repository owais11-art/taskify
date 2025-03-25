<template>
    <div class="input-container">
        <label for="">{{ label }}</label>
        <div class="input-wrapper">
            <textarea v-model="textAreaValue" :placeholder="placeholder" :readonly="readonly"  v-if="multiline"></textarea>
            <input type="date" class="date-input" :placeholder="placeholder" v-model="inputValue" :readonly="readonly" v-else-if="date">
            <input type="text" :placeholder="placeholder" v-model="inputValue" :readonly="readonly" required v-else>
            <p class="error" v-if="hasError">This Field is Required</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ModelRef } from 'vue';
    import { IInputProps } from '../interfaces';
    import { useThemeStore } from '../store/theme';

    const inputValue = defineModel() as ModelRef<string>;
    const textAreaValue = defineModel('texarea') as ModelRef<string>;
    const { label, hasError, placeholder, multiline = false, date = false, readonly = false } = defineProps<IInputProps>();

    const theme = useThemeStore().theme;
</script>

<style scoped>
    .input-container {
        display: flex;
        flex-direction: column;
        gap: 6px;

        & label {
            font-weight: 700;
            letter-spacing: 1.1px;
            color: var(--text);
        }

        & .input-wrapper {
            display: flex;
            flex-direction: column;
            gap: 3px;

            & input, & textarea {
                display: block;
                border: 2px solid;
                border-color: v-bind('hasError ? "var(--error)" : "var(--border)"');
                padding: 8px 10px;
                outline: none;
                background-color: var(--input-bg);
                color: var(--text);

                &:focus {
                    outline: none;
                }
            }

            & .date-input {
                color-scheme: v-bind('theme === "light" ? "light" : "dark"');
            }

            & textarea {
                height: 100px;
                resize: vertical;
            }

            & .error {
                font-size: 0.75rem;
                text-align: end;
                color: var(--error);
            }
        }
    }
</style>