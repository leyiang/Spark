import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: "/",
            name: "index",
            component: () => import("./index")
        },

        {
            path: "/upload",
            name: "upload",
            component: () => import("./upload")
        },

        {
            path: "/edit",
            name: "edit",
            component: () => import("./edit")
        }
    ]
});

export default router;