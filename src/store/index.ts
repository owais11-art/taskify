import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { IBoard, IFolder } from "../interfaces";
import { putUntil } from "../helpers";
import { useFolderStructure } from "../composables/useFolderStructure";

export const useTaskifyStore = defineStore("taskify-store", () => {
    // States 👇🏻
    const { folders, addNode, updateNode, removeNode, getFolderPath } = useFolderStructure();
    const activeFolder: Ref<IFolder> = ref(folders.value);
    const activeFolderPath: Ref<IFolder[]> = ref([folders.value]);
    const activeBoard: Ref<IBoard | null> = ref(null);
    const openFolders: Ref<Map<string, boolean>> = ref(new Map());
    const folderHistory: Ref<IFolder[]> = ref([]);

    // Actions 👇🏻
    function changeFolder({id = "", from = "explorer"}) {
        switch(from) {
            case "backward":
                changeFolderThroughBackwardButton();
                break;
            case "forward":
                changeFolderThroughForwardButton();
                break;
            default:
                changeFolderThroughExplorer(id);
        }
        if(!openFolders.value.has(id)) openFolders.value.set(id, true);
        activeFolder.value = activeFolderPath.value.at(-1) as IFolder;
    }

    function changeFolderThroughExplorer(id: string) {
        activeFolderPath.value = getFolderPath(id) as IFolder[];
        if(folderHistory.value.length) folderHistory.value = [];
    }

    function changeFolderThroughBackwardButton() {
        const currentFolder: IFolder = activeFolderPath.value.pop() as IFolder;
        folderHistory.value.push(currentFolder);
    }

    function changeFolderThroughForwardButton() {
        const previousFolder: IFolder = folderHistory.value.pop() as IFolder;
        activeFolderPath.value.push(previousFolder);
    }

    function deleteNode(nodeId: string) {
        removeNode(nodeId);
        if(nodeId === activeFolder.value.id) goBack();
        if(openFolders.value.has(nodeId)) updateOpenFolders("remove", nodeId);
        if(folderHistory.value.length) {
            folderHistory.value = putUntil<IFolder>(folderHistory.value.reverse(), (item: IFolder) => item.id !== nodeId).reverse();
        }
    }

    function updateOpenFolders(operation: string, folderId: string) {
        if(operation === "add") {
            openFolders.value.set(folderId, true);
        }
        else if(operation === "remove") {
            openFolders.value.delete(folderId);
        }
    }

    function goBack() {
        changeFolder({from: "backward"});
    }

    function goForth() {
        changeFolder({from: "forward"});
    }

    return {
        folders,
        activeFolder,
        activeBoard,
        activeFolderPath,
        openFolders,
        folderHistory,
        addNode,
        updateNode,
        deleteNode,
        changeFolder,
        updateOpenFolders,
        goBack,
        goForth
    };
});