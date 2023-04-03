import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";

import gameInitialState from "../../../../+store/features/game";
import '@testing-library/jest-dom/extend-expect';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mockGameData } from "../../../../testUtils/mockGameData";
import { PublicJoker } from "../PublicJoker";

function publicJokerRender(gameValue) {
    const mockStore = configureStore();
    const store = mockStore(gameInitialState);

    store.clearActions();

    render(
        <Provider store={store}>
            <PublicJoker gameState={mockGameData} game={gameValue} />
        </Provider>
    );
}

describe('Public Joker tests suit', () => {

    afterEach(cleanup);

    test('Public Joker - first graph render', () => {
        publicJokerRender();

        expect(screen.getByTestId('graphBar1')).toBeInTheDocument();
    });

    test('Public Joker - second graph render', () => {
        publicJokerRender();

        expect(screen.getByTestId('graphBar2')).toBeInTheDocument();
    });

    test('Public Joker - third graph render', () => {
        publicJokerRender();

        expect(screen.getByTestId('graphBar3')).toBeInTheDocument();
    });

    test('Public Joker - fourth graph render', () => {
        publicJokerRender();

        expect(screen.getByTestId('graphBar4')).toBeInTheDocument();
    });

    test('Public Joker - capitals render all answers', () => {
        publicJokerRender("Capitals");

        expect(screen.getAllByTestId('answer')).toHaveLength(4);
    });

    test('Public Joker - flags answer A', () => {
        publicJokerRender();

        expect(screen.getByText('A')).toBeInTheDocument();
    });

    test('Public Joker - flags answer B', () => {
        publicJokerRender();

        expect(screen.getByText('B')).toBeInTheDocument();
    });

    test('Public Joker - flags answer C', () => {
        publicJokerRender();

        expect(screen.getByText('C')).toBeInTheDocument();
    });

    test('Public Joker - flags answer D', () => {
        publicJokerRender();

        expect(screen.getByText('D')).toBeInTheDocument();
    });

    test('Public Joker - Button is render with correct text', () => {
        publicJokerRender();

        expect(screen.getByText('X')).toBeInTheDocument();
    });
});