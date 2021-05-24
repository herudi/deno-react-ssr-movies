import { React, ReactRouterDom } from "./deps/deps-client.ts";
import { Routes } from './routes.tsx';
import { Navbar } from './component/Navbar.tsx';
import { Footer } from './component/Footer.tsx';
import { LoadingBar } from './component/LoadingBar.tsx';

const { Switch, Route, useLocation } = ReactRouterDom;


function ScrollToTop() {
    const { pathname } = useLocation();

    React.useEffect(() => {
        (window as any).scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export const App = ({ isServer, Component, initData }: any) => {

    if (isServer) return (
        <>
            <Navbar />
            <Component initData={initData} />
            <Footer />
        </>
    );

    return (
        <React.Suspense fallback={<LoadingBar loading={true} />}>
            <Navbar />
            <ScrollToTop />
            <Switch>
                {Routes.map((el, x) => {
                    return <Route
                        {...el}
                        key={x}
                        component={(props: any) => {
                            let _initData;
                            if ((window as any).__INITIAL_DATA__) {
                                _initData = initData;
                                delete (window as any).__INITIAL_DATA__;
                            }
                            if (el.seo) {
                                //@ts-ignore
                                document.title = el.seo.title;
                            }
                            return <el.component {...props} initData={_initData} />;
                        }}
                    />
                })}
            </Switch>
            <Footer />
        </React.Suspense>
    );
}