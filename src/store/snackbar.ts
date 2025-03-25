import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { TSnackbarMessageType } from "../interfaces";

export const useSnackbarStore = defineStore("snackbar", () => {
    // Variables 👇🏻
    let timer: any = null;

    // States 👇🏻
    const message: Ref<string> = ref("");
    const isSnackbarVisible: Ref<boolean> = ref(false);
    const messageType: Ref<TSnackbarMessageType> = ref("success");

    // Actions 👇🏻
    function setMessage(msg: string, type: TSnackbarMessageType = "success") {
        message.value = msg;
        messageType.value = type;
        display(true);
        timer = setTimeout(() => display(false), 3000);
    }

    function display(showSnackbar: boolean) {
        isSnackbarVisible.value = showSnackbar;
        if(timer) clearTimeout(timer);
    }

    return {
        message,
        isSnackbarVisible,
        messageType,
        setMessage,
        display
    };
});