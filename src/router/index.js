import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import TopicTemplate from '../components/TopicTemplate.vue'
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import EmailConfirmation from "@/components/EmailConfirmation";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'skills',
            component: HelloWorld
        },
        {
            path: '/bar',
            name: 'about',
            component: TopicTemplate
        },
        // ---------------------------------------
        // Log in component
        // ---------------------------------------
        {
            path: '/user/login',
            name: 'autentificare',
            component: LogIn
        },
        // ---------------------------------------
        // Sign up component
        // ---------------------------------------
        {
            path: '/user/signup',
            name: 'inregistrare',
            component: SignUp
        },
        // ---------------------------------------
        // Email confirmation help page (resend email, etc)
        // ---------------------------------------
        {
            path: '/user/confirmemail',
            name: 'confirmare_email',
            component: EmailConfirmation
        }

    ]
})
