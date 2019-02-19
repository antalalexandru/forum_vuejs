import axios from 'axios';

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
            /* eslint-disable no-console */
            console.log(response);
            /* eslint-enable no-console */
            onsuccess(response);
        })
        .catch((err) => {
            /* eslint-disable no-console */
            console.log(err);
            /* eslint-enable no-console */

            onerror(err);
        });
}

export const checkSignup = async (username, password, email, onsuccess, onerror) => {
   /*axios.post("http://localhost:8085/user", {

        username: username,
        password: password,
        email: email

        }, {
            headers: {
                "Content-Type": 'application/json'
            }
        }
        }).then(response => {
            console.log(response);
            onsuccess(response);
        })
        .catch((err) => {
            console.log(err);
            onerror(err);
        });
    */

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
