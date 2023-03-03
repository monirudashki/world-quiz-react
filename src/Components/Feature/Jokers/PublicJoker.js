import styles from '../Jokers/PublicJoker.module.css';

export const PublicJoker = ({
    showPublicJokerHandler,
    question,
    game
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
                        {game === 'Capitals'
                            ?
                            <>
                                <span className={styles['graphColumnLabel']}>{firstAnswer.length > 5 ? `${firstAnswer.slice(0, 5)}..` : firstAnswer}</span>
                                <span className={styles['graphColumnLabel']}>{secondAnswer.length > 5 ? `${secondAnswer.slice(0, 5)}..` : secondAnswer}</span>
                                <span className={styles['graphColumnLabel']}>{thirdAnswer.length > 5 ? `${thirdAnswer.slice(0, 5)}..` : thirdAnswer}</span>
                                <span className={styles['graphColumnLabel']}>{fourthAnswer.length > 5 ? `${fourthAnswer.slice(0, 5)}..` : fourthAnswer}</span>
                            </>
                            :
                            <>
                                <span className={styles['graphColumnLabel']}>A</span>
                                <span className={styles['graphColumnLabel']}>B</span>
                                <span className={styles['graphColumnLabel']}>C</span>
                                <span className={styles['graphColumnLabel']}>D</span>
                            </>
                        }

                    </div>
                </figure>
            </div>

            <button type='button' className={styles['commercial-button']} onClick={hidePublicJokerHandler}>X</button>
        </div>
    );
}