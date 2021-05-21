import { NextFunction, HttpResponse, HttpRequest, ReactDOMServer } from "../../deps/deps-server.ts";
import { React } from "../../deps/deps-client.ts";
import { BROWSER_PATH, BASE_URL } from './../../constant.ts';

export const browserPath = '/development.js';

type OptsCors = {
    allowOrigin?: string;
    allowMethods?: string;
    allowHeaders?: string;
}

export function cors(opts = {} as OptsCors) {
    return (req: HttpRequest, res: HttpResponse, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', opts.allowOrigin || '*');
        res.header('Access-Control-Allow-Methods', opts.allowMethods || '*');
        res.header('Access-Control-Allow-Headers', opts.allowHeaders || '*');
        next();
    }
}

export function react(template: string) {
    return (req: HttpRequest, res: HttpResponse, next: NextFunction) => {
        res.return.push((Elem) => {
            if (React.isValidElement(Elem)) {
                res.type("text/html");
                const content = (ReactDOMServer as any).renderToString(Elem);
                return template
                    .replace("{{title}}", res.locals.seo?.title || 'Home')
                    .replace("{{description}}", res.locals.seo?.desc || 'None')
                    .replace("{{content}}", content)
                    .replace("{{client_script}}", `<script src="${BROWSER_PATH}" defer></script>`)
                    .replace("{{window_script}}", `<script>window.__INITIAL_DATA__ = ${JSON.stringify(res.locals)}; window.BASE_URL = "${BASE_URL}";</script>`);
            }
            return;
        });
        next();
    }
}