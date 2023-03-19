import { cleanup, fireEvent, getByTestId, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../Contexts/AuthContext";
import Header from "./Header";

function renderHeader() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <Header />
            </AuthProvider>
        </MemoryRouter>
    )
}

describe('Header tests', () => {

    afterAll(cleanup);

    test('logo render', async () => {
        renderHeader();
        await waitFor(() => {
            const logo = screen.getByTestId('header-logo');

            expect(logo).toBeInTheDocument();
        });
    });

    test('rulesLink render', async () => {
        renderHeader();
        await waitFor(() => {
            const rulesLink = screen.getByTestId('header-rules');

            expect(rulesLink).toBeInTheDocument();
        });
    });

    test('loginLink render', async () => {
        renderHeader();
        await waitFor(() => {
            const loginLink = screen.getByTestId('header-login');

            expect(loginLink).toBeInTheDocument();
        });
    });

    test('registerLink render', async () => {
        renderHeader();
        await waitFor(() => {
            const registerLink = screen.getByTestId('header-register');

            expect(registerLink).toBeInTheDocument();
        });
    });

    test('header-scoreboard not render', async () => {
        renderHeader();
        await waitFor(() => {
            const scoreboardLink = screen.queryByText(/scoreboard/i);
            expect(scoreboardLink).toBeNull();
        });
    });

    test('header-userProfile not render', async () => {
        renderHeader();
        await waitFor(() => {
            const userProfileLink = screen.queryByTestId('header-userProfile');
            expect(userProfileLink).toBeNull();
        });
    });

    test('header-logout not render', async () => {
        renderHeader();
        await waitFor(() => {
            const logoutLink = screen.queryByTestId('header-logout');
            expect(logoutLink).toBeNull();
        });
    });

    test('header-capitals not render', async () => {
        renderHeader();
        await waitFor(() => {
            const capitalsLink = screen.queryByText(/capitals/i);
            expect(capitalsLink).toBeNull();
        });
    });

    test('header-flags not render', async () => {
        renderHeader();
        await waitFor(() => {
            const flagsLink = screen.queryByText(/flags/i);
            expect(flagsLink).toBeNull();
        });
    });

    test('header-addFlags not render', async () => {
        renderHeader();
        await waitFor(() => {
            const addCapitalsLink = screen.queryByText(/add capitals/i);
            expect(addCapitalsLink).toBeNull();
        });
    });

    test('header-addFlags not render', async () => {
        renderHeader();
        await waitFor(() => {
            const addFlagsLink = screen.queryByText(/add flags/i);
            expect(addFlagsLink).toBeNull();
        });
    });

    test('header rules active class when it is clicked', async () => {
        renderHeader();
        await waitFor(() => {
            const rulesLink = screen.getByTestId('header-rules');
            fireEvent.click(rulesLink);
            expect(rulesLink.className).toBe('active');
        });
    });

    test('header login active class when it is clicked', async () => {
        renderHeader();
        await waitFor(() => {
            const loginLink = screen.getByTestId('header-login');
            fireEvent.click(loginLink);
            expect(loginLink.className).toBe('active');
        });
    });

    test('header register active class when it is clicked', async () => {
        renderHeader();
        await waitFor(() => {
            const registerLink = screen.getByTestId('header-register');
            fireEvent.click(registerLink);
            expect(registerLink.className).toBe('active');
        });
    });
});