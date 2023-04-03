import { useDispatch } from 'react-redux';
import { gameShowPublicJokerToggle } from '../../../+store/features/game';
import styles from '../Jokers/PublicJoker.module.css';

export const PublicJoker = ({
    gameState,
    game
}) => {

    const dispatch = useDispatch();
    const currentQuestion = gameState.currentQuestion;

    const firstAnswer = currentQuestion.firstAnswer;
    const secondAnswer = currentQuestion.secondAnswer;
    const thirdAnswer = currentQuestion.thirdAnswer;
    const fourthAnswer = currentQuestion.fourthAnswer;
    const wrightAnswer = currentQuestion.wrightAnswer;

    const hidePublicJokerHandler = () => {
        dispatch(gameShowPublicJokerToggle(false));
    }

    let graphStyle1 = { gridColumn: 2, '--h': firstAnswer === wrightAnswer ? "56%" : "12%" };
    let graphStyle2 = { gridColumn: 3, '--h': secondAnswer === wrightAnswer ? "56%" : "6%" };
    let graphStyle3 = { gridColumn: 4, '--h': thirdAnswer === wrightAnswer ? "56%" : "17%" };
    let graphStyle4 = { gridColumn: 5, '--h': fourthAnswer === wrightAnswer ? "56%" : "9%" };

    return (
        <div data-testid='jokers-publicJoker' className={styles['public-container']}>
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
                        <div data-testid='graphBar1' className={styles['graphBar']} style={graphStyle1}></div>
                        <div data-testid='graphBar2' className={styles['graphBar']} style={graphStyle2}></div>
                        <div data-testid='graphBar3' className={styles['graphBar']} style={graphStyle3}></div>
                        <div data-testid='graphBar4' className={styles['graphBar']} style={graphStyle4}></div>
                        <span className={styles['graphColumnLabel']}></span>
                        <span className={styles['graphColumnLabel']}></span>
                        <span className={styles['graphColumnLabel']}></span>
                        {game === 'Capitals'
                            ?
                            <>
                                <span data-testid='answer' className={styles['graphColumnLabel']}>{firstAnswer.length > 7 ? `${firstAnswer.slice(0, 7)}..` : firstAnswer}</span>
                                <span data-testid='answer' className={styles['graphColumnLabel']}>{secondAnswer.length > 7 ? `${secondAnswer.slice(0, 7)}..` : secondAnswer}</span>
                                <span data-testid='answer' className={styles['graphColumnLabel']}>{thirdAnswer.length > 7 ? `${thirdAnswer.slice(0, 7)}..` : thirdAnswer}</span>
                                <span data-testid='answer' className={styles['graphColumnLabel']}>{fourthAnswer.length > 7 ? `${fourthAnswer.slice(0, 7)}..` : fourthAnswer}</span>
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