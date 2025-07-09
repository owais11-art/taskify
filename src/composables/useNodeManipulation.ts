import { Ref } from "vue";
import { IBoard, IFolder } from "../interfaces";
import { useTaskifyStore } from "../store";
import { closeContextMenu } from "./useDismissContextMenu";

export function useNodeManipulation(itemName: Ref<HTMLInputElement | HTMLInputElement[]>, isItemNameReadOnly: Ref<boolean>, isContextMenuVisible: Ref<boolean | string>) {
    const store = useTaskifyStore();

    function deleteNode(nodeId: string) {
        store.deleteNode(nodeId);
    }

    function updateNode(node: IFolder | IBoard, newName: string) {
        makeItemNameReadOnly();
        node.type === "folder" ? store.updateNode({
            id: node.id,
            name: newName,
            type: node.type,
            children: node.children
        }) : store.updateNode({
            id: node.id,
            name: newName,
            type: node.type,
            groups: node.groups
        });
    }

    function makeItemNameWritable(itemNameIndex: number | null = null) {
        // console.log(itemNameIndex)
        const item: HTMLInputElement = (itemNameIndex !== null && Array.isArray(itemName.value)) ? itemName.value[itemNameIndex] : itemName.value as HTMLInputElement;
        isItemNameReadOnly.value = false;
        console.log(itemName.value)
        item.select();
        item.focus();
        closeContextMenu(isContextMenuVisible);
    }

    function makeItemNameReadOnly() {
        isItemNameReadOnly.value = true;
    }

    return {
        updateNode,
        deleteNode,
        makeItemNameWritable
    };
}