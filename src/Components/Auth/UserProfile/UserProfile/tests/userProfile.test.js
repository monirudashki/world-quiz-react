import { cleanup, screen, render, fireEvent, waitFor } from "@testing-library/react";
import { fakeUser } from '../../../../../testUtils/mockUser';
import * as authService from '../../../../../Services/authService'
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../../../Contexts/AuthContext";
import { UserProfile } from "../UserProfile";
import mockAxios from "jest-mock-axios";

function renderUserProfile() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <UserProfile />
            </AuthProvider>
        </MemoryRouter>
    )
}

describe('User Profile test suit', () => {

    beforeEach(() => {
        jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
            Promise.resolve(fakeUser)
        );

        const result = {
            data: { id: 'sdafgsagwags' }
        }

        mockAxios.post.mockRejectedValueOnce(result);
    });

    afterEach(cleanup);

    test('User Profile render with correct text', async () => {
        renderUserProfile();

        expect(await screen.findByText(/simeon profile/i)).toBeInTheDocument();
    });

    test('User Profile - coins-and-lives section is render', async () => {
        renderUserProfile();

        await waitFor(() => {
            expect(screen.getByTestId('coins-and-lives')).toBeInTheDocument();
        })
    });

    test('User Profile = profile section is render', async () => {
        renderUserProfile();

        await waitFor(() => {
            expect(screen.getByTestId('userProfile-profileInfo')).toBeInTheDocument();
        })
    });

    test('User Profile info button lives render', async () => {
        renderUserProfile();

        await waitFor(() => {
            expect(screen.getByTestId('info-button-lives')).toBeInTheDocument();
        })
    });

    test('User Profile commercial is show when button is clicked', async () => {
        renderUserProfile();

        await waitFor(() => {
            const button = screen.getByTestId('info-button-lives');
            fireEvent.click(button);

            expect(screen.getByTestId('commercial')).toBeInTheDocument();
        })
    });

    test('User Profile - profile img is render', async () => {
        renderUserProfile();

        await waitFor(() => {
            expect(screen.getByTestId('userProfile-img')).toBeInTheDocument();
        })
    });

    test('User Profile - userProfile-level is render', async () => {
        renderUserProfile();

        await waitFor(() => {
            expect(screen.getByTestId('userProfile-level')).toBeInTheDocument();
            expect(screen.getByTestId('userProfile-level')).toHaveTextContent(/level/i);
        })
    });

    test('User Profile - userProfile-level text is render', async () => {
        renderUserProfile();

        await waitFor(() => {
            expect(screen.getByTestId('userProfile-level-text')).toBeInTheDocument();
            expect(screen.getByTestId('userProfile-level-text')).toHaveTextContent('5');
        })
    });

    test('User Profile - userProfile-graph is render', async () => {
        renderUserProfile();

        await waitFor(() => {
            expect(screen.getByTestId('userProfile-graph')).toBeInTheDocument();
        })
    });

    test('User Profile - edit profile is show when button is clicked', async () => {
        renderUserProfile();

        await waitFor(() => {
            const button = screen.getByTestId('info-button-edit');
            fireEvent.click(button);

            expect(screen.getByTestId('editProfile-form')).toBeInTheDocument();
        })
    });
})