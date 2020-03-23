const findBestMatch = function(array) {
    let result = array[0]
    array.forEach((user, index) => {
        if (array.indexOf(user, index + 1) != -1) {
            result = user
        }
    });
    
    return result
}

module.exports = findBestMatch