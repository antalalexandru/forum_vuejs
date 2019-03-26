import axios from 'axios';

export const userLoggedIn = localStorage.auhentication_token != null;

export default function checkLogin(username, password, onsuccess, onerror) {
    let params = new URLSearchParams();
    params.append('grant_type','password');
    params.append('username', username);
    params.append('password', password);
    params.append('client_id','clientIdPassword');
    axios.post("http://localhost:8085/spring-security-oauth-server/oauth/token", params.toString(), {
        headers: {
            "Authorization": 'Basic ' + btoa("clientIdPassword:secret"),
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    })
    .then(response => {
        onsuccess(response);
    })
    .catch((err) => {
        onerror(err);
    });
}

export const checkSignup = async (username, password, email, onsuccess, onerror) => {
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

export const activateUserAccount = async(userId, activationToken, onsuccess, onerror) => {
    axios.get('http://localhost:8082/user/activate_account/' + userId + '/token/' + activationToken)
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};

export const getSelfUserInformation = async(onsuccess) => {
    if(localStorage.auhentication_token) {
        axios.request({
            url: 'http://localhost:8082/user/me',
            method: 'get',
            headers: {
                "Authorization": "Bearer " + localStorage.auhentication_token,
            }
        })
            .then(response => {
                onsuccess(response.data);
            })
            .catch((err) => {
                // TODO;
            });
    }
};

export const getUserById = async(user_id, onsuccess) => {
    if(localStorage.auhentication_token) {
        axios.get('http://localhost:8082/user/' + user_id)
            .then(response => {
                onsuccess(response.data);
            })
            .catch((err) => {
                // TODO;
            });
    }
};
