import { createMemoryHistory, createRouter } from 'vue-router'

//主路由
const IndexRouter = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: "/",
            redirect: "/index"
        },
        {
            path: "/index",
            component: () => import("../views/index.vue"),
        },
        {
            path: "/first",
            component: () => import("../views/first.vue"),
        },{
            path: "/web",
            component: () => import("../views/web.vue"),
        }
    ]
})

export default IndexRouter