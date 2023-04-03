import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"

import gameInitialState from "../../../../+store/features/game";
import '@testing-library/jest-dom/extend-expect';
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mockGameData } from "../../../../testUtils/mockGameData";
import { FlagsAnswers } from "./FlagsAnswers";
import { act } from "react-dom/test-utils";

function flagAnswersRender() {
    const mockStore = configureStore();
    const store = mockStore(gameInitialState);

    store.clearActions();

    render(
        <Provider store={store}>
            <FlagsAnswers gameState={mockGameData} />
        </Provider>
    );
}

describe('Flags Answers tests suit', () => {

    afterEach(cleanup);

    test('Flags Answers - firstAnswer-img is render', () => {
        flagAnswersRender();

        expect(screen.getByTestId('firstAnswer-img')).toBeInTheDocument();
    });

    test('Flags Answers - secondAnswer-img is render', () => {
        flagAnswersRender();

        expect(screen.getByTestId('secondAnswer-img')).toBeInTheDocument();
    });

    test('Flags Answers - thirdAnswer-img is render', () => {
        flagAnswersRender();

        expect(screen.getByTestId('thirdAnswer-img')).toBeInTheDocument();
    });

    test('Flags Answers - fourthAnswer-img is render', () => {
        flagAnswersRender();

        expect(screen.getByTestId('fourthAnswer-img')).toBeInTheDocument();
    });

    test('Flags Answers - first answer is render with correct text', () => {
        flagAnswersRender();

        expect(screen.getByText('A')).toBeInTheDocument();
    });

    test('Flags Answers - second answer is render with correct text', () => {
        flagAnswersRender();

        expect(screen.getByText('B')).toBeInTheDocument();
    });

    test('Flags Answers - third answer is render with correct text', () => {
        flagAnswersRender();

        expect(screen.getByText('C')).toBeInTheDocument();
    });

    test('Flags Answers - fourth answer is render with correct text', () => {
        flagAnswersRender();

        expect(screen.getByText('D')).toBeInTheDocument();
    });

    test('Flags Answers - answer is disabled when is clicked', () => {
        flagAnswersRender();

        act(() => {
            fireEvent.click(screen.getByText('A'));
        })

        expect(screen.getByText('A')).toBeDisabled();
    });

});