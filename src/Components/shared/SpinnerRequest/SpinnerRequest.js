import { Dna } from 'react-loader-spinner';

export const SpinnerRequest = () => {
    return (
        <Dna
            visible={true}
            height="25"
            width="25"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
        />
    )
}