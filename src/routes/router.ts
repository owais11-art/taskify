import { createRouter, createWebHistory } from "vue-router";
import TasksView from "../views/TasksView.vue";
import TaskView from "../views/TaskView.vue";
import ExplorerView from "../views/ExplorerView.vue";

const routes = [
    {
        path: '/',
        name: "explorer",
        component: ExplorerView
    },
    {
        path: '/task/:id',
        name: "task",
        component: TaskView
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});