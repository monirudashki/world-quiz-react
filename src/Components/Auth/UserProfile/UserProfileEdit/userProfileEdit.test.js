import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserProfileEdit } from "./UserProfileEdit";
import { fakeUser } from '../../../../testUtils/mockUser'
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

describe('userProfileEdit tests suit', () => {

    function renderUserProfileEdit() {
        render(
            <MemoryRouter>
                <UserProfileEdit user={fakeUser} />
            </MemoryRouter>
        )
    }

    afterEach(cleanup);

    //error

    test('U.P.E. - error not render', async () => {

        renderUserProfileEdit();

        expect(screen.queryByTestId('editProfile-error')).toBeNull();
    });

    //username

    test('U.P.E. - username input render with correct value', async () => {
        renderUserProfileEdit();

        const input = screen.getByPlaceholderText(/username/i);
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('simeon');
    });

    test('U.P.E. - username correct change', async () => {
        renderUserProfileEdit();

        act(() => {
            const input = screen.getByPlaceholderText(/username/i);
            const testValue = 'testValue';

            fireEvent.change(input, { target: { value: testValue } });
            expect(input.value).toBe(testValue);
        });
    });

    test('U.P.E username with incorrect data , error message show', async () => {
        renderUserProfileEdit();

        await waitFor(() => {
            const input = screen.getByPlaceholderText(/username/i);
            const testValue = 'aa';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByPlaceholderText('email'));
                const errorUsername = screen.getByTestId('editProfile-username-error');
                expect(errorUsername).toBeInTheDocument();
            })
        });
    });

    test('U.P.E username with correct data , error message hide', async () => {
        renderUserProfileEdit();

        await waitFor(() => {
            const input = screen.getByPlaceholderText(/username/i);
            const testValue = 'correctTestV';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByPlaceholderText('email'));
                expect(screen.queryByTestId('editProfile-username-error')).toBeNull();
            })
        });
    });

    //email

    test('U.P.E. - email input render with correct value', async () => {
        renderUserProfileEdit();

        const input = screen.getByPlaceholderText(/email/i);
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('simeon@gmail.bg');
    });

    test('U.P.E. - email correct change', async () => {
        renderUserProfileEdit();

        act(() => {
            const input = screen.getByPlaceholderText(/email/i);
            const testValue = 'testValue';

            fireEvent.change(input, { target: { value: testValue } });
            expect(input.value).toBe(testValue);
        });
    });

    test('U.P.E email with incorrect data , error message show', async () => {
        renderUserProfileEdit();

        await waitFor(() => {
            const input = screen.getByPlaceholderText(/email/i);
            const testValue = 'aa';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByPlaceholderText('username'));
                const error = screen.getByTestId('editProfile-email-error');
                expect(error).toBeInTheDocument();
            })
        });
    });

    test('U.P.E email with correct data , error message hide', async () => {
        renderUserProfileEdit();

        await waitFor(() => {
            const input = screen.getByPlaceholderText(/email/i);
            const testValue = 'simeon1@gmail.bg';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByPlaceholderText('username'));
                expect(screen.queryByTestId('editProfile-email-error')).toBeNull();
            })
        });
    });

    //imageUrl

    test('U.P.E. - imageUrl input render with correct value', async () => {
        renderUserProfileEdit();

        const input = screen.getByPlaceholderText(/image Url/i);
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('https://images.statusfacebook.com/profile_pictures/unique-dp/unique-profile-pictures-for-whatsapp-19.jpg');
    });

    test('U.P.E. - imageUrl correct change', async () => {
        renderUserProfileEdit();

        act(() => {
            const input = screen.getByPlaceholderText(/image Url/i);
            const testValue = 'testValue';

            fireEvent.change(input, { target: { value: testValue } });
            expect(input.value).toBe(testValue);
        });
    });

    test('U.P.E imageUrl with incorrect data , error message show', async () => {
        renderUserProfileEdit();

        await waitFor(() => {
            const input = screen.getByPlaceholderText(/image Url/i);
            const testValue = 'aa';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByPlaceholderText('username'));
                const error = screen.getByTestId('editProfile-imageUrl-error');
                expect(error).toBeInTheDocument();
            })
        });
    });

    test('U.P.E imageUrl with correct data , error message hide', async () => {
        renderUserProfileEdit();

        await waitFor(() => {
            const input = screen.getByPlaceholderText(/image Url/i);
            const testValue = 'https://images.statusfacebook.com/profile_pictures/unique-dp/unique-profile-pictures-for-whatsapp-19.jpg';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByPlaceholderText('username'));
                expect(screen.queryByTestId('editProfile-imageUrl-error')).toBeNull();
            })
        });
    });

    //button

    test('U.P.E button is rendered', async () => {
        renderUserProfileEdit();

        expect(screen.getByTestId('profileEdit-button')).toBeInTheDocument();
    });

    test('U.P.E button should be disabled', async () => {
        renderUserProfileEdit();

        expect(screen.getByTestId('profileEdit-button')).toBeEnabled();
    });

    test('U.P.E button disabled with incorrect inputs', async () => {

        renderUserProfileEdit();

        await waitFor(() => {
            const emailInput = screen.getByPlaceholderText('email');
            const testEmail = 'si';

            fireEvent.change(emailInput, { target: { value: testEmail } });

            waitFor(() => {
                fireEvent.click(screen.getByPlaceholderText('username'));
                expect(screen.getByTestId('profileEdit-button')).toBeDisabled();
            })
        })
    });

    test('U.P.E button show spinner when is clicked', async () => {

        renderUserProfileEdit();

        await waitFor(() => {
            const button = screen.getByTestId('profileEdit-button');
            fireEvent.click(button);
            const spinner = screen.getByTestId('profileEdit-button').firstChild;
            expect(spinner).toBeInTheDocument();
        })
    });
})