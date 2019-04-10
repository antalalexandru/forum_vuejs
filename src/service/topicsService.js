import axios from "axios";

export const addNewTopic = async (topicData, onSuccess, onFailure) => {
    axios.request({
        url: 'http://localhost:8082/topic',
        method: 'post',
        data: {
            title: topicData.title,
            category_id: parseInt(topicData.categoryId),
            content: topicData.content
        },
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + localStorage.authentication_token
        }
    })
        .then(response => {
            onSuccess(response);
        })
        .catch((err) => {
            onFailure(err);
        });
};

export const getTopicsByCategoryId = async (categoryId, onSuccess, onFailure) => {
    axios.get('http://localhost:8082/topic?category_id=' + categoryId)
        .then(response => {onSuccess(response);})
        .catch(err => onFailure(err));
};

export const getTopicById = async (topicId, onSuccess, onFailure) => {
    axios.get('http://localhost:8082/topic/' + topicId)
        .then(response => onSuccess(response))
        .catch(err => onFailure(err));
};

export const getPostsByTopicId = async(topicId, page, onSuccess, onFailure) => {
    axios.get('http://localhost:8082/post?topic_id=' + topicId + '&page=' + page)
        .then(response => onSuccess(response))
        .catch(err => onFailure(err));
};

export const addPostToTopic = async (topicId, postContent, onSuccess, onFailure) => {
    axios.request({
        url: 'http://localhost:8082/post',
        method: 'post',
        data: {
            topicId: topicId,
            content: postContent
        },
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + localStorage.authentication_token
        }
    })
        .then(response => {
            onSuccess(response);
        })
        .catch((err) => {
            onFailure(err);
        });
};

export const setTopicClosedStatus = async(topicId, topicClosed, handler) => {
    axios.request({
            url: 'http://localhost:8082/topic/' + topicId + '/closed/' + (topicClosed ? 'true' : 'false'),
            method: 'patch',
            headers: {
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Bearer " + localStorage.authentication_token
            }
        })
        .then(response => handler(response))
        .catch(err => handler(null, err));
};

export const editTopicPost = async (postId, newContent, editReason, handler) => {
    axios.request({
        url: 'http://localhost:8082/post',
        method: 'patch',
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Bearer " + localStorage.authentication_token
        },
        data: {
            postId: postId,
            newContent: newContent,
            editReason: editReason === '' ? null : editReason
        },
    })
        .then(response => handler(response))
        .catch(err => handler(null, err));
};
