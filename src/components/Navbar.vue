<template>
    <header>
        <h2 class="logo">taskify</h2>
        <div class="hamburger" @click="toggleSideBar">
            <img :src="hamburgerIcons[theme]" alt="hamburger-icon" />
        </div>
    </header>
</template>

<script setup lang="ts">
    import lightThemeHamburgerIcon from '../assets/icons/hamburger.svg';
    import darkThemeHamburgerIcon from '../assets/icons/hamburger-dark.svg';
    import { TGeneralObject } from '../interfaces';
    import { useThemeStore } from '../store/theme';

    const emit = defineEmits(['toggleSidebar']);

    const theme = useThemeStore().theme;

    const hamburgerIcons: TGeneralObject = {
        light: lightThemeHamburgerIcon,
        dark: darkThemeHamburgerIcon
    };

    function toggleSideBar() {
        emit("toggleSidebar");
    }
</script>

<style scoped>
    header {
        padding: 7px 15px;
        border-bottom: 1.6px solid var(--border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        & .logo {
            letter-spacing: 2.5px;
            color: var(--primary);
        }
        & .hamburger {
            width: 34px;
            height: 34px;
            cursor: pointer;
            display: none;
        }

        @media(max-width: 950px) {
            & .hamburger {
                display: block;
            }
        }
    }
</style>