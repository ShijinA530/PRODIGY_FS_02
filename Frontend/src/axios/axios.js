import axios from 'axios';

// Configure axios with the base URL
const Axios = axios.create({
  baseURL: 'https://prodigy-fs-02-0n0p.onrender.com'
});

export default Axios;
