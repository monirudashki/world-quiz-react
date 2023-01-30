import styles from '../Login/Login.module.css'

export const Login = () => {
    return (
        <main>
            <section id="login">
                <div className={styles["form"]}>
                    <h2>Login</h2>

                    <div className={styles["error"]}>
                    </div>

                    <form className={styles["login-form"]}>
                        <input type="text" name="email" id="email" placeholder="email.." />
                        <input type="password" name="password" id="password" placeholder="password.." />


                        <button type="submit">LOGIN</button>
                        <p className={styles["message"]}>
                            Not registered? <a href='#/'>Create an account</a>
                        </p>
                    </form>
                </div>
            </section>
        </main>
    );
}