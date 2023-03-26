import { Circles } from 'react-loader-spinner';

import styles from './Spinner.module.css'

export const Spinner = () => {
    return (

        <div data-testid='spinner' className={styles['spinner-wrapper']}>
            <Circles
                height="150"
                width="150"
                color="#5CE6F7"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}
