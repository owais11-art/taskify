import { onMounted, onUnmounted, Ref } from "vue";
export function closeContextMenu(isContextMenuVisible: Ref<boolean | string>) {
    if(!isContextMenuVisible.value) return;
    isContextMenuVisible.value = typeof(isContextMenuVisible.value) === "string" ? "" : false;
}

export function useDismissContextMenu(isContextMenuVisible: Ref<boolean | string>) {
    const closeContextMenuWrapper = () => closeContextMenu(isContextMenuVisible);
    onMounted(() => document.addEventListener('click', closeContextMenuWrapper));
    onUnmounted(() => document.removeEventListener('click', closeContextMenuWrapper));
}