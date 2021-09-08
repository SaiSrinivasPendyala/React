import Axios from 'axios';

const instance = Axios.create(
    {
    baseURL: 'http://localhost:3002/api/course'
}
);

instance.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");
export default instance;