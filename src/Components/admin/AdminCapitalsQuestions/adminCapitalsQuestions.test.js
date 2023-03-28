import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AdminCapitalsQuestions from "./AdminCapitalsQuestions";
import * as capitalsService from '../../../Services/capitalsService';
import { fakeCatalog } from "../../../testUtils/mockCatalog";
import { MemoryRouter } from "react-router-dom";

function renderAdminCapitalsCatalog() {
    render(
        <MemoryRouter>
            <AdminCapitalsQuestions />
        </MemoryRouter>
    )
}

function mockCapitalsCatalog(catalogValue) {
    jest.spyOn(capitalsService, 'getCapitalsQuestions').mockImplementation(() =>
        Promise.resolve(catalogValue)
    )
}

describe('Admin Capitals Catalog tests suit', () => {

    afterEach(cleanup);

    test('Admin Capitals Catalog h1 is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findByText(/Admin Capitals Catalog/i));
    });

    test('Admin Capitals Catalog search input is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findByTestId('search'));
    });

    test('Admin Capitals Catalog search button is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findByText(/search/i));
    });

    test('Admin Capitals Catalog - no items with empty array', async () => {
        mockCapitalsCatalog([]);

        renderAdminCapitalsCatalog();

        expect(await screen.findByText(/There is no added questions yet!/i));
    });

    test('Admin Capitals Catalog - 3 items on first page', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findAllByTestId('capitals-catalog-item')).toHaveLength(3);
    });

    test('Admin Capitals Catalog - 2 items if there are just 2', async () => {
        mockCapitalsCatalog(fakeCatalog.slice(0, 2));

        renderAdminCapitalsCatalog();

        expect(await screen.findAllByTestId('capitals-catalog-item')).toHaveLength(2);
    });

    test('Admin Capitals Catalog - button previous is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findByText(/previous/i));
    });

    test('Admin Capitals Catalog - button previous is disabled in page 1', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findByText(/previous/i)).toBeDisabled();
    });

    test('Admin Capitals Catalog - button previous to be enabled in second page', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        fireEvent.click(screen.getByText(/next/i));
        waitFor(() => {
            expect(screen.findByText(/previous/i)).toBeEnabled();
        })
    });

    test('Admin Capitals Catalog - button next is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findByText(/next/i));
    });

    test('Admin Capitals Catalog - page is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findByTestId('currentPage'));
    });

    test('Admin Capitals Catalog - page correct text', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminCapitalsCatalog();

        expect(await screen.findByTestId('currentPage')).toHaveTextContent('1');
    });
});