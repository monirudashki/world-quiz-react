import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"

import gameInitialState from "../../../../+store/features/game";
import '@testing-library/jest-dom/extend-expect';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mockGameData } from "../../../../testUtils/mockGameData";
import { act } from "react-dom/test-utils";
import { CapitalsAnswers } from "./CapitalsAnswers";

function capitalsAnswersRender() {
    const mockStore = configureStore();
    const store = mockStore(gameInitialState);

    store.clearActions();

    render(
        <Provider store={store}>
            <CapitalsAnswers gameState={mockGameData} />
        </Provider>
    );
}

describe('Capitals Answers tests suit', () => {

    afterEach(cleanup);

    test('Capitals Answers - first answer is render', () => {
        capitalsAnswersRender();

        expect(screen.getAllByRole('button')[0]).toBeInTheDocument();
    });

    test('Capitals Answers - second answer is render', () => {
        capitalsAnswersRender();

        expect(screen.getAllByRole('button')[1]).toBeInTheDocument();
    });

    test('Capitals Answers - third answer is render', () => {
        capitalsAnswersRender();

        expect(screen.getAllByRole('button')[2]).toBeInTheDocument();
    });

    test('Capitals Answers - fourth answer is render', () => {
        capitalsAnswersRender();

        expect(screen.getAllByRole('button')[3]).toBeInTheDocument();
    });

    test('Capitals Answers - answer is disabled when is clicked', () => {
        capitalsAnswersRender();

        act(() => {
            fireEvent.click(screen.getAllByRole('button')[0]);
        })

        expect(screen.getAllByRole('button')[0]).toBeDisabled();
    });

});