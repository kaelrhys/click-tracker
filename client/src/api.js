import axios from 'axios';

const SERVER_PORT = 3001
export default axios.create({
  baseURL: `http://localhost:${SERVER_PORT}`
});
