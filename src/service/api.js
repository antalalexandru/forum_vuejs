import axios from 'axios';

const resourcesServerUrl = 'http://localhost:8082';
const authorizationServerUrl = 'http://localhost:8085';

export const basicRequest = (request) => {
    axios.request({
        url: resourcesServerUrl + request.path,
        method: request.method ? request.method : 'get',
        headers: request.headers ? request.headers : {},
        data: request.data
    })
        .then(response => request.handler(response.data))
        .catch((err) => request.handler(null, err));
};

/**
 *
 * @param request
 * @returns {Promise<void>}
 */
export const tryAthenticatedRequest = (request) => {

    if (localStorage.authentication_token == null) {
        basicRequest(request);
        return;
    }

    if (request.headers) {
        request.headers.Authorization = "Bearer " + localStorage.authentication_token
    } else {
        request.headers = {
            "Authorization": "Bearer " + localStorage.authentication_token
        };
    }


    axios.request({
        url: resourcesServerUrl + request.path,
        method: request.method ? request.method : 'get',
        headers: request.headers,
        data: request.data
    })
        .then(response => {
            request.handler(response.data);
        })
        .catch((err) => {
            let response = err.response;
            if (response.status === 401) {
                // console.log("buba", response);
                if (response.data.error === 'invalid_token') {

                    console.log("[~] invalid token");

                    let params = new URLSearchParams();
                    params.append('grant_type', 'refresh_token');
                    params.append('refresh_token', localStorage.refresh_token);
                    axios.post(authorizationServerUrl + '/spring-security-oauth-server/oauth/token', params.toString(), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic ' + btoa("clientIdPassword:secret"),
                        }
                    })
                        .then(response => {
                            console.log("[~] refresh token success");
                            localStorage.authentication_token = response.data.access_token;
                            localStorage.refresh_token = response.data.refresh_token;
                            localStorage.role = response.data.roles;

                            request.headers.Authorization = "Bearer " + localStorage.authentication_token;
                            // redo request
                            axios.request({
                                url: resourcesServerUrl + request.path,
                                method: request.method ? request.method : null,
                                headers: request.headers,
                                data: request.data
                            })
                                .then(response => {
                                    request.handler(response.data);
                                    // window.location.reload();
                                })
                                .catch(() => {
                                    localStorage.removeItem('authentication_token');
                                    localStorage.removeItem('refresh_token');
                                    localStorage.removeItem('role');
                                    window.location.reload();
                                    console.log('Error reseding request after authorization');
                                });

                        })
                        .catch((err) => {
                            let response = err.response;
                            if(response.status === 400 && response.data.error === 'invalid_grant') {
                                 localStorage.removeItem('authentication_token');
                                 localStorage.removeItem('refresh_token');
                                 localStorage.removeItem('role');
                                 document.location.href = '/';
                            }
                        });
                }
            } else {
                request.handler(null, err);
            }
        });
};

export const signUp = (userData, handler) => {
    basicRequest({
        path: '/user',
        method: 'post',
        handler: handler,
        data: {
            username: userData.username,
            password: userData.password,
            email: userData.email
        }
    });
};

export const activateUserAccount = (data, handler) => {
    basicRequest({
        path: '/user/activate_account/' + data.userId + '/token/' + data.activationToken,
        method: 'get',
        handler: handler,
    });
};

export const getSelfUserInformation = (handler) => {
    tryAthenticatedRequest({
        path: '/user/me',
        method: 'get',
        handler: handler
    });
};

export const changeCurrentPassword = (data, handler) => {
    tryAthenticatedRequest({
        path: '/user/change_password',
        method: 'patch',
        handler: handler,
        data: {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }
    });
};

export const resetPasswordRequest = (data, handler) => {
    basicRequest({
        path: '/user/reset_password_request/' + data.email,
        method: 'patch',
        handler: handler
    });
};

export const resetPassword = (data, handler) => {
    basicRequest({
        path: '/user/reset_password',
        method: 'patch',
        data: data,
        handler: handler
    });
};

export const sendReport = (data, handler) => {
    tryAthenticatedRequest({
        path: '/report',
        method: 'post',
        handler: handler,
        data: data
    });
};

export const getUnresolvedReportsCount = (handler) => {
    tryAthenticatedRequest({
        path: '/report/unresolved',
        method: 'get',
        handler: handler,
    });
};

export const getReports = (handler) => {
    tryAthenticatedRequest({
        path: '/report',
        method: 'get',
        handler: handler,
    });
};

export const getReportDetails = (data, handler) => {
    tryAthenticatedRequest({
        path: '/report/' + data.reportId,
        method: 'get',
        handler: handler,
    });
};

export const editReportStatus = (data, handler) => {
    tryAthenticatedRequest({
        path: '/report?report_id=' + data.reportId + '&status=' + data.status,
        method: 'patch',
        handler: handler,
    });
};

export const getUsers = (data, handler) => {
    tryAthenticatedRequest({
        path: '/user?page=' + (data.page == null ? 1 : data.page),
        method: 'get',
        handler: handler
    });
};

export const getCategories = (handler) => {
    basicRequest({
        path: '/category',
        method: 'get',
        handler: handler
    });
};

export const getCategoriesByParent = (data, handler) => {
    basicRequest({
        path: '/category' + (data.category_id === 0 ? '' : '/' + data.category_id),
        method: 'get',
        handler: handler
    });
};

export const getCategory = (data, handler) => {
    basicRequest({
        path: '/category/' + data.category_id,
        method: 'get',
        handler: handler
    });
};

export const getCategoryHierarchy = (data, handler) => {
    basicRequest({
        path: '/category/' + data.category_id + '/hierarchy',
        method: 'get',
        handler: handler
    });
};

export const getUserById = (data, handler) => {
    tryAthenticatedRequest({
        path: '/user/' + data.user_id,
        method: 'get',
        handler: handler
    });
};

export const sendWarnRequest = (data, handler) => {
    tryAthenticatedRequest({
        path: '/user/warn',
        method: 'post',
        handler: handler,
        data: data
    });
};


export const likePost = (data, handler) => {
    tryAthenticatedRequest({
        path: '/post/' + data.postId + '/like',
        method: 'patch',
        handler: handler,
    });
};

export const unlikePost = (data, handler) => {
    tryAthenticatedRequest({
        path: '/post/' + data.postId + '/unlike',
        method: 'patch',
        handler: handler,
    });
};

export const markPostAsDeleted = (data, handler) => {
    tryAthenticatedRequest({
        path: '/post/' + data.postId,
        method: 'delete',
        handler: handler,
    });
};


export const getLastPostsByUserId = (userId, handler) => {
    basicRequest({
        path: '/post/by_user/' + userId,
        method: 'get',
        handler: handler,
    });
};

export const getUserWarnHistory = (data, handler) => {
    tryAthenticatedRequest({
        path: '/user/warn/' + data.userId,
        method: 'get',
        handler: handler,
    });
};

export const searchPosts = (data, handler) => {
    basicRequest({
        path: '/post/search?query=' + data.query,
        method: 'get',
        handler: handler,
    });
};


export const updateUserProfile = (data, handler) => {
    tryAthenticatedRequest({
        path: '/user/update_profile',
        method: 'patch',
        handler: handler,
        data: data
    });
};

export const updateCategoriesRank = (data, handler) => {
    tryAthenticatedRequest({
        path: '/category/rank',
        method: 'patch',
        handler: handler,
        data: data
    });
};

export const addNewCategory = (data, handler) => {
    tryAthenticatedRequest({
        path: '/category',
        method: 'post',
        handler: handler,
        data: data
    });
};

export const updateCategory = (data, handler) => {
    tryAthenticatedRequest({
        path: '/category/' + data.id,
        method: 'put',
        handler: handler,
        data: data
    });
};

export const getGroups = (handler) => {
    basicRequest({
        path: '/group',
        method: 'get',
        handler: handler,
    });
};

export const updateUserGroup = (data, handler) => {
    tryAthenticatedRequest({
        path: '/user/' + data.user_id + '/update_group/' + data.group_id,
        method: 'patch',
        handler: handler,
        data: data
    });
};

export const deleteCategory = (data, handler) => {
    tryAthenticatedRequest({
        path: '/category/' + data.category_id,
        method: 'delete',
        handler: handler,
        data: data
    });
};


