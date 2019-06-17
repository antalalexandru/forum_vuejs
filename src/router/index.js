import Vue from 'vue'
import Router from 'vue-router'
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import EmailConfirmationReminder from "@/components/EmailConfirmationReminder";
import AccountActivation from "@/components/AccountActivation";
import UserProfile from "@/components/UserProfile";
import BoardIndex from "@/components/BoardIndex";
import Issues from "@/components/Issues";

import CategoryDetails from "../components/CategoryDetails";
import AddNewIssue from "@/components/AddNewIssue";
import IssueDetails from "@/components/IssueDetails";
import AddNewTopic from "@/components/AddNewTopic";
import ViewTopic from "@/components/ViewTopic";
import AccountSettings from "@/components/AccountSettings";
import ForgotPasswordRequest from "@/components/ForgotPasswordRequest";
import ResetPassword from "@/components/ResetPassword";
import Reports from "@/components/Reports";
import UserList from "@/components/UserList";
import Search from "@/components/Search";
import AdminControlPanel from "@/components/AdminControlPanel";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'board_index',
            component: BoardIndex
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
            path: '/user_settings',
            name: 'account_settings',
            component: AccountSettings
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
        },

        {
            path: '/forgot_password',
            name: 'forgot_password',
            component: ForgotPasswordRequest
        },

        {
            path: '/reset_password',
            name: 'reset_password',
            component: ResetPassword
        },

        {
            path: '/reports',
            name: 'reports',
            component: Reports
        },

        {
            path: '/users_list',
            name: 'users_list',
            component: UserList
        },

        {
            path: '/search',
            name: 'search',
            component: Search
        },

        {
            path: '/admincp',
            name: 'admincp',
            component: AdminControlPanel
        }

    ]
})
