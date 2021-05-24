import { React, ReactRouterDom } from "./../deps/deps-client.ts";
import { initLoad } from "../utils/helpers.ts";
import { LoadingBar } from './../component/LoadingBar.tsx';

const { Link } = ReactRouterDom;

export const Home = ({ initData }: any) => {
    const [datas, setDatas] = React.useState(initData.data?.results || []);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const init = async () => {
            let result = await initLoad("/api/movie/popular", setLoading);
            if (result) {
                setDatas(result.data?.results || []);
            }
        }
        init();
    }, []);
    return (
        <>
            <LoadingBar loading={loading} />
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Welcome MOV123
                        <br className="hidden lg:inline-block" />Deno React SSR movie
                    </h1>
                        <p className="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
                        <div className="flex justify-center">
                            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                            <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">Button</button>
                        </div>
                    </div>
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                        <img className="object-cover object-center rounded" alt="hero" src="http://image.tmdb.org/t/p/w500/6ELCZlTA5lGUops70hKdB83WJxH.jpg" />
                    </div>
                </div>
            </section>
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 mx-auto">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">Latest Movies</h1>
                    <div className="flex flex-wrap -m-4">
                        {
                            datas.map((el: any, x: number) => {
                                return (
                                    <Link key={x} className="lg:w-1/5 md:w-1/2 p-4 w-full" to={"/detail/" + el.id + "/" + el.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-")}>
                                        <div>
                                            <div className="block relative h-48 rounded overflow-hidden">
                                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={"http://image.tmdb.org/t/p/w200" + el.poster_path} />
                                            </div>
                                            <div className="mt-4">
                                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">RATE : {el.vote_average}</h3>
                                                <h2 className="text-white title-font text-lg font-medium">{el.title}</h2>
                                                <p className="mt-1">{el.release_date}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }

                    </div>
                </div>
            </section>


        </>
    );
}
