
// import axios from 'axios';

// const api = axios.create({

//   baseURL:'https://geolocalizacao-mapa.herokuapp.com'
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.6:8080'
 // baseURL:'https://geolocalizacao-mapa.herokuapp.com'
});

export default api;