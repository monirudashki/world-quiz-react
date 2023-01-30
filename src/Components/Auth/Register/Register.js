import styles from '../Register/Register.module.css';

export const Register = () => {
    return (
        <section id="register">
            <div className={styles["form"]}>
                <h2>Registration</h2>

                <div className={styles["error"]}>
                </div>

                <form className={styles["login-form"]}>
                    <input type="text" name="username" id="register-username" placeholder="username" />

                    <input type="text" name="email" id="register-email" placeholder="email" />

                    <div formGroupName="passwords">
                        <input type="password" name="password" id="register-password" placeholder="password" />



                        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                    </div>

                    <button type="submit">Register</button>
                    <p className={styles["message"]}>Already registered? <a href='#/'>Login</a></p>
                </form>
            </div>
        </section>
    );
}