import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL_CLI;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default axios;