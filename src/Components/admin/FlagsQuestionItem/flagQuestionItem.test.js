import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { fakeFlagQuestion } from "../../../testUtils/mockFlagsQuestion";
import { FlagsQuestionItem } from "./FlagsQuestionItem";

function renderFlagsCatalogItem() {
    render(
        <MemoryRouter>
            <FlagsQuestionItem question={fakeFlagQuestion} />
        </MemoryRouter>
    )
}

describe('Admin FlagsQuestionItem tests suit', () => {

    afterEach(cleanup);

    test('FlagsQuestionItem - h2 is render', () => {
        renderFlagsCatalogItem();

        expect(screen.getByTestId('h2')).toBeInTheDocument();
    });

    test('FlagsQuestionItem - h2 with correct text', () => {
        renderFlagsCatalogItem();

        expect(screen.getByTestId('h2')).toHaveTextContent(`Flag ${fakeFlagQuestion.title}`);
    });

    test('FlagsQuestionItem - first answer is rendered', () => {
        renderFlagsCatalogItem();

        expect(screen.getByTestId('firstAnswer')).toBeInTheDocument();
    });

    test('FlagsQuestionItem - second answer is rendered', () => {
        renderFlagsCatalogItem();

        expect(screen.getByTestId('secondAnswer')).toBeInTheDocument();
    });

    test('FlagsQuestionItem - third answer is rendered', () => {
        renderFlagsCatalogItem();

        expect(screen.getByTestId('thirdAnswer')).toBeInTheDocument();
    });

    test('FlagsQuestionItem - fourth answer is rendered', () => {
        renderFlagsCatalogItem();

        expect(screen.getByTestId('fourthAnswer')).toBeInTheDocument();
    });

    test('FlagsQuestionItem - wright answer is rendered', () => {
        renderFlagsCatalogItem();

        expect(screen.getByTestId('wrightAnswer')).toBeInTheDocument();
    });

    test('FlagsQuestionItem - button edit is rendered', () => {
        renderFlagsCatalogItem();

        expect(screen.getByText(/edit/i));
    });

    test('FlagsQuestionItem - button edit is rendered', () => {
        renderFlagsCatalogItem();

        expect(screen.getByText(/delete/i));
    });
});