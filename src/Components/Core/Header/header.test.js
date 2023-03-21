import { cleanup, fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../Contexts/AuthContext";
import Header from "./Header";
import * as authService from '../../../Services/authService';
import { fakeAdmin, fakeUser } from "../../../testUtils/mockUser";

function renderHeader() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <Header />
            </AuthProvider>
        </MemoryRouter>
    )
}

function mockUser(userValue) {
    jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
        Promise.resolve(userValue)
    )
}

describe('Header tests', () => {

    // beforeEach(() => {
    //     jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
    //         Promise.resolve(fakeUser)
    //     )
    // });

    afterEach(cleanup);

    test('rulesLink render', async () => {

        mockUser(undefined);

        renderHeader();

        await waitFor(() => {
            const rulesLink = screen.getByTestId('header-rules');

            expect(rulesLink).toBeInTheDocument();
        });
    });

    test('header userLink render', async () => {

        mockUser(fakeUser);

        renderHeader();

        const element = await screen.findByTestId('header-userProfile');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('loginLink render', async () => {

        mockUser(undefined);

        renderHeader();
        await waitFor(() => {
            const loginLink = screen.getByTestId('header-login');

            expect(loginLink).toBeInTheDocument();
        });
    });

    test('registerLink render', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const registerLink = screen.getByTestId('header-register');

            expect(registerLink).toBeInTheDocument();
        });
    });

    test('header-scoreboard not render', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const scoreboardLink = screen.queryByText(/scoreboard/i);
            expect(scoreboardLink).toBeNull();
        });
    });

    test('header-scoreboard render with user', async () => {
        mockUser(fakeUser);
        renderHeader();
        const element = await screen.findByTestId('header-scoreboard');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('header-userProfile not render', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const userProfileLink = screen.queryByTestId('header-userProfile');
            expect(userProfileLink).toBeNull();
        });
    });

    test('header-logout not render', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const logoutLink = screen.queryByTestId('header-logout');
            expect(logoutLink).toBeNull();
        });
    });

    test('header-logout render with user', async () => {
        mockUser(fakeUser);
        renderHeader();
        const element = await screen.findByTestId('header-logout');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('header-capitals not render', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const capitalsLink = screen.queryByText(/capitals/i);
            expect(capitalsLink).toBeNull();
        });
    });

    test('header-capitals render with user', async () => {
        mockUser(fakeAdmin);
        renderHeader();
        const element = await screen.findByTestId('header-capitals');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('header-flags not render', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const flagsLink = screen.queryByText(/flags/i);
            expect(flagsLink).toBeNull();
        });
    });

    test('header-flags render with user', async () => {
        mockUser(fakeAdmin);
        renderHeader();
        const element = await screen.findByTestId('header-flags');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('header-addCapitals not render', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const addCapitalsLink = screen.queryByText(/add capitals/i);
            expect(addCapitalsLink).toBeNull();
        });
    });

    test('header-add-capitals render with user', async () => {
        mockUser(fakeAdmin);
        renderHeader();
        const element = await screen.findByTestId('header-capitals-add');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('header-addFlags not render', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const addFlagsLink = screen.queryByText(/add flags/i);
            expect(addFlagsLink).toBeNull();
        });
    });

    test('header-add-flags render with user', async () => {
        mockUser(fakeAdmin);
        renderHeader();
        const element = await screen.findByTestId('header-flags-add');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('header rules active class when it is clicked', async () => {
        mockUser(undefined);
        renderHeader();
        await waitFor(() => {
            const rulesLink = screen.getByTestId('header-rules');
            fireEvent.click(rulesLink);
            expect(rulesLink.className).toBe('active');
        });
    });

    test('header login active class when it is clicked', async () => {
        mockUser(undefined);

        renderHeader();
        await waitFor(() => {
            const loginLink = screen.getByTestId('header-login');
            fireEvent.click(loginLink);
            expect(loginLink.className).toBe('active');
        });
    });

    test('header register active class when it is clicked', async () => {
        mockUser(undefined);

        renderHeader();
        await waitFor(() => {
            const registerLink = screen.getByTestId('header-register');
            fireEvent.click(registerLink);
            expect(registerLink.className).toBe('active');
        });
    });

    test('header capitals active class when it is clicked', async () => {
        mockUser(fakeAdmin);

        renderHeader();
        await waitFor(() => {
            const link = screen.getByTestId('header-capitals');
            fireEvent.click(link);
            expect(link.className).toBe('active');
        });
    });

    test('header flags active class when it is clicked', async () => {
        mockUser(fakeAdmin);

        renderHeader();
        await waitFor(() => {
            const link = screen.getByTestId('header-flags');
            fireEvent.click(link);
            expect(link.className).toBe('active');
        });
    });

    test('header add capitals active class when it is clicked', async () => {
        mockUser(fakeAdmin);

        renderHeader();
        await waitFor(() => {
            const link = screen.getByTestId('header-capitals-add');
            fireEvent.click(link);
            expect(link.className).toBe('active');
        });
    });

    test('header add flags active class when it is clicked', async () => {
        mockUser(fakeAdmin);

        renderHeader();
        await waitFor(() => {
            const link = screen.getByTestId('header-flags-add');
            fireEvent.click(link);
            expect(link.className).toBe('active');
        });
    });

    test('header add flags active class when it is clicked', async () => {
        mockUser(fakeAdmin);

        renderHeader();
        await waitFor(() => {
            const link = screen.getByTestId('header-flags-add');
            fireEvent.click(link);
            expect(link.className).toBe('active');
        });
    });

    test('header scoreboard active class when it is clicked', async () => {
        mockUser(fakeUser);

        renderHeader();
        await waitFor(() => {
            const link = screen.getByTestId('header-scoreboard');
            fireEvent.click(link);
            expect(link.className).toBe('active');
        });
    });

    test('header userProfile active class when it is clicked', async () => {
        mockUser(fakeUser);

        renderHeader();
        await waitFor(() => {
            const link = screen.getByTestId('header-userProfile');
            fireEvent.click(link);
            expect(link.className).toBe('active');
        });
    });
});