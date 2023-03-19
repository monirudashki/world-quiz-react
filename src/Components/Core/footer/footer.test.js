import { cleanup, render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe('Footer tests', () => {

    beforeAll(cleanup);

    test('Correct footer textContent', () => {
        const value = 'Project build with React © Simeon Rudashki';

        render(<Footer />);

        expect(screen.getByText(value)).toBeInTheDocument();
    })
});