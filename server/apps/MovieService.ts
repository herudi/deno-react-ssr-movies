
const BASE_API = "https://api.themoviedb.org/3";
const API_KEY = "dbc28f5be475ba0a9a48c41d6f576953";

const apiServer = async (url: string, method: string = "GET") => {
    url = BASE_API + url;
    let _url = new URL(url);
    let query = "?api_key=" + API_KEY;
    if (_url.search !== "") {
        query = _url.search + "&api_key=" + API_KEY;
    }
    const result = await fetch(url + query, {
        "method": method
    });
    if (result.ok) {
        const data = await result.json();
        return data;
    }
    let error = new Error() as any;
    error.status = result.status;
    error.message = result.statusText;
    throw error;
};

export default class MovieService {
    async getMovies(url: string, seo?: any) {
        url = url.replace("api/", "");
        const data = await apiServer(url);
        return { statusCode: 200, data, seo: seo || {} };
    }
}