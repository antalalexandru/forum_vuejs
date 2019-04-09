import Vue from 'vue'
import Router from 'vue-router'
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import EmailConfirmationReminder from "@/components/EmailConfirmationReminder";
import AccountActivation from "@/components/AccountActivation";
import UserProfile from "@/components/UserProfile";
import Categories from "@/components/Categories";
import Issues from "@/components/Issues";

import CategoryDetails from "../components/CategoryDetails";
import AddNewIssue from "@/components/AddNewIssue";
import IssueDetails from "@/components/IssueDetails";
import AddNewTopic from "@/components/AddNewTopic";
import ViewTopic from "@/components/ViewTopic";

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
            path: '/category/:category_id/add',
            name: 'add_new_topic',
            component: AddNewTopic
        },



        {
            path: '/issues',
            name: 'issues',
            component: Issues
        },

        {
            path: '/issues/add',
            name: 'add_issue',
            component: AddNewIssue
        },

        {
            path: '/issue/:issue_id',
            name: 'issue_details',
            component: IssueDetails
        },

        {
            path: '/topic/:topic_id',
            name: 'topic_details',
            component: ViewTopic
        }

    ]
})
