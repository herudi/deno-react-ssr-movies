import { React } from './../deps/deps-client.ts';

const LoadingBar = ({loading}: any) => {
    return (
        loading ? 
        <div className="center-div-loading">
            <div className="linear-progress-material">
                <div className="bar bar1"></div>
                <div className="bar bar2"></div>
            </div>
        </div> : null
    )
}

export default LoadingBar;
