export default {

    hasToken(){
        const token = localStorage.getItem('token');
        return token && token.length > 0;
    },

    setToken(token) {
        localStorage.setItem('token_id', token)
        
    },

    getToken() {
        return localStorage.getItem('token_id')
    },

    clearSession() {
        localStorage.removeItem('token_id')
        localStorage.clear()
    },

}