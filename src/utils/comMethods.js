export default {
    encrypt(obj) {
        return escape(JSON.stringify(obj)).replace(/%/g, '#');
    },
    unEncrypt(str) {
        if (typeof str !== "string") {
            return str;
        }
        let result = str;
        try {
            result = JSON.parse(unescape(str.replace(/#/g, '%')));
        } catch (e) {}
        return result;
    }
}