import { React, ReactRouterDom } from "./../deps/deps-client.ts";
import { initLoad } from "../utils/helpers.ts";
import LoadingBar from './../component/LoadingBar.tsx';

const { useParams } = ReactRouterDom;

const Detail = ({ initData }: any) => {
    const [data, setData] = React.useState(initData.data || {});
    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();

    React.useEffect(() => {
        const init = async () => {
            let result = await initLoad("/api/movie/" + id, setLoading);
            if (result) {
                setData(result.data || {});
            }
        }
        init();
    }, []);
    return (
        <>
            <LoadingBar loading={loading} />
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
                        <img className="object-cover object-center rounded" alt="hero" src={"http://image.tmdb.org/t/p/w500" + data.backdrop_path} />
                    </div>
                    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">{data.title}
                        </h1>
                        <p className="mb-8 leading-relaxed">{data.overview}</p>
                        <div className="flex justify-center">
                            <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">{data.release_date}</button>
                            <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">{data.vote_average}</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Detail;