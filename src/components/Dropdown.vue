<template>
    <div class="dropdown-container">
        <label for="">{{ label }}</label>
        <div class="dropdown-wrapper" @click="toggleShowOptions">
            <div class="input-wrapper">
                <input type="text" readonly v-model="selectedOption">
            </div>
            <div :class="['chevron', showOptions && 'open']" v-if="!readonly">
                <img :src="chevrons[theme]" alt="chevron-icon">
            </div>
        </div>
        <div :class="['options', showOptions && 'show']">
            <div class="animated-options-wrapper">
                <div
                    :class="['option', option === selectedOption && 'active']"
                    v-for="option in options"
                    :key="option"
                    @click="() => changeSelectedOption(option)"
                >{{ option }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import lightThemeChevron from "../assets/icons/chevron.svg";
    import darkThemeChevron from "../assets/icons/chevron-dark.svg";
    import { useThemeStore } from "../store/theme";
    import { IDropdownProps, TGeneralObject } from "../interfaces";
    import { ModelRef, Ref, ref } from "vue";

    const selectedOption = defineModel() as ModelRef<string>;
    const { options, label, readonly = false } = defineProps<IDropdownProps>();

    const theme = useThemeStore().theme;

    const showOptions: Ref<boolean> = ref(false);

    const chevrons: TGeneralObject = {
        light: lightThemeChevron,
        dark: darkThemeChevron
    };

    const backgrounds: TGeneralObject = {
        high: "var(--priority-high)",
        medium: "var(--priority-medium)",
        low: "var(--priority-low)"
    };

    function toggleShowOptions() {
        if(readonly) return;
        showOptions.value = !showOptions.value;
    }

    function changeSelectedOption(option: string) {
        selectedOption.value = option;
        toggleShowOptions();
    }

</script>

<style scoped>
    .dropdown-container {
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;

        & label {
            font-weight: 700;
            letter-spacing: 1.1px;
            color: var(--text);
        }

        & .options {
            background-color: var(--dropdown-bg);
            position: absolute;
            top: calc(100% + 6px);
            width: 100%;
            display: grid;
            grid-template-rows: 0fr;
            transition: grid-template-rows 0.3s ease-in-out, box-shadow 0.6s ease-in-out;
            z-index: 1;

            & > .animated-options-wrapper {
                overflow: hidden;
            }

            &.show {
               grid-template-rows: 1fr;
               box-shadow: 0 0 5px 2px var(--shadow);
            }

            & .option {
                padding: 8px 10px;
                color: var(--text);
                cursor: pointer;

                &.active {
                    background-color: var(--background);
                }
            }
        }
    }
    .dropdown-wrapper {
        display: flex;
        align-items: center;
        border: 2px solid var(--border);
        padding: 0 10px;
        cursor: pointer;
        background-color: v-bind('backgrounds[selectedOption.toLowerCase()] ?? "var(--status-bg)"');
        transition: background-color 0.6s linear;

        & .input-wrapper {
            flex-grow: 1;

            & input {
                background-color: transparent;
                border: none;
                outline: none;
                padding: 8px 0;
                color: var(--text);
                width: 100%;

                &:focus {
                    border: none;
                    outline: none;
                }
            }
        }

        & .chevron {
            width: 24px;
            height: 24px;
            transition: all 0.3s linear;

            &.open {
                transform: rotate(180deg);
            }
        }
    }
</style>