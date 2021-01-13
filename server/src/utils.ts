/**
 * Create's a random alphanumeric string
 * of the specified length
 * @param length
 * @returns
 */
export function getRandomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

/**
 * Generates a unique 5 character alphanumeric
 * string
 * @returns
 */
export function generateUniqueRandomString() {
    const now = Date.now().toString();
    let prefix = getRandomString(3);
    prefix = prefix + now.substring(now.length - 3);
    return prefix;
}
