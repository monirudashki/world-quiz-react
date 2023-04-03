import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";

import gameInitialState from "../../../../+store/features/game";
import '@testing-library/jest-dom/extend-expect';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mockGameData } from "../../../../testUtils/mockGameData";
import { PublicJoker } from "../PublicJoker";
import Jokers from "../Jokers";

function publicJokers(gameValue) {
    const mockStore = configureStore();
    const store = mockStore(gameInitialState);

    store.clearActions();

    render(
        <Provider store={store}>
            <Jokers gameState={mockGameData} />
        </Provider>
    );
}

describe('Jokers tests suit', () => {

    afterEach(cleanup);

    test('Jokers - button callFriend is render', () => {
        publicJokers();

        expect(screen.getByTestId('publicJoker')).toBeInTheDocument();
    });

    test('Jokers - button callFriend is disabled after click', () => {
        publicJokers();

        act(() => {
            fireEvent.click(screen.getByTestId('publicJoker'));
        });

        expect(screen.getByTestId('publicJoker')).toBeDisabled();
    });

    test('Jokers - button 50/50 is render', () => {
        publicJokers();

        expect(screen.getByTestId('50/50')).toBeInTheDocument();
    });

    test('Jokers - button 50/50 is disabled after click', () => {
        publicJokers();

        act(() => {
            fireEvent.click(screen.getByTestId('50/50'));
        });

        expect(screen.getByTestId('50/50')).toBeDisabled();
    });

    test('Jokers - button callFriend is render', () => {
        publicJokers();

        expect(screen.getByTestId('callFriend')).toBeInTheDocument();
    });

    test('Jokers - button callFriend is disabled after click', () => {
        publicJokers();

        act(() => {
            fireEvent.click(screen.getByTestId('callFriend'));
        });

        expect(screen.getByTestId('callFriend')).toBeDisabled();
    });

});