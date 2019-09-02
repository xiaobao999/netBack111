    import axios from 'axios'
    const HttpServer = {}

    HttpServer.install = function (Vue) {
        axios.defaults.baseURL = 'http://localhost:53000/'
        Vue.prototype.$http = axios
    }
    export default HttpServer