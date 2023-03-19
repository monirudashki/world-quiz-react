import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PageNotFound } from "./404";

describe('404 tests', () => {

    beforeAll(cleanup);

    test('404-h1 render', () => {
        render(
            <MemoryRouter>
                <PageNotFound />
            </MemoryRouter>
        );

        expect(screen.getByTestId('404-h1')).toBeInTheDocument();
    });

    test('404-h2 render', () => {
        render(
            <MemoryRouter>
                <PageNotFound />
            </MemoryRouter>
        );

        expect(screen.getByTestId('404-h2')).toBeInTheDocument();
    });
});