import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { fakeUsers } from "../../../testUtils/mockUsers";
import { ScoreBoard } from "./ScoreBoard";
import * as authService from '../../../Services/authService';
import { AuthProvider } from "../../../Contexts/AuthContext";
import { fakeUser } from "../../../testUtils/mockUser";

function renderScoreBoard() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <ScoreBoard />
            </AuthProvider>
        </MemoryRouter>
    )
}

function mockUsers(usersValue) {
    jest.spyOn(authService, 'getUsersByPage').mockImplementation(() =>
        Promise.resolve({
            count: 7,
            users: usersValue
        })
    )
}

function mockUser(userValue) {
    jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
        Promise.resolve(userValue)
    )
}

describe('Scoreboard tests suit', () => {

    beforeEach(() => {
        mockUser(fakeUser);
    })

    afterEach(cleanup);

    test('Scoreboard - heading render', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        await waitFor(() => {
            expect(screen.getByTestId('scoreboard-heading')).toBeInTheDocument();
        })
    });

    test('Scoreboard - heading correct text content', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        waitFor(() => {
            expect(screen.getByTestId('scoreboard-heading')).toHaveTextContent(/scoreboard/i);
        })
    });

    test('Scoreboard - section render', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByTestId('scoreboard-section')).toBeInTheDocument();
    });

    test('Scoreboard - spinner render first', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByTestId('spinner'));
    });

    test('Scoreboard - first paragraph is rendered', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/vesko/i)).toBeInTheDocument();
    });

    test('Scoreboard - second paragraph is rendered', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/simeon/i)).toBeInTheDocument();
    });

    test('Scoreboard - third paragraph i rendered', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/kevin/i)).toBeInTheDocument();
    });

    test('Scoreboard - fourth paragraph i rendered', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/ego/i)).toBeInTheDocument();
    });

    test('Scoreboard - fourth paragraph i rendered', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/moni/i)).toBeInTheDocument();
    });

    test('Scoreboard - button previous is render', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/previous/i)).toBeInTheDocument();
    });

    test('Scoreboard - button previous is disabled', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/previous/i)).toBeDisabled();
    });

    test('Scoreboard - button previous is enabled after click next', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        waitFor(() => {
            fireEvent.click(screen.getByText(/next/i));
        })

        expect(await screen.findByText(/previous/i)).toBeEnabled();
    });

    test('Scoreboard - button next is render', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/next/i)).toBeInTheDocument();
    });

    test('Scoreboard - button next is enabled', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByText(/next/i)).toBeEnabled();
    });

    test('Scoreboard - button next is disabled in last page', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        waitFor(() => {
            fireEvent.click(screen.getByText(/next/i));
        })

        expect(await screen.findByText(/next/i)).toBeDisabled();
    });

    test('Scoreboard - pages p is render', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByTestId('scoreboard-pages')).toBeInTheDocument();
    });

    test('Scoreboard - pages are with correct text content', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        expect(await screen.findByTestId('scoreboard-pages')).toHaveTextContent('1/2');
    });

    test('Scoreboard - pages are with correct text content after click next', async () => {
        mockUsers(fakeUsers);

        renderScoreBoard();

        waitFor(() => {
            fireEvent.click(screen.getByText(/next/i));
        })

        expect(await screen.findByTestId('scoreboard-pages')).toHaveTextContent('2/2');
    });
});