import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";

import gameInitialState from "../../../../+store/features/game";
import '@testing-library/jest-dom/extend-expect';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mockGameData } from "../../../../testUtils/mockGameData";
import { CallFriend } from "../CallFriend";

function callFriendRender(gameValue) {
    const mockStore = configureStore();
    const store = mockStore(gameInitialState);

    store.clearActions();

    render(
        <Provider store={store}>
            <CallFriend gameState={mockGameData} game={gameValue} />
        </Provider>
    );
}

describe('Call Friend Joker tests suit', () => {

    afterEach(cleanup);

    test('Call Friend Joker - correct flag answer render', () => {
        callFriendRender();

        expect(screen.getByTestId('flag-joker')).toBeInTheDocument();
    });

    test('Call Friend Joker - correct capitals answer render', () => {
        callFriendRender("Capitals");

        expect(screen.getByTestId('capitals-joker')).toBeInTheDocument();
    });

    test('Call Friend Joker - button render', () => {
        callFriendRender("Capitals");

        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('Call Friend Joker - button correct text', () => {
        callFriendRender("Capitals");

        expect(screen.getByRole('button')).toHaveTextContent(/x/i);
    });
});