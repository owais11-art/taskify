import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useThemeStore = defineStore('theme', () => {
    const theme: Ref<string> = ref("light");

    function switchTheme() {
        if(theme.value === "light") theme.value = "dark";
        else theme.value === "light";
    }

    return {
        theme,
        switchTheme
    };
});