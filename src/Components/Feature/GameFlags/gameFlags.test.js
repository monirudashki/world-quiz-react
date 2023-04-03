import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"

import gameInitialState from "../../../+store/features/game";
import '@testing-library/jest-dom/extend-expect';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../Contexts/AuthContext";
import * as authService from '../../../Services/authService';
import * as flagsService from '../../../Services/flagsService';
import { mockGameData } from "../../../testUtils/mockGameData";
import { useGameFlagsDispatch, useGameFlagsSelector } from '../../../+store/redux-hooks/redux-hooks';
import { testUseAppSelector } from "../../../+store/tests-redux/test-app-selector";
import { fakeUser } from "../../../testUtils/mockUser";
import { act } from "react-dom/test-utils";
import { GameFlags } from "./GameFlags";

jest.mock('../../../+store/redux-hooks/redux-hooks');

function renderFlagsGame() {
    const mockStore = configureStore();
    const store = mockStore(gameInitialState);

    store.clearActions();

    render(
        <MemoryRouter>
            <Provider store={store}>
                <AuthProvider>
                    <GameFlags />
                </AuthProvider>
            </Provider>
        </MemoryRouter>
    );
}

describe('Game Flags tests suit', () => {

    beforeEach(() => {
        jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
            Promise.resolve(fakeUser)
        );

        jest.spyOn(flagsService, 'getFlagsGameQuestions').mockImplementation(() =>
            Promise.resolve(mockGameData.questions)
        );

        const dispatch = jest.fn();
        useGameFlagsSelector.mockImplementation(testUseAppSelector);
        useGameFlagsDispatch.mockImplementation(() => dispatch);
    });

    afterEach(cleanup);

    test('Game flags - heading is rendered', async () => {

        renderFlagsGame();

        expect(await screen.findByText(/FLAGS QUIZ/i)).toBeInTheDocument();
    });

    test('Game flags - button exit is rendered', async () => {

        renderFlagsGame();

        expect(await screen.findByText('EXIT')).toBeInTheDocument();
    });

    //call friend

    test('Game flags - button call friend is rendered', async () => {

        renderFlagsGame();

        expect(await screen.findByTestId('callFriend')).toBeInTheDocument();
    });

    test('Game flags - useDispatch have been called', async () => {

        renderFlagsGame();

        await screen.findByTestId('callFriend')

        act(() => {
            fireEvent.click(screen.getByTestId('callFriend'));
        });

        expect(useGameFlagsDispatch).toHaveBeenCalled();
    });

    test('Game flags - call friend is rendered after click', async () => {

        renderFlagsGame();

        waitFor(() => {
            fireEvent.click(screen.getByTestId('publicJoker'));

            expect(screen.getByTestId('jokers-publicJoker')).toBeInTheDocument();
        });
    });

    test('Game flags - call friend is closed after click', async () => {

        renderFlagsGame();

        waitFor(() => {
            fireEvent.click(screen.getByTestId('publicJoker'));

            fireEvent.click(screen.getByText('X'));

            expect(screen.queryByTestId('jokers-publicJoker')).toBeNull();
        });
    });

    //public joker

    test('Game flags - public joker is rendered after click', async () => {

        renderFlagsGame();

        waitFor(() => {
            fireEvent.click(screen.getByTestId('callFriend'));

            expect(screen.getByTestId('callFriend-joker')).toBeInTheDocument();
        });
    });

    test('Game flags - public joker is closed after click', async () => {

        renderFlagsGame();

        waitFor(() => {
            fireEvent.click(screen.getByTestId('callFriend'));

            fireEvent.click(screen.getByText('X'));

            expect(screen.queryByTestId('callFriend-joker')).toBeNull();
        });
    });

    //timer 

    test('Game flags - timer is rendered', async () => {

        renderFlagsGame();

        expect(await screen.findByTestId('timer-wrapper')).toBeInTheDocument();
    });

    //coins and lives

    test('Game flags - coins and lives are rendered', async () => {

        renderFlagsGame();

        expect(await screen.findByTestId('coins-and-lives')).toBeInTheDocument();
    });

    //question title

    test('Game flags - question title is rendered with correct text', async () => {

        renderFlagsGame();

        expect(await screen.findByText(/The Flag of bulgaria is?/i)).toBeInTheDocument();
    });

    //game capitals answers

    test('Game flags - capitals answers are rendered', async () => {

        renderFlagsGame();

        expect(await screen.findByTestId('firstAnswer-img')).toBeInTheDocument();
    });

    //jokers 

    test('Game flags - jokers are rendered', async () => {

        renderFlagsGame();

        expect(await screen.findByTestId('publicJoker')).toBeInTheDocument();
    });

    //question number

    test('Game flags - question number is rendered with 1', async () => {

        renderFlagsGame();

        expect(await screen.findByTestId('question-number')).toBeInTheDocument();
        expect(await screen.findByTestId('question-number')).toHaveTextContent('1');
    });
});