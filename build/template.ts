export const BUILD_DEV = `
import ReactClient from "https://dev.jspm.io/react@17.0.2";
import ReactDOMClient from "https://dev.jspm.io/react-dom@17.0.2";
import ReactRouterDomClient from "https://dev.jspm.io/react-router-dom@5.2.0";

const React = ReactClient as any;
const ReactDOM = ReactDOMClient as any;
const ReactRouterDom = ReactRouterDomClient as any;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [k: string]: any;
        }
    }
}

export { React, ReactDOM, ReactRouterDom };
`;

export const BUILD_PROD = `
import React from "https://esm.sh/react@17.0.2?no-check";
import ReactDOM from "https://esm.sh/react-dom@17.0.2?no-check";
import * as ReactRouterDom from "https://esm.sh/react-router-dom@5.2.0?no-check";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [k: string]: any;
        }
    }
}

export { React, ReactDOM, ReactRouterDom };
`;