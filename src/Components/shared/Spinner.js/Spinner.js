import { Circles } from 'react-loader-spinner';

import styles from './Spinner.module.css'

export const Spinner = () => {
    return (

        <div className={styles['spinner-wrapper']}>
            <Circles
                height="100"
                width="100"
                color="#5CE6F7"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}
