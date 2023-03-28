import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { fakeFlagQuestion } from "../../../testUtils/mockFlagsQuestion";
import { CapitalsQuestionItem } from "./CapitalsQuestionItem";

function renderCapitalsCatalogItem() {
    render(
        <MemoryRouter>
            <CapitalsQuestionItem question={fakeFlagQuestion} />
        </MemoryRouter>
    )
}

describe('Admin CapitalsQuestionItem tests suit', () => {

    afterEach(cleanup);

    test('Capitals Question Item - h2 is render', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByTestId('h2')).toBeInTheDocument();
    });

    test('Capitals Question Item - h2 with correct text', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByTestId('h2')).toHaveTextContent(`Capital ${fakeFlagQuestion.title}`);
    });

    test('Capitals Question Item - first answer is rendered', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByText(fakeFlagQuestion.firstAnswer.toString()));
    });

    test('Capitals Question Item - second answer is rendered', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByText(fakeFlagQuestion.secondAnswer.toString()));
    });

    test('Capitals Question Item - third answer is rendered', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByText(fakeFlagQuestion.thirdAnswer.toString()));
    });

    test('Capitals Question Item - fourth answer is rendered', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByText(fakeFlagQuestion.fourthAnswer.toString()));
    });

    test('Capitals Question Item - wright answer is rendered', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByText(`Wright answer: ${fakeFlagQuestion.wrightAnswer}`));
    });

    test('Capitals Question Item - button edit is rendered', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByText(/edit/i));
    });

    test('Capitals Question Item - button edit is rendered', () => {
        renderCapitalsCatalogItem();

        expect(screen.getByText(/delete/i));
    });
});