import styles from '../AdminFlagsQuestions/AdminFlagsQuestions.module.css';
import { FlagsQuestionItem } from '../FlagsQuestionItem/FlagsQuestionItem';

const questions = [
    {
        _id: 'dsadsawwaa',
        title: 'Argentina',
        answerA: '../images/spain.png',
        answerB: '../images/spain.png',
        answerC: '../images/spain.png',
        answerD: '../images/spain.png',
        wrightAnswer: '../images/spain.png'
    },
    {
        _id: 'dsadsaaa',
        title: 'Argentina',
        answerA: '../images/spain.png',
        answerB: '../images/spain.png',
        answerC: '../images/spain.png',
        answerD: '../images/spain.png',
        wrightAnswer: '../images/spain.png'
    },
    {
        _id: 'dsasdaadsaaa',
        title: 'Argentina',
        answerA: '../images/spain.png',
        answerB: '../images/spain.png',
        answerC: '../images/spain.png',
        answerD: '../images/spain.png',
        wrightAnswer: '../images/spain.png'
    }
]

export const AdminFlagsQuestions = () => {
    return (
        <>
            <div className={styles['head']}>
                <h1>Admin Capitals Questions</h1>
            </div>

            <div className={styles['search-container']}>
                <input type="text" />
                <button type="button">Search</button>
            </div>

            <section className={styles['question-container']}>

                {questions.map(x => <FlagsQuestionItem key={x._id} {...x} />)}

            </section>

            <div className={styles['pagination']}>
                <button className={styles['pagination-button']}>Previous</button>
                <p>1</p>
                <button className={styles['pagination-button']}>Next</button>
            </div>
        </>
    );
}
