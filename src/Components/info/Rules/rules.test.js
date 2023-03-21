import { cleanup, render, screen, waitFor } from "@testing-library/react";
import Rules from "./Rules";

describe('Rules tests', () => {

    test('h3 Capitals render', () => {
        render(<Rules />);

        expect(screen.getByTestId('rules-h3-capitals')).toBeInTheDocument();
    });

    test('rules-img-capitals render', () => {
        render(<Rules />);

        expect(screen.getByTestId('rules-img-capitals')).toBeInTheDocument();
    });

    test('rules-p-capitals render', () => {
        render(<Rules />);

        expect(screen.getByTestId('rules-p-capitals')).toBeInTheDocument();
    });

    test('rules-img-flags render', () => {
        render(<Rules />);

        expect(screen.getByTestId('rules-img-flags')).toBeInTheDocument();
    });

    test('rules-p-flags render', () => {
        render(<Rules />);

        expect(screen.getByTestId('rules-p-flags')).toBeInTheDocument();
    });

    test('rules-h3-flags render', () => {
        render(<Rules />);

        expect(screen.getByTestId('rules-h3-flags')).toBeInTheDocument();
    });

    test('rules-all-h2 render', () => {
        render(<Rules />);

        expect(screen.getByTestId('rules-all-h2')).toBeInTheDocument();
    });

    test('rules-all-p render', () => {
        render(<Rules />);

        expect(screen.getByTestId('rules-all-p')).toBeInTheDocument();
    });
});