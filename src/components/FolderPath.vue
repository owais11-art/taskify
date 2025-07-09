<template>
    <div class="folder-path">
        <div class="navigation-arrows">
            <div :class="[
                'backward-arrow',
                'arrow',
                store.activeFolderPath.length > 1 && 'active-arrow'
            ]" @click="() => goBackwardAndForward('backward')">
                <img :src="theme === 'light' ? arrowIcons.light : arrowIcons.dark" alt="arrow">
            </div>
            <div :class="[
                'forward-arrow',
                'arrow',
                store.folderHistory.length && 'active-arrow'
            ]" @click="() => goBackwardAndForward('forward')">
                <img :src="theme === 'light' ? arrowIcons.light : arrowIcons.dark" alt="arrow">
            </div>
        </div>
        <div class="path">
            <div class="folder-name" v-for="folder in store.activeFolderPath" :key="folder.id">
                <p class="text" @click="() => changeFolder(folder.id)">{{ folder.name }} <span
                        v-if="folder.id !== store.activeFolder.id">/</span></p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskifyStore } from '../store';
import darkThemeArrowIcon from '../assets/icons/arrow-dark.svg';
import lightThemeArrowIcon from '../assets/icons/arrow.svg';
import { TGeneralObject } from '../interfaces';
import { useThemeStore } from '../store/theme';

const store = useTaskifyStore();
const theme = useThemeStore().theme;

const arrowIcons: TGeneralObject = {
    light: lightThemeArrowIcon,
    dark: darkThemeArrowIcon
}

function changeFolder(folderId: string) {
    store.changeFolder({ id: folderId });
}

function goBackwardAndForward(go: string) {
    if (go === "backward") store.activeFolderPath.length > 1 && store.goBack();
    else store.folderHistory.length && store.goForth();
}
</script>

<style scoped>
.folder-path {
    display: flex;
    align-items: center;
    gap: 7px;
    flex-grow: 1;

    & .navigation-arrows {
        display: flex;
        align-items: center;
        gap: 4px;

        & .arrow {
            width: 20px;
            height: 20px;
            cursor: pointer;
            opacity: 0.6;

            &.forward-arrow {
                transform: rotate(180deg);
            }

            &.active-arrow {
                opacity: 1;
            }
        }
    }

    & .path {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.875rem;

        & .text {
            cursor: pointer;
        }
    }
}
</style>