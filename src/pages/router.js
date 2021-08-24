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
            component: () => import("./upload/index")
        },

        {
            path: "/edit/:id",
            name: "edit",
            component: () => import("./edit/index")
        }
    ]
});

export default router;
