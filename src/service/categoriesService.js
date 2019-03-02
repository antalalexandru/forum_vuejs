import axios from "axios";

export const getCategories = async(onsuccess, onerror) => {
    axios.get('http://localhost:8082/category')
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};
