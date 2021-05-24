import { React, ReactRouterDom } from './../deps/deps-client.ts';

const { Link, useLocation } = ReactRouterDom;

function activeMenu(pathname: string, current: string) {
    return pathname === current ? 'bg-gray-900 ' : '';
}

export const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <div style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>Mov123</div>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link to="/" className={activeMenu(location.pathname, '/') + "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Movies</Link>
                                <Link to="/galery" className={activeMenu(location.pathname, '/galery') + "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Galery</Link>
                                <Link to="/pricing" className={activeMenu(location.pathname, '/pricing') + "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Pricing</Link>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <a href="https://github.com/herudi/deno-react-ssr-movies">GITHUB</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="sm:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/" className={activeMenu(location.pathname, '/') + "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Movies</Link>
                    <Link to="/galery" className={activeMenu(location.pathname, '/galery') + "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Galery</Link>
                    <Link to="/pricing" className={activeMenu(location.pathname, '/pricing') + "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"}>Pricing</Link>
                </div>
            </div>
        </nav>
    )
}
