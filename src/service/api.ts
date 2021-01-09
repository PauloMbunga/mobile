import axios from 'axios';

const api = axios.create({
  baseURL: 'https://geo-escolas-api.herokuapp.com'

});

export default api;