import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"

import '@testing-library/jest-dom/extend-expect';

import { fakeUser } from "../../../testUtils/mockUser";
import { Result } from "./Result";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../Contexts/AuthContext";
import * as authService from '../../../Services/authService';

import { useResultSelector } from '../../../+store/redux-hooks/redux-hooks';
import { testUseAppSelector } from "../../../+store/tests-redux/test-app-selector";

jest.mock('../../../+store/redux-hooks/redux-hooks');

function resultRender() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <Result />
            </AuthProvider>
        </MemoryRouter>
    );
}

describe('Result tests suit', () => {

    beforeEach(() => {
        jest.spyOn(authService, 'getCurrentUser').mockImplementation(() =>
            Promise.resolve(fakeUser)
        );

        useResultSelector.mockImplementation(testUseAppSelector);
    });

    afterEach(cleanup);

    test('Result - heading is rendered', async () => {

        resultRender();

        expect(await screen.findByText(/result/i)).toBeInTheDocument();
    });

    test('Result - coins-and-lives is rendered', async () => {

        resultRender();

        expect(await screen.findByTestId('coins-and-lives')).toBeInTheDocument();
    });

    test('Result - no result is rendered', async () => {

        resultRender();

        expect(await screen.findByText(/You haven't play game yet!/i)).toBeInTheDocument();
    });

    test('Result - link exit is rendered', async () => {

        resultRender();

        expect(await screen.findByText(/exit/i)).toBeInTheDocument();
    });

    test('Result - link play is rendered', async () => {

        resultRender();

        expect(await screen.findByText('PLAY')).toBeInTheDocument();
    });
});