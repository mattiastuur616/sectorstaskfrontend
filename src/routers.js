import {createRouter, createWebHistory} from 'vue-router';
import HomePage from "@/components/pages/HomePage.vue";
import UserInfo from "@/components/pages/UserInfo.vue";
import SectorsPage from "@/components/pages/SectorsPage.vue";
import SignUp from "@/components/user/SignUp.vue";
import LoginPage from "@/components/user/LoginPage.vue";

const routes = [
    {
        name: 'HomePage',
        component: HomePage,
        path: '/'
    },
    {
        name: 'UserInfo',
        component: UserInfo,
        path: '/userinfo'
    },
    {
        name: 'SectorsPage',
        component: SectorsPage,
        path: '/sectors'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },
    {
        name: 'LoginPage',
        component: LoginPage,
        path: '/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
