import axios from "axios";

export const getIssues =  (onsuccess, onerror) => {
    axios.get('http://localhost:8082/issue')
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};

export const addNewIssue =  (issueData, onsuccess, onerror) => {
    axios.request({
        url: 'http://localhost:8082/issue',
        method: 'post',
        data: {
            title: issueData.title,
            severity: issueData.severity,
            content: issueData.content
        },
        headers: {
            "Content-Type": 'application/json',
            "Authorization": "Bearer " + localStorage.authentication_token
        }
    })
        .then(response => {
            onsuccess(response);
        })
        .catch((err) => {
            onerror(err);
        });
};

export const getIssueDetails = (issueId, onsuccess, onerror) => {
    axios.get('http://localhost:8082/issue/' + issueId)
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};

export const getIssueComments = (issueId, onsuccess, onerror) => {
    axios.get('http://localhost:8082/issue/' + issueId + '/comments')
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};
