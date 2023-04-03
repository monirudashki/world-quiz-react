import { cleanup, screen, render, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthProvider } from "../../../Contexts/AuthContext"
import { Home } from "./Home";
import * as authService from '../../../Services/authService';
import { fakeUser } from "../../../testUtils/mockUser";

function renderHome() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <Home />
            </AuthProvider>
        </MemoryRouter>
    )
}

function mockUser(userValue) {
    jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
        Promise.resolve(userValue)
    )
}

describe('Home page tests', () => {
    afterEach(cleanup);

    test('home - coins and lives with user is rendered', async () => {
        mockUser(fakeUser);
        renderHome();
        const element = await screen.findByTestId('coins-and-lives');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    //from here

    test('home - coins and lives without user is not rendered', async () => {
        mockUser(undefined);
        renderHome();
        const element = screen.queryByTestId('coins-and-lives');
        expect(element).toBeNull();
    });

    test('home h1 render and correct text content', async () => {
        mockUser(undefined);
        renderHome();
        await waitFor(() => {
            const homeH1 = screen.getByTestId('home-h1');

            expect(homeH1).toBeInTheDocument();
            expect(homeH1).toHaveTextContent(/World Quiz Games/i)
        });
    });

    test('home capitals h2 render and correct text content', async () => {
        mockUser(undefined);
        renderHome();
        await waitFor(() => {
            const homeCapitalsH2 = screen.getByTestId('home-capitals');

            expect(homeCapitalsH2).toBeInTheDocument();
            expect(homeCapitalsH2).toHaveTextContent(/Capitals Quiz/i)
        });
    });

    test('home capitals img render', async () => {
        mockUser(undefined);
        renderHome();
        await waitFor(() => {
            const homeCapitalsImg = screen.getByTestId('home-capitals-img');

            expect(homeCapitalsImg).toBeInTheDocument();
        });
    });

    test('home flags h2 render and correct text content', async () => {
        mockUser(undefined);
        renderHome();
        await waitFor(() => {
            const homeFlagsH2 = screen.getByTestId('home-flags');

            expect(homeFlagsH2).toBeInTheDocument();
            expect(homeFlagsH2).toHaveTextContent(/Flags Quiz/i)
        });
    });

    test('home flags img render', async () => {
        mockUser(undefined);
        renderHome();
        await waitFor(() => {
            const homeFlagsImg = screen.getByTestId('home-flags-img');

            expect(homeFlagsImg).toBeInTheDocument();
        });
    });

    test('home div with game buttons not rendered', async () => {
        mockUser(undefined);
        renderHome();
        await waitFor(() => {
            const divGameButtons = screen.queryByTestId('home-game-buttons');

            expect(divGameButtons).toBeNull();
        });
    });

    test('home div with game buttons rendered with user', async () => {
        mockUser(fakeUser);
        renderHome();
        const element = await screen.findByTestId('home-game-buttons');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('home - link capitals game with user is rendered', async () => {
        mockUser(fakeUser);
        renderHome();
        const element = await screen.findByTestId('home-link-capitalsGame');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('home - link capitals without user is not rendered', async () => {
        mockUser(undefined);
        renderHome();
        const element = screen.queryByTestId('home-link-capitalsGame');
        expect(element).toBeNull();
    });

    test('home - link capitals game with user is rendered', async () => {
        mockUser(fakeUser);
        renderHome();
        const element = await screen.findByTestId('home-link-flagsGame');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });

    test('home - link capitals without user is not rendered', async () => {
        mockUser(undefined);
        renderHome();
        const element = screen.queryByTestId('home-link-flagsGame');
        expect(element).toBeNull();
    });
})