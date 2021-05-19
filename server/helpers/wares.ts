import { NextFunction, HttpResponse, HttpRequest, ReactDOMServer } from "../../deps/deps-server.ts";
import { React } from "../../deps/deps-client.ts";

export const browserPath = '/client.js';

export function cors(req: HttpRequest, res: HttpResponse, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

export function react(req: HttpRequest, res: HttpResponse, next: NextFunction) {
    res.return.push((Elem) => {
        if (React.isValidElement(Elem)) {
            res.type("text/html");
            const content = (ReactDOMServer as any).renderToString(Elem);
            return `
                <html>
                    <head>
                        <meta name='viewport' content='width=device-width,minimum-scale=1,maximum-scale=1'>
                        <title>${res.locals.seo?.title || 'Home'}</title>
                        <meta name="description" content="${res.locals.seo?.desc || 'None'}">
                        <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
                        <link href="/assets/loading.css" rel="stylesheet">
                        <script>
                            window.__INITIAL_DATA__ = ${JSON.stringify(res.locals)}
                            window.BASE_URL = "https://deno-react-ssr.herokuapp.com";
                        </script>
                    </head>
                    <body>
                        <div id="root">${content}</div>
                        <script src="${browserPath}" defer></script>
                    </body>
                </html>
            `;
        }
        return;
    });
    next();
}