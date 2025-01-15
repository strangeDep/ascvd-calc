import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import Report from "../views/Report.vue";

//라우트(routes) 정의 : URL 요청에 대해 어떤 페이지(컴포넌트)를 보여줄지에 대한 매핑정보를 정의
const routes = [
    {
        path: '/',
        name: 'home',
        component: Main,
    },
    {
        path: '/report',
        name: 'report',
        component: Report,
    },
];
const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;