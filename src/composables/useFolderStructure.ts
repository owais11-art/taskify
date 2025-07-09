import { ref, Ref } from "vue";
import { IFolder, TNode, TReturnNode } from "../interfaces";
import { DUMMY_FOLDERS } from "../constants";

export function useFolderStructure() {
    const folders: Ref<IFolder> = ref(DUMMY_FOLDERS);

    function findNode(id: string, node: TNode = folders.value): TReturnNode {
        if(id === node.id) return node;
        if(node.type === "board") return;
        for(let childNode of node.children) {
            const nodeToFind: (IFolder | undefined) = findNode(id, childNode) as IFolder;
            if(nodeToFind) return nodeToFind;
        }
    }

    function findParentNode(id: string, node: TNode = folders.value, parentNode: IFolder | undefined = undefined): TReturnNode {
        if(id === node.id) return parentNode;
        if(node.type === "board") return;
        for(let childNode of node.children) {
            const parentNodeToFind: IFolder | undefined = findParentNode(id, childNode, node) as IFolder;
            if(parentNodeToFind) return parentNodeToFind;
        }
    }

    function getFolderPath(id: string) {
        const folderPath: IFolder[] = [];
        function findFolderPath(id: string, node: TNode): boolean {
            if(node.type === "board") return false;
            if(id === node.id) {
                folderPath.unshift(node);
                return true;
            }
            for(let childNode of node.children) {
                const shouldAddToFolderPath: boolean = findFolderPath(id, childNode);
                if(shouldAddToFolderPath) {
                    folderPath.unshift(node);
                    return true;
                }
            }
            return false;
        }
        findFolderPath(id, folders.value);
        return folderPath;
    }

    function addNode(newNode: TNode, parentNodeId: string) {
        const parentNode: IFolder = findNode(parentNodeId) as IFolder;
        parentNode.children.push(newNode);
    }

    function updateNode(updatedNode: TNode) {
        const node = findNode(updatedNode.id)!;
        node.name = updatedNode.name;
    }

    function removeNode(id: string) {
        const parentNode: IFolder = findParentNode(id) as IFolder;
        parentNode.children = parentNode.children.filter((childNode: TNode) => childNode.id !== id);
    }

    return {
        folders,
        getFolderPath,
        addNode,
        updateNode,
        removeNode
    };
}