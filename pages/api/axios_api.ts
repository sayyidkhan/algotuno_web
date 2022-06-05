import axios from 'axios';
import { BASE_URL } from '../../lib/db_prod_checker';

//change the port the number to be the same backend port number, in order for the api to be able to talk
export default axios.create({
    baseURL : BASE_URL
});