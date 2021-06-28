import { BaseController, Controller, Get, Inject, Wares } from "../../deps/deps-server.ts";
import MovieService from "./MovieService.ts";
import { cors } from "../helpers/wares.ts";
import { Routes } from './../../routes.tsx';
import { React, ReactRouterDom } from './../../deps/deps-client.ts';
import { App } from './../../app.tsx';

const { StaticRouter, matchPath } = ReactRouterDom;

@Controller()
class MovieController extends BaseController {

    @Inject(MovieService)
    private readonly movieService!: MovieService;

    @Wares(cors())
    @Get("/api/movie/:id")
    async getDetail() {
        const req = this.request;
        let result = await this.movieService.getMovies(req.url);
        result.seo = {
            title: result.data.title,
            desc: result.data.overview,
        }
        return result;
    }

    @Wares(cors())
    @Get("/api/movie/popular")
    getPopular() {
        const req = this.request;
        const route: any = Routes.find(r => r.apiUrl === req.url);
        return this.movieService.getMovies(req.url, route?.seo);
    }

    @Get("/*")
    async exact() {
        const req = this.request;
        const res = this.response;
        const route: any = Routes.find(r => matchPath(req.url, r));
        if (route) {
            let apiUrl = route.apiUrl;
            if (route.name === 'detail') {
                apiUrl = apiUrl.replace(":id", req.params.wild[1]);
            }
            let result = {} as any;
            if (apiUrl) {
                result = await this.movieService.getMovies(apiUrl, route?.seo);
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