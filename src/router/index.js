import Vue from 'vue'
import Router from 'vue-router'
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import EmailConfirmationReminder from "@/components/EmailConfirmationReminder";
import AccountActivation from "@/components/AccountActivation";
import UserProfile from "@/components/UserProfile";
import Categories from "@/components/Categories";
import AddNewTopic from "@/components/AddNewTopic";
import CategoryDetails from "../components/CategoryDetails";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'categories',
            component: Categories
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
        },

        {
            path: '/user/:user_id',
            name: 'user_profile',
            component: UserProfile
        },

        {
            path: '/category/:category_id',
            name: 'category_details',
            component: CategoryDetails
        },

        {
            path: '/topic/add_new_topic/:category_id',
            name: 'add_new_topic',
            component: AddNewTopic
        },
    ]
})
