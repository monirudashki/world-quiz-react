import { render, screen, cleanup, waitFor, fireEvent, getByTestId } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../Contexts/AuthContext";
import * as authService from '../../../Services/authService';
import React from 'react';
import { Register } from "./Register";
import { act } from "react-dom/test-utils";

function renderRegister() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </MemoryRouter>
    )
}

describe('Register tests suit', () => {

    beforeEach(() => {
        jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
            Promise.resolve(undefined)
        )
    });

    afterEach(cleanup);

    test('Register - heading should be rendered', async () => {

        renderRegister();

        await waitFor(() => {
            const el = screen.getByTestId('register-h2');
            expect(el).toBeInTheDocument();
        })
    });

    //error

    test('Register - error not render', async () => {
        renderRegister();

        await waitFor(() => {
            expect(screen.queryByTestId('register-error')).toBeNull();
        });
    });

    //username

    test('Register - username label render', async () => {
        renderRegister();

        await waitFor(() => {
            expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        })
    });

    test('Register - username input render without value', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-username');
            expect(input).toBeInTheDocument();
            expect(input.value).toBe('');
        })
    });

    test('Register - username correct change', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-username');
            const testValue = 'sssssssss';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('Register- username with correct data , error message hide', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-username');
            const testValue = 'aaaaa';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-email'));
                const error = screen.queryByTestId('register-error-username');
                expect(error).toBeNull();
            })
        });
    });

    //email

    test('Register - email label render', async () => {
        renderRegister();

        await waitFor(() => {
            expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        })
    });

    test('Register - email input render without value', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-email');
            expect(input).toBeInTheDocument();
            expect(input.value).toBe('');
        })
    });

    test('Register - email correct change', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-email');
            const testValue = 'sssssssss';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('Register - email with incorrect data , error message show', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-email');
            const testValue = 'aa';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-username'));
                const error = screen.getByTestId('register-email-error');
                expect(error).toBeInTheDocument();
                expect(error).toHaveTextContent(/Email must be valid!/i)
            })
        });
    });

    test('Register- email with correct data , error message hide', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-email');
            const testValue = 'simeon@gmail.bg';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-username'));
                const error = screen.queryByTestId('register-email-error');
                expect(error).toBeNull();
            })
        });
    });

    //imageUrl

    test('Register imageUrl label render', async () => {
        renderRegister();

        await waitFor(() => {
            expect(screen.getByLabelText(/imageUrl/i)).toBeInTheDocument();
        })
    });

    test('Register - imageUrl input render without value', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-imageUrl');
            expect(input).toBeInTheDocument();
            expect(input.value).toBe('');
        })
    });

    test('Register - imageUrl correct change', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-imageUrl');
            const testValue = 'sssssssss';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('Register -imageUrl with incorrect data , error message show', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-imageUrl');
            const testValue = 'aa';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-username'));
                const error = screen.getByTestId('register-imageUrl-error');
                expect(error).toBeInTheDocument();
                expect(error).toHaveTextContent(/ImageUrl must be a valid link!/i)
            })
        });
    });

    test('Register- imageUrl with correct data , error message hide', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-imageUrl');
            const testValue = 'http://image.jpg';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-username'));
                const error = screen.queryByTestId('register-imageUrl-error');
                expect(error).toBeNull();
            })
        });
    });

    //password

    test('Register - password input render without value', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-password');
            expect(input).toBeInTheDocument();
            expect(input.value).toBe('');
        })
    });

    test('Register - password correct change', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-password');
            const testValue = 'sssssssss';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('Register -password with incorrect data , error message show', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-password');
            const testValue = 'aa';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-username'));
                const error = screen.getByTestId('register-password-error');
                expect(error).toBeInTheDocument();
                expect(error).toHaveTextContent(/Password must be at least 5 characters long!/i)
            })
        });
    });

    test('Register- password with correct data , error message hide', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-password');
            const testValue = '111111';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-username'));
                const error = screen.queryByTestId('register-password-error');
                expect(error).toBeNull();
            })
        });
    });



    test('Register - rePass label render', async () => {
        renderRegister();

        await waitFor(() => {
            expect(screen.getByLabelText(/Confirm Password:/i)).toBeInTheDocument();
        })
    });

    test('Register - rePass input render without value', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-rePass');
            expect(input).toBeInTheDocument();
            expect(input.value).toBe('');
        })
    });

    test('Register - rePass correct change', async () => {
        renderRegister();

        await waitFor(() => {
            const input = screen.getByTestId('register-rePass');
            const testValue = 'sssssssss';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('Register -rePass with incorrect data , error message show', async () => {
        renderRegister();

        await waitFor(() => {
            const password = screen.getByTestId('register-password');
            const passwordTestValue = '11111';
            const input = screen.getByTestId('register-password');
            const testValue = 'aa';

            fireEvent.change(password, { target: { value: passwordTestValue } });
            fireEvent.change(input, { target: { value: testValue } });

            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-username'));
                const error = screen.getByTestId('register-rePass-error');
                expect(error).toBeInTheDocument();
                expect(error).toHaveTextContent(/Passwords don't match!/i)
            })
        });
    });

    test('Register- rePass with correct data , error message hide', async () => {
        renderRegister();

        await waitFor(() => {
            const password = screen.getByTestId('register-password');
            const passwordTestValue = '11111';
            const input = screen.getByTestId('register-password');
            const testValue = '111111';

            fireEvent.change(password, { target: { value: passwordTestValue } });
            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('register-username'));
                const error = screen.queryByTestId('register-rePass-error');
                expect(error).toBeNull();
            })
        });
    });

    //button 

    test('Register - submit button render', async () => {
        renderRegister();

        expect(await screen.findByTestId('register-button')).toBeInTheDocument();
    });

    test('Register - button should be disabled', async () => {
        renderRegister();

        expect(await screen.findByTestId('register-button')).toBeDisabled();
    });

    test('Register - button should be enabled with correct inputs', async () => {

        renderRegister();

        await waitFor(() => {
            const usernameInput = screen.getByTestId('register-username');
            const testUsername = 'aaaaaaa';
            const passwordInput = screen.getByTestId('register-password');
            const testValue = '11111';
            const emailInput = screen.getByTestId('register-email');
            const testEmail = 'simeon@gmail.bg';
            const imageInput = screen.getByTestId('register-imageUrl');
            const testImage = 'http://image';
            const rePassInput = screen.getByTestId('register-rePass');
            const testRePass = '11111';

            fireEvent.change(usernameInput, { target: { value: testUsername } });
            fireEvent.change(emailInput, { target: { value: testEmail } });
            fireEvent.change(imageInput, { target: { value: testImage } });
            fireEvent.change(passwordInput, { target: { value: testValue } });
            fireEvent.change(rePassInput, { target: { value: testRePass } });

            expect(screen.getByTestId('register-button')).toBeEnabled();
        })
    });

    test('register - button show spinner when is clicked', async () => {

        renderRegister();

        const usernameInput = await screen.findByTestId('register-username');
        const testUsername = 'aaaaaaa';
        const passwordInput = await screen.findByTestId('register-password');
        const testPassword = '11111';
        const emailInput = await screen.findByTestId('register-email');
        const testEmail = 'simeon@gmail.bg';
        const imageInput = await screen.findByTestId('register-imageUrl');
        const testImage = 'http://image';
        const rePassInput = await screen.findByTestId('register-rePass');
        const testRePass = '11111';

        fireEvent.change(usernameInput, { target: { value: testUsername } });
        fireEvent.change(emailInput, { target: { value: testEmail } });
        fireEvent.change(imageInput, { target: { value: testImage } });
        fireEvent.change(passwordInput, { target: { value: testPassword } });
        fireEvent.change(rePassInput, { target: { value: testRePass } });

        fireEvent.click(screen.getByTestId('register-button'));

        const spinner = screen.getByTestId('register-button').firstChild;
        expect(spinner).toBeInTheDocument();
    });

    test('Register - login link should be render', async () => {

        renderRegister();

        const link = await screen.findByTestId('login-link');
        expect(link).toBeInTheDocument();

    });
})