import { Controller, Get, HttpRequest, HttpResponse, NextFunction, Wares } from "../../deps/deps-server.ts";
import MovieService from "./MovieService.ts";
import { cors } from "../helpers/wares.ts";
import Routes from './../../routes.tsx';
import { React, ReactRouterDom } from './../../deps/deps-client.ts';
import App from './../../app.tsx';

const { StaticRouter, matchPath } = ReactRouterDom;
const movieService: MovieService = new MovieService();

@Controller()
class MovieController {

    @Wares(cors())
    @Get("/api/movie/:id")
    async getDetail(req: HttpRequest) {
        let result = await movieService.getMovies(req.url);
        result.seo = {
            title: result.data.title,
            desc: result.data.overview,
        }
        return result;
    }

    @Wares(cors())
    @Get("/api/movie/popular")
    async getPopular(req: HttpRequest) {
        const route: any = Routes.find(r => r.apiUrl === req.url);
        return movieService.getMovies(req.url, route?.seo);
    }

    @Get("/*")
    async exact(req: HttpRequest, res: HttpResponse, next: NextFunction) {
        const route: any = Routes.find(r => matchPath(req.url, r));
        if (route) {
            let apiUrl = route.apiUrl;
            if (route.name === 'detail') {
                apiUrl = apiUrl.replace(":id", req.params.wild[1]);
            }
            let result = {} as any;
            if (apiUrl) {
                result = await movieService.getMovies(apiUrl, route?.seo);
                if (route.name === 'detail') {
                    result.seo = {
                        title: result.data.title,
                        desc: result.data.overview,
                    }
                }
            } else {
                result = { seo: route?.seo || {} };
            }
            res.locals = result || {};
            return (
                <StaticRouter location={req.url}>
                    <App isServer={true} Component={route.component} initData={result} />
                </StaticRouter>
            );
        }
        return res.status(404).body("Not Found");
    }
}

export default MovieController;