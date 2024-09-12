import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/";
//create will make GET requests
export default axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
        part: "snippet",
    },
});

export const getSearchedVideos = searchQuery => {
    axios.get(BASE_URL`/search`, {
        params: {
            part: "snippet",
            q: searchQuery,
            key: API_KEY,
        },
    });
};
