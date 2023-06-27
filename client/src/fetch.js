import axios from 'axios';

let api;

if (process.env.NODE_ENV === 'development') {
    api = axios.create({ baseURL: 'http://localhost:3000' });
} else if (process.env.NODE_ENV === 'production') {
    api = axios.create({ baseURL: 'https://hermespeech.wse.jhu.edu' });
}

export default api;