export const formatTimestamp = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    if(min < 10) {
        min = '0' + min;
    }
    if(hour < 10) {
        hour = '0' + hour;
    }
    return date + ' ' + month + ' ' + year + ', ' + hour + ':' + min;
};

export const statusBadge = (status) => {
    switch (status) {
        case 'PENDING': return 'badge-secondary';
        case 'FIXED': return 'badge-success';
        case 'CONFIRMED': return 'badge-danger';
    }
};

export const getUserGroupFormatted = (group) => {
    return group.format_prefix + group.name + group.format_suffix;
};
