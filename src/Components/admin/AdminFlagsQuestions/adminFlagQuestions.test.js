import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AdminFlagQuestions from "./AdminFlagQuestions";
import * as flagsService from '../../../Services/flagsService';
import { fakeCatalog } from "../../../testUtils/mockCatalog";
import { MemoryRouter } from "react-router-dom";

function renderAdminFlagsCatalog() {
    render(
        <MemoryRouter>
            <AdminFlagQuestions />
        </MemoryRouter>
    )
}

function mockCapitalsCatalog(catalogValue) {
    jest.spyOn(flagsService, 'getFlagsQuestions').mockImplementation(() =>
        Promise.resolve(catalogValue)
    )
}

describe('Admin Flags Catalog tests suit', () => {

    afterEach(cleanup);

    test('Admin Flags Catalog h1 is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findByText(/Admin Flags Catalog/i));
    });

    test('Admin Flags Catalog search input is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findByTestId('search'));
    });

    test('Admin Flags Catalog search button is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findByText(/search/i));
    });

    test('Admin Flags Catalog - no items with empty array', async () => {
        mockCapitalsCatalog([]);

        renderAdminFlagsCatalog();

        expect(await screen.findByText(/There is no added questions yet!/i));
    });

    test('Admin Flags Catalog - 3 items on first page', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findAllByTestId('flags-catalog-item')).toHaveLength(3);
    });

    test('Admin Flags Catalog - 2 items if there are just 2', async () => {
        mockCapitalsCatalog(fakeCatalog.slice(0, 2));

        renderAdminFlagsCatalog();

        expect(await screen.findAllByTestId('flags-catalog-item')).toHaveLength(2);
    });

    test('Admin Flags Catalog - button previous is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findByText(/previous/i));
    });

    test('Admin Flags Catalog - button previous is disabled in page 1', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findByText(/previous/i)).toBeDisabled();
    });

    test('Admin Flags Catalog - button previous to be enabled in second page', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        fireEvent.click(screen.getByText(/next/i));
        waitFor(() => {
            expect(screen.findByText(/previous/i)).toBeEnabled();
        })
    });

    test('Admin Flags Catalog - button next is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findByText(/next/i));
    });

    test('Admin Flags Catalog - page is render', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findByTestId('currentPage'));
    });

    test('Admin Flags Catalog - page correct text', async () => {
        mockCapitalsCatalog(fakeCatalog);

        renderAdminFlagsCatalog();

        expect(await screen.findByTestId('currentPage')).toHaveTextContent('1');
    });
});