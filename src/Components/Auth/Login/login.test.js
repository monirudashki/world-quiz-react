import { render, screen, cleanup, waitFor, fireEvent, getByTestId } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../Contexts/AuthContext";
import { Login } from "./Login";
import * as authService from '../../../Services/authService';
import React from 'react';

function renderLogin() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </MemoryRouter>
    )
}

describe('Login suit tests', () => {

    beforeEach(() => {
        jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
            Promise.resolve(undefined)
        )
    });

    afterEach(cleanup);

    test('Login error not render', async () => {
        renderLogin();

        await waitFor(() => {
            expect(screen.queryByTestId('login-error')).toBeNull();
        });
    });

    test('Login email input render without value', async () => {
        renderLogin();

        await waitFor(() => {
            const emailInput = screen.getByTestId('login-email');
            expect(emailInput).toBeInTheDocument();
            expect(emailInput.value).toBe('');
        })
    });

    test('Login email correct change', async () => {
        renderLogin();

        await waitFor(() => {
            const emailInput = screen.getByTestId('login-email');
            const testValue = 'testForEmail';

            fireEvent.change(emailInput, { target: { value: testValue } });

            expect(emailInput.value).toBe(testValue);
        })
    });

    test('Login email with incorrect data , error message show', async () => {
        renderLogin();

        await waitFor(() => {
            const emailInput = screen.getByTestId('login-email');
            const testValue = 'testForEmail';

            fireEvent.change(emailInput, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('login-password'));
                const errorEmail = screen.getByTestId('login-error-email');
                expect(errorEmail).toBeInTheDocument();
                expect(errorEmail).toHaveTextContent(/Email must be valid!/i)
            })
        });
    });

    test('Login email with correct data , error message hide', async () => {
        renderLogin();

        await waitFor(() => {
            const emailInput = screen.getByTestId('login-email');
            const testValue = 'simeon@gmail.bg';

            fireEvent.change(emailInput, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('login-password'));
                const errorEmail = screen.queryByTestId('login-error-email');
                expect(errorEmail).toBeNull();
            })
        });
    });

    test('Login password input render without value', async () => {
        renderLogin();

        await waitFor(() => {
            const passwordInput = screen.getByTestId('login-password');
            expect(passwordInput).toBeInTheDocument();
            expect(passwordInput.value).toBe('');
        })
    });

    test('Login password input render without value', async () => {
        renderLogin();

        await waitFor(() => {
            const passwordInput = screen.getByTestId('login-password');
            const testValue = 'testForPassword';

            fireEvent.change(passwordInput, { target: { value: testValue } });

            expect(passwordInput.value).toBe(testValue);
        })
    });

    test('Login password with incorrect data , error message show', async () => {
        renderLogin();

        await waitFor(() => {
            const passwordInput = screen.getByTestId('login-password');
            const testValue = '1111';

            fireEvent.change(passwordInput, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('login-email'));
                const errorPassword = screen.getByTestId('login-error-email');
                expect(errorPassword).toBeInTheDocument();
                expect(errorPassword).toHaveTextContent(/Password must be at least 5 characters long!/i)
            })
        });
    });

    test('Login password with correct data , error message hide', async () => {
        renderLogin();

        await waitFor(() => {
            const passwordInput = screen.getByTestId('login-password');
            const testValue = '111111';

            fireEvent.change(passwordInput, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('login-email'));
                const errorPassword = screen.queryByTestId('login-error-password');
                expect(errorPassword).toBeNull();
            })
        });
    });

    test('Login button is rendered', async () => {
        renderLogin();

        await waitFor(() => {
            expect(screen.getByRole('button')).toBeInTheDocument();
        })
    });

    test('Login button should be disabled', async () => {
        renderLogin();

        await waitFor(() => {
            expect(screen.getByRole('button')).toBeDisabled();
        })
    });

    test('Login button should be enabled', async () => {

        renderLogin();

        await waitFor(() => {
            const passwordInput = screen.getByTestId('login-password');
            const testValue = '111111';
            const emailInput = screen.getByTestId('login-email');
            const testEmail = 'simeon@gmail.bg';

            fireEvent.change(emailInput, { target: { value: testEmail } });

            fireEvent.change(passwordInput, { target: { value: testValue } });
            expect(screen.getByRole('button')).toBeEnabled();
        })
    });

    test('Login button should be enabled with correct inputs', async () => {

        renderLogin();

        await waitFor(() => {
            const passwordInput = screen.getByTestId('login-password');
            const testValue = '111111';
            const emailInput = screen.getByTestId('login-email');
            const testEmail = 'simeon@gmail.bg';

            fireEvent.change(emailInput, { target: { value: testEmail } });

            fireEvent.change(passwordInput, { target: { value: testValue } });
            expect(screen.getByRole('button')).toBeEnabled();
        })
    });

    test('Login button show spinner when is clicked', async () => {

        renderLogin();

        await waitFor(() => {
            const passwordInput = screen.getByTestId('login-password');
            const testValue = '111111';
            const emailInput = screen.getByTestId('login-email');
            const testEmail = 'simeon@gmail.bg';

            fireEvent.change(emailInput, { target: { value: testEmail } });

            fireEvent.change(passwordInput, { target: { value: testValue } });

            fireEvent.click(screen.getByRole('button'));
            const spinner = screen.getByRole('button').firstChild;
            expect(spinner).toBeInTheDocument();
        })
    });

    test('Login - register link should be render', async () => {

        renderLogin();

        await waitFor(() => {
            const link = screen.getByTestId('register-link');
            expect(link).toBeInTheDocument();
        })
    });

    //TODO link redirect
});
