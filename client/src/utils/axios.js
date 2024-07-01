import axios from 'axios'

const instance = axios.create({
    baseURL: 'full-stack-pet-project-react-js-node-js-express-js-mongo-db-api.vercel.app'
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config;
})

export default instance
