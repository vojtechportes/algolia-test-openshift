/**
 * Set message content and type
 *
 * @param {Object|String|Integer} content
 * @param {String} type - eg. success, error
*/

const set = (content, type) => {
    if (content instanceof Error) {
        content = content.toString();
    }
    return JSON.stringify({'content': content, 'type': type});
}

module.exports = {
    'set': set
};