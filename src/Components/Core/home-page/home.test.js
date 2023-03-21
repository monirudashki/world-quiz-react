import { cleanup, screen, render, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthProvider } from "../../../Contexts/AuthContext"
import { GameCapitalsProvider } from "../../../Contexts/GameCapitalsContext"
import { Home } from "./Home";
import * as authService from '../../../Services/authService';
import { fakeUser } from "../../../testUtils/mockUser";

function renderHome() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <GameCapitalsProvider>
                    <Home />
                </GameCapitalsProvider>
            </AuthProvider>
        </MemoryRouter>
    )
}

function mockUser(userValue) {
    jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
        Promise.resolve(userValue)
    )
}

function mockGameQuestions() {
    jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve(undefined)
    )
}

describe('Home page tests', () => {
    afterAll(cleanup);

    test('home h1 render and correct text content', async () => {
        mockUser(undefined);
        mockGameQuestions();
        renderHome();
        await waitFor(() => {
            const homeH1 = screen.getByTestId('home-h1');

            expect(homeH1).toBeInTheDocument();
            expect(homeH1).toHaveTextContent(/World Quiz Games/i)
        });
    });

    test('home capitals h2 render and correct text content', async () => {
        mockUser(undefined);
        mockGameQuestions();
        renderHome();
        await waitFor(() => {
            const homeCapitalsH2 = screen.getByTestId('home-capitals');

            expect(homeCapitalsH2).toBeInTheDocument();
            expect(homeCapitalsH2).toHaveTextContent(/Capitals Quiz/i)
        });
    });

    test('home capitals img render', async () => {
        mockUser(undefined);
        mockGameQuestions();
        renderHome();
        await waitFor(() => {
            const homeCapitalsImg = screen.getByTestId('home-capitals-img');

            expect(homeCapitalsImg).toBeInTheDocument();
        });
    });

    test('home flags h2 render and correct text content', async () => {
        mockUser(undefined);
        mockGameQuestions();
        renderHome();
        await waitFor(() => {
            const homeFlagsH2 = screen.getByTestId('home-flags');

            expect(homeFlagsH2).toBeInTheDocument();
            expect(homeFlagsH2).toHaveTextContent(/Flags Quiz/i)
        });
    });

    test('home flags img render', async () => {
        mockUser(undefined);
        mockGameQuestions();
        renderHome();
        await waitFor(() => {
            const homeFlagsImg = screen.getByTestId('home-flags-img');

            expect(homeFlagsImg).toBeInTheDocument();
        });
    });

    test('home div with game buttons not rendered', async () => {
        mockUser(undefined);
        mockGameQuestions();
        renderHome();
        await waitFor(() => {
            const divGameButtons = screen.queryByTestId('home-game-buttons');

            expect(divGameButtons).toBeNull();
        });
    });

    test('home div with game buttons rendered with user', async () => {
        mockUser(fakeUser);
        mockGameQuestions();
        renderHome();
        const element = await screen.findByTestId('home-game-buttons');
        await waitFor(() => {
            expect(element).toBeInTheDocument();
        });
    });
})