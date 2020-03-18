const findBestMatch = function(array) {
    let result = []
    array.forEach((user, index) => {
        if (array.indexOf(user, index + 1) != -1) {
            result.push(user)
        }
    });
    return result
}

module.exports = findBestMatch