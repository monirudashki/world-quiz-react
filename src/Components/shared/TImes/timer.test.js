import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { Timer } from "./Times";

import gameInitialState from "../../../+store/features/game";
import '@testing-library/jest-dom/extend-expect';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mockGameData } from "../../../testUtils/mockGameData";

describe('Timer tests suit', () => {

    afterEach(cleanup);

    test('timer-wrapper - to be rendered', () => {
        const mockStore = configureStore();
        const store = mockStore(gameInitialState);

        store.clearActions();

        render(
            <Provider store={store}>
                <Timer gameState={mockGameData} />
            </Provider>
        );

        expect(screen.getByTestId('timer-wrapper')).toBeInTheDocument();
    });

    test('timer - to be rendered', () => {
        const mockStore = configureStore();
        const store = mockStore(gameInitialState);

        store.clearActions();

        render(
            <Provider store={store}>
                <Timer gameState={mockGameData} />
            </Provider>
        );

        expect(screen.getByTestId('timer')).toBeInTheDocument();
    });

    test('timer - to start from 60', () => {
        const mockStore = configureStore();
        const store = mockStore(gameInitialState);

        store.clearActions();

        render(
            <Provider store={store}>
                <Timer gameState={mockGameData} />
            </Provider>
        );

        expect(screen.getByTestId('timer')).toHaveTextContent('60');
    });

    test('timer - correct time moving', async () => {
        jest.useFakeTimers();
        const mockStore = configureStore();
        const store = mockStore(gameInitialState);

        store.clearActions();

        render(
            <Provider store={store}>
                <Timer gameState={mockGameData} />
            </Provider>
        );

        act(() => {
            jest.advanceTimersByTime(1000);
        })
        waitFor(() => {
            expect(screen.getByTestId('timer')).toHaveTextContent('59');
        })

        jest.useRealTimers();
    });
})