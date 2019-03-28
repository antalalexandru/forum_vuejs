import axios from "axios";

export const getIssues = async (onsuccess, onerror) => {
    axios.get('http://localhost:8082/issue')
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};
