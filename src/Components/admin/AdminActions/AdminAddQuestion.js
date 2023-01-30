import styles from '../AdminActions/AdminActions.module.css';

export const AdminAddQuestion = () => {
    return (
        <div className={styles['form']}>
            <p className={styles['error']}>Error message</p>

            <h2>Add Capitol Question</h2>
            <form className={styles['create-form']}>
                <label htmlFor="brand">*Question: </label>
                <input type="text" name="question" id="question" />

                <label htmlFor="imageUrl">*First answer:</label>
                <input type="text" name="firstAnswer" id="firstAnswer" />

                <label htmlFor="year">*Second Answer: </label>
                <input type="text" name="secondAnswer" id="secondAnswer" />

                <label htmlFor="year">*Third Answer: </label>
                <input type="text" name="thirdAnswer" id="thirdAnswer" />

                <label htmlFor="year">*Forth Answer: </label>
                <input type="text" name="forthAnswer" id="forthAnswer" />

                <label htmlFor="year">*Wright Answer: </label>
                <input type="text" name="wrightAnswer" id="wrightAnswer" />

                <div className={styles['buttons']}>
                    <button type="button">CANCEL</button>
                    <button type="submit">POST</button>
                </div>
            </form>
        </div>
    );
}