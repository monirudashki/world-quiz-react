import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"

import gameInitialState from "../../../+store/features/game";
import '@testing-library/jest-dom/extend-expect';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../Contexts/AuthContext";
import { GameCapitals } from "./GameCapitals";
import * as authService from '../../../Services/authService';
import * as capitalsService from '../../../Services/capitalsService';
import { mockGameData } from "../../../testUtils/mockGameData";
import { useGameCapitalsDispatch, useGameCapitalsSelector } from '../../../+store/redux-hooks/redux-hooks';
import { testUseAppSelector } from "../../../+store/tests-redux/test-app-selector";
import { fakeUser } from "../../../testUtils/mockUser";
import { act } from "react-dom/test-utils";

jest.mock('../../../+store/redux-hooks/redux-hooks');

function renderCapitalsGame() {
    const mockStore = configureStore();
    const store = mockStore(gameInitialState);

    store.clearActions();

    render(
        <MemoryRouter>
            <Provider store={store}>
                <AuthProvider>
                    <GameCapitals />
                </AuthProvider>
            </Provider>
        </MemoryRouter>
    );
}

describe('Game Capitals tests suit', () => {

    beforeEach(() => {
        jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
            Promise.resolve(fakeUser)
        );

        jest.spyOn(capitalsService, 'getCapitalsGameQuestions').mockImplementation(() =>
            Promise.resolve(mockGameData.questions)
        );

        const dispatch = jest.fn();
        useGameCapitalsSelector.mockImplementation(testUseAppSelector);
        useGameCapitalsDispatch.mockImplementation(() => dispatch);
    });

    afterEach(cleanup);

    test('Game capitals - heading is rendered', async () => {

        renderCapitalsGame();

        expect(await screen.findByText(/CAPITALS QUIZ/i)).toBeInTheDocument();
    });

    test('Game capitals - button exit is rendered', async () => {

        renderCapitalsGame();

        expect(await screen.findByText('EXIT')).toBeInTheDocument();
    });

    //call friend

    test('Game capitals - button call friend is rendered', async () => {

        renderCapitalsGame();

        expect(await screen.findByTestId('callFriend')).toBeInTheDocument();
    });

    test('Game capitals - useDispatch have been called', async () => {

        renderCapitalsGame();

        await screen.findByTestId('callFriend')

        act(() => {
            fireEvent.click(screen.getByTestId('callFriend'));
        });

        expect(useGameCapitalsDispatch).toHaveBeenCalled();
    });

    test('Game capitals - call friend is rendered after click', async () => {

        renderCapitalsGame();

        waitFor(() => {
            fireEvent.click(screen.getByTestId('publicJoker'));

            expect(screen.getByTestId('jokers-publicJoker')).toBeInTheDocument();
        });
    });

    test('Game capitals - call friend is closed after click', async () => {

        renderCapitalsGame();

        waitFor(() => {
            fireEvent.click(screen.getByTestId('publicJoker'));

            fireEvent.click(screen.getByText('X'));

            expect(screen.queryByTestId('jokers-publicJoker')).toBeNull();
        });
    });

    //public joker

    test('Game capitals - public joker is rendered after click', async () => {

        renderCapitalsGame();

        waitFor(() => {
            fireEvent.click(screen.getByTestId('callFriend'));

            expect(screen.getByTestId('callFriend-joker')).toBeInTheDocument();
        });
    });

    test('Game capitals - public joker is closed after click', async () => {

        renderCapitalsGame();

        waitFor(() => {
            fireEvent.click(screen.getByTestId('callFriend'));

            fireEvent.click(screen.getByText('X'));

            expect(screen.queryByTestId('callFriend-joker')).toBeNull();
        });
    });

    //timer 

    test('Game capitals - timer is rendered', async () => {

        renderCapitalsGame();

        expect(await screen.findByTestId('timer-wrapper')).toBeInTheDocument();
    });

    //coins and lives

    test('Game capitals - coins and lives are rendered', async () => {

        renderCapitalsGame();

        expect(await screen.findByTestId('coins-and-lives')).toBeInTheDocument();
    });

    //question title

    test('Game capitals - question title is rendered with correct text', async () => {

        renderCapitalsGame();

        expect(await screen.findByText(/The Capital of bulgaria is?/i)).toBeInTheDocument();
    });

    //game capitals answers

    test('Game capitals - capitals answers are rendered', async () => {

        renderCapitalsGame();

        expect(await screen.findByText('Cameroon')).toBeInTheDocument();
    });

    //jokers 

    test('Game capitals - jokers are rendered', async () => {

        renderCapitalsGame();

        expect(await screen.findByTestId('publicJoker')).toBeInTheDocument();
    });

    //question number

    test('Game capitals - question number is rendered with 1', async () => {

        renderCapitalsGame();

        expect(await screen.findByTestId('question-number')).toBeInTheDocument();
        expect(await screen.findByTestId('question-number')).toHaveTextContent('1');
    });
});