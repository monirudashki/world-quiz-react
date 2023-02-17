import styles from '../Jokers/PublicJoker.module.css';

export const PublicJoker = ({
    showPublicJokerHandler,
    question
}) => {

    const firstAnswer = question.firstAnswer;
    const secondAnswer = question.secondAnswer;
    const thirdAnswer = question.thirdAnswer;
    const fourthAnswer = question.fourthAnswer;
    const wrightAnswer = question.wrightAnswer;

    const hidePublicJokerHandler = () => {
        showPublicJokerHandler(false);
    }

    let graphStyle1 = { gridColumn: 2, '--h': firstAnswer === wrightAnswer ? "56%" : "12%" };
    let graphStyle2 = { gridColumn: 3, '--h': secondAnswer === wrightAnswer ? "56%" : "6%" };
    let graphStyle3 = { gridColumn: 4, '--h': thirdAnswer === wrightAnswer ? "56%" : "17%" };
    let graphStyle4 = { gridColumn: 5, '--h': fourthAnswer === wrightAnswer ? "56%" : "9%" };

    return (
        <div className={styles['public-container']}>
            <div className={styles['public-wrapper']}>
                <figure aria-hidden="true">
                    <div className={styles['graph']}>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <span className={styles['graphRowLabel']}></span>
                        <div className={styles['graphBar']} style={graphStyle1}></div>
                        <div className={styles['graphBar']} style={graphStyle2}></div>
                        <div className={styles['graphBar']} style={graphStyle3}></div>
                        <div className={styles['graphBar']} style={graphStyle4}></div>
                        <span className={styles['graphColumnLabel']}></span>
                        <span className={styles['graphColumnLabel']}></span>
                        <span className={styles['graphColumnLabel']}></span>
                        <span className={styles['graphColumnLabel']}>{firstAnswer}</span>
                        <span className={styles['graphColumnLabel']}>{secondAnswer}</span>
                        <span className={styles['graphColumnLabel']}>{thirdAnswer}</span>
                        <span className={styles['graphColumnLabel']}>{fourthAnswer}</span>
                    </div>
                </figure>
            </div>

            <button type='button' className={styles['commercial-button']} onClick={hidePublicJokerHandler}>X</button>
        </div>
    );
}