import axios from 'axios';

//create will make GET requests
export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
});
