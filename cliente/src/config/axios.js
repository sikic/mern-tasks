import Axios from 'axios'

const clienteAxios = Axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
});

export default clienteAxios;