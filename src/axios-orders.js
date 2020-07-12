import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-project-3375c.firebaseio.com'
});


export default instance;
