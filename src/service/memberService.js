import axios from 'axios';

function hasAnyRole(roles) {
    return roles.some(role => ('ROLE_' + role) === localStorage.role);
}

export const userLoggedIn = localStorage.authentication_token != null;

export const userPermissions = {
    canCloseTopic: hasAnyRole(['ADMIN', 'MODERATOR']),
    canEditTopicPost: hasAnyRole(['ADMIN', 'MODERATOR'])
};

export const storeUserInformation = (userData) => {
    localStorage.setItem('selfUser', JSON.stringify(userData));
};

export const getUserInformation = () => {
    let user = localStorage.getItem('selfUser');
    return user && JSON.parse(user);
};

export function checkLogin(username, password, onsuccess, onerror) {
    let params = new URLSearchParams();
    params.append('grant_type','password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id','clientIdPassword');
    axios.post("http://localhost:8085/spring-security-oauth-server/oauth/token", params.toString(), {
        headers: {
            'Authorization': 'Basic ' + btoa("clientIdPassword:secret"),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        onsuccess(response);
    })
    .catch((err) => {
        onerror(err);
    });
}

export const checkSignup = (username, password, email, onsuccess, onerror) => {
    axios.request({
        url: 'http://localhost:8082/user',
        method: 'post',
        data: {
            username: username,
            password: password,
            email: email
        },
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then(response => {
        onsuccess(response);
    })
    .catch((err) => {
        onerror(err);
    });
};

export const activateUserAccount = (userId, activationToken, onsuccess, onerror) => {
    axios.get('http://localhost:8082/user/activate_account/' + userId + '/token/' + activationToken)
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};

export const getSelfUserInformation = (onsuccess) => {
    if(localStorage.authentication_token) {
        axios.request({
            url: 'http://127.0.0.1:8082/user/me',
            method: 'get',
            headers: {
                "Authorization": "Bearer " + localStorage.authentication_token
            }
        })
            .then(response => {
                onsuccess(response.data);
            })
            .catch((err) => {
                console.log(" !! ERR ", err);
                // TODO;
            });
    }
};

export const getUserById = (user_id, onsuccess) => {
    if(localStorage.authentication_token) {
        axios.get('http://localhost:8082/user/' + user_id)
            .then(response => {
                onsuccess(response.data);
            })
            .catch((err) => {
                // TODO;
            });
    }
};

export const getUserAvatar = (avatar) => {
    if(avatar == null) {
        return 'https://forum.softpedia.com//public/style_images/carbon_blue/profile/default_large.png';
    }
    return avatar;
};

