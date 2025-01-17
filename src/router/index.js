import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import Report from "../views/Report.vue";

// 라우트(routes) 정의 : URL 요청에 대해 어떤 페이지(컴포넌트)를 보여줄지에 대한 매핑 정보를 정의
const routes = [
    {
        path: '/',
        name: 'home',
        component: Main,
        meta: { title: "서울안녕내과 설문조사" },
    },
    {
        path: '/report',
        name: 'report',
        component: Report,
        meta: { title: "서울안녕내과 리포트" },
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;
