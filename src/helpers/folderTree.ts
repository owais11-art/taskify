import { ROOT_SPACE_ID } from "../constants";
import { IBoard, IFolder } from "../interfaces";

class FolderTree {
    root: IFolder;
    constructor() {
        this.root = {
            id: ROOT_SPACE_ID,
            name: "~root",
            type: "folder",
            children: [
                {
                    id: "1",
                    name: "My Space",
                    type: "folder",
                    children: [
                        {
                            id: "A1",
                            name: "Internal Board",
                            type: "board",
                            groups: []
                        },
                        {
                            id: "A2",
                            name: "Internal Board 2",
                            type: "board",
                            groups: []
                        },
                        {
                            id: "A3",
                            name: "Internal Board 3",
                            type: "board",
                            groups: []
                        },
                        {
                            id: "A4",
                            name: "Internal Space",
                            type: "folder",
                            children: [
                                {
                                    id: "B1",
                                    name: "New Board",
                                    type: "board",
                                    groups: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: "2",
                    name: "My Board",
                    type: "board",
                    groups: []
                }
            ]
        };
    }

    find(id: string, node: IFolder | IBoard = this.root): (IFolder | IBoard) | undefined {
        if(node.id === id) return node;
        if(node.type === "board") return;
        for(let newNode of node.children) {
            const nodeToFind: (IFolder | IBoard) | undefined = this.find(id, newNode);
            if(nodeToFind) return nodeToFind;
        }
    }

    findParentNode(id: string, node: IFolder | IBoard = this.root, parentNode: IFolder | undefined = undefined): IFolder | undefined {
        if(node.id === id) return parentNode;
        if(node.type === "board") return;
        for(let newNode of node.children) {
            const nodeToFind: (IFolder | null) | undefined = this.findParentNode(id, newNode, node);
            if(nodeToFind) return nodeToFind;
        }
    }

    getFolderPath(id: string): IFolder[] {
        const folderPath: IFolder[] = [];
        function findFolderPath(id: string, node: IFolder | IBoard): boolean {
            if(node.type === "board") return false;
            if(node.id === id) {
                folderPath.unshift(node);
                return true;
            }
            for(let newNode of node.children) {
                const returnedFolderPath: boolean | undefined = findFolderPath(id, newNode);
                if(returnedFolderPath) {
                    newNode.type === "folder" && folderPath.unshift(node);
                    return true;
                }
            }
            return false;
        }
        findFolderPath(id, this.root)
        return folderPath;
    }

    add(newNode: IFolder | IBoard, childOfID: string) {
        if(childOfID === ROOT_SPACE_ID) {
            this.root.children.push(newNode);
            return;
        }
        const parentNode = this.find(childOfID) as IFolder;
        parentNode.children.push(newNode);
    }

    update(updatedNode: IFolder | IBoard) {
        let node = this.find(updatedNode.id)!;
        node.name = updatedNode.name;
    }

    remove(nodeId: string) {
        const parentNode: IFolder = this.findParentNode(nodeId) as IFolder;
        parentNode.children = parentNode.children.filter(
            (child: IFolder | IBoard) => child.id !== nodeId
        );
    }
}

export const folderTree: FolderTree = new FolderTree();