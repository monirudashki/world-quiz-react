import { Circles } from 'react-loader-spinner';

export const Spinner = () => {
    return (
        <Circles
            height="100"
            width="100"
            color="#5CE6F7"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    );
}
