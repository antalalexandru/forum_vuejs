import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import TopicTemplate from '../components/TopicTemplate.vue'
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import EmailConfirmationReminder from "@/components/EmailConfirmationReminder";
import AccountActivation from "@/components/AccountActivation";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'skills',
            component: HelloWorld
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
        // Email confirmation reminder
        // ---------------------------------------
        {
            path: '/user/email_confirmation_reminder',
            name: 'email_confirmation_reminder',
            component: EmailConfirmationReminder
        },
        {
            path: '/user/:user_id/activate_account/:activation_token',
            name: 'account_activation',
            component: AccountActivation
        }
    ]
})
