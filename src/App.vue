<template>
  <main :class="['taskify-main', theme === 'light' ? 'light' : 'dark']">
    <Snackbar />
    <Navbar @toggle-sidebar="toggleShowSideBar" />
    <div class="content">
      <aside :class="showSideBar ? 'show' : ''">
        <SideBar :folders="store?.folders" />
        <div class="close-sidebar" @click="closeSidebar">
          <img :src="crossIcons[theme]" alt="cross-icon">
        </div>
      </aside>
      <section>
        <RouterView />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue';
import Snackbar from './components/Snackbar.vue';
import SideBar from './components/SideBar.vue';
import { useThemeStore } from './store/theme';
import { onUpdated, ref, Ref } from 'vue';
import lightThemePlusIcon from "./assets/icons/plus.svg";
import darkThemePlusIcon from "./assets/icons/plus-dark.svg";
import { TGeneralObject } from './interfaces';
import { useTaskifyStore } from './store';

const store = useTaskifyStore();
const theme: string = useThemeStore().theme;

const crossIcons: TGeneralObject = {
  light: darkThemePlusIcon,
  dark: lightThemePlusIcon
};

const showSideBar: Ref<boolean> = ref(false);

function toggleShowSideBar() {
  showSideBar.value = !showSideBar.value;
}

function closeSidebar() {
  showSideBar.value = false;
}

onUpdated(() => console.log("updated App"))
</script>

<style scoped>
.taskify-main {
  background-color: var(--background);
  min-height: 100vh;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  & .content {
    display: flex;

    & aside {
      flex-basis: 20%;
      border-right: 1px solid var(--border);
      min-height: 100vh;

      & .close-sidebar {
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        right: 10px;
        top: 10px;
        display: none;
      }
    }

    & section {
      flex-basis: 80%;
      flex-grow: 1;
      padding-bottom: 20px;
    }

    @media(max-width: 950px) {
      & aside {
        flex-basis: 0%;
        border-right: none;
        position: fixed;
        left: -1000px;
        top: 0;
        height: 100%;
        z-index: 100;
        background-color: var(--background);
        width: 373px;
        border-right: 1px solid var(--border);
        transition: left 0.5s ease-in-out;

        &.show {
          left: 0;
        }

        & .close-sidebar {
          position: absolute;
          display: block;
        }
      }

      & section {
        flex-basis: 100%;
      }
    }
  }
}
</style>