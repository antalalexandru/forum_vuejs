import axios from "axios";

export const getCategories = (onsuccess, onerror) => {
    axios.get('http://localhost:8082/category')
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};

export const getCategory = (category_id, onsuccess, onerror) => {
    axios.get('http://localhost:8082/category/' + category_id)
        .then((response) => {
            onsuccess(response);
        })
        .catch((error) => {
            onerror(error);
        });
};

