import { createRouter, createWebHistory } from "vue-router";
import TasksView from "../views/TasksView.vue";
import TaskView from "../views/TaskView.vue";

const routes = [
    {
        path: '/',
        name: "tasks",
        component: TasksView
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