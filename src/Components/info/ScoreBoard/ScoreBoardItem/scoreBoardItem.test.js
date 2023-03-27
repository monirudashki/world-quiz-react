import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../../Contexts/AuthContext";
import { ScoreBoardItem } from "./ScoreBoardItem";
import * as authService from '../../../../Services/authService';
import { fakeUser } from "../../../../testUtils/mockUser";
import { cleanup, render, screen } from "@testing-library/react";

function renderScoreBoardItem(userId, user, index, currentPage) {
    render(
        <MemoryRouter>
            <AuthProvider>
                <ScoreBoardItem
                    key={userId}
                    user={user}
                    index={index}
                    page={currentPage} />
            </AuthProvider>
        </MemoryRouter>
    )
}

function mockUser(userValue) {
    jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
        Promise.resolve(userValue)
    )
}

describe('ScoreBoardItem tests suit', () => {

    beforeEach(() => {
        mockUser(fakeUser);
    })

    afterEach(cleanup);

    test('ScoreBoardItem - img is render', async () => {

        renderScoreBoardItem(fakeUser._id, fakeUser, 0, 1);

        expect(await screen.findByTestId('user-img')).toBeInTheDocument();
    });

    test('ScoreBoardItem - username is render', async () => {

        renderScoreBoardItem(fakeUser._id, fakeUser, 0, 1);

        expect(await screen.findByTestId('user-username'));
    });

    test('ScoreBoardItem - username is with correct text', async () => {

        renderScoreBoardItem(fakeUser._id, fakeUser, 0, 1);

        expect(await screen.findByTestId('user-username')).toHaveTextContent(fakeUser.username.toString());
    });

    test('ScoreBoardItem - coins is render', async () => {

        renderScoreBoardItem(fakeUser._id, fakeUser, 0, 1);

        expect(await screen.findByTestId('user-coins'));
    });

    test('ScoreBoardItem - coins is with correct text', async () => {

        renderScoreBoardItem(fakeUser._id, fakeUser, 0, 1);

        expect(await screen.findByTestId('user-coins')).toHaveTextContent(fakeUser.coins.toString());
    });

    test('ScoreBoardItem - place is render', async () => {

        renderScoreBoardItem(fakeUser._id, fakeUser, 0, 1);

        expect(await screen.findByTestId('user-place'));
    });

    test('ScoreBoardItem - first place correct vision', async () => {

        renderScoreBoardItem(fakeUser._id, fakeUser, 0, 1);

        expect((await screen.findByTestId('user-place')).firstChild).toHaveStyle({ color: 'gold' })
    });

    test('ScoreBoardItem - after 3 place correct vision', async () => {

        renderScoreBoardItem(fakeUser._id, fakeUser, 4, 1);

        expect((await screen.findByTestId('user-place')).firstChild).toHaveTextContent('5.')
    });
});