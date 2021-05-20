## Deno React SSR
Deno react SSR with react-router-dom and Dero micro framework.
> By default dero use native HTTP/2 Hyper Deno. this is so fast.

DEMO => [https://deno-react-ssr.herokuapp.com](https://deno-react-ssr.herokuapp.com)

## Install and run development
```bash
git clone https://github.com/herudi/deno-react-ssr-movies.git
cd deno-react-ssr-movies
deno run --allow-net --allow-read --unstable server.tsx
```

## Build and production
### Build Client React
```bash
deno run --allow-read --allow-write --unstable build.ts
```
### Run Production
```bash
deno run --allow-net --allow-read --unstable server.tsx --deno_env=production
```

## Include Libs
* [Dero](https://github.com/herudi/dero)
* [StaticFiles](https://github.com/herudi/static-files)
* [React](https://dev.jspm.io/react@17.0.2)
* [ReactDOM](https://dev.jspm.io/react-dom@17.0.2)
* [ReactDOMServer](https://dev.jspm.io/react-dom@17.0.2/server)
* [React Router Dom](https://dev.jspm.io/react-router-dom@5.2.0)
* [swc](https://x.nest.land/swc@0.0.6)