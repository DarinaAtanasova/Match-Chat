const activeUsers = [];

function userJoin(id, username, room) {
    const user = {id, username, room};
    activeUsers.push(user);

    return user;
}

function getCurrentUser(id) {
    return activeUsers.find(user => user.id === id);
}

function userLeave(id) {
    const index = activeUsers.findIndex(user => user.id === id);

    if (index !== -1) {
        return activeUsers.splice(index, 1)[0];
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};