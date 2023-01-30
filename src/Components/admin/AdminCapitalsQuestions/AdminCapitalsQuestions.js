import styles from '../AdminCapitalsQuestions/AdminCapitalsQuestions.module.css';

import { CapitalsQuestionItem } from '../CapitalsQuestionItem/CapitalsQuestionItem';

const questions = [
    {
        _id: 'dsadsaaa',
        title: 'Argentina',
        answerA: 'Buenos Aires',
        answerB: 'Argentina',
        answerC: 'Boca',
        answerD: 'Rio Dejaneiro',
        wrightAnswer: 'Buenos Aires'
    },
    {
        _id: 'dsadswaaa',
        title: 'Argentina',
        answerA: 'Buenos Aires',
        answerB: 'Argentina',
        answerC: 'Boca',
        answerD: 'Rio Dejaneiro',
        wrightAnswer: 'Buenos Aires'
    },
    {
        _id: 'dsadssaaa',
        title: 'Argentina',
        answerA: 'Buenos Aires',
        answerB: 'Argentina',
        answerC: 'Boca',
        answerD: 'Rio Dejaneiro',
        wrightAnswer: 'Buenos Aires'
    }
]

export const AdminCapitalsQuestions = () => {
    return (

        <>
            <div className={styles["head"]}>
                <h1>Admin Capitals Questions</h1>
            </div>

            <div className={styles["search-container"]}>
                <input type="text" />
                <button type="button">Search</button>
            </div>

            <section className={styles["question-container"]}>

                {questions.map(x => <CapitalsQuestionItem key={x._id} {...x} />)}

            </section>

            <div className={styles["pagination"]}>
                <button className={styles["pagination-button"]}>Previous</button>
                <p>1</p>
                <button className={styles["pagination-button"]}>Next</button>
            </div>
        </>
    );
}