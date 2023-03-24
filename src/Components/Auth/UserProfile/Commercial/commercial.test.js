import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { Commercial } from "./Commercial";

describe('Commercial test suit', () => {

    afterEach(cleanup);

    test('Commercial - href is render', () => {
        render(<Commercial />);

        expect(screen.getByTestId('commercial-href')).toBeInTheDocument();
    });

    test('Commercial - img is render', () => {
        render(<Commercial />);

        expect(screen.getByTestId('commercial-img')).toBeInTheDocument();
    });

    test('Commercial - button is render', () => {
        render(<Commercial />);

        expect(screen.getByTestId('commercial-button')).toBeInTheDocument();
    });

    test('Commercial - button is disabled', () => {
        render(<Commercial />);

        expect(screen.getByTestId('commercial-button')).toBeDisabled();
    });

    test('Commercial - button start with text 5', () => {
        render(<Commercial />);

        expect(screen.getByTestId('commercial-button')).toHaveTextContent('5');
    });

    test("Commercial - button change his value after 1 second", async () => {
        jest.useFakeTimers();

        render(<Commercial />);

        act(() => {
            jest.advanceTimersByTime(1000);
        })
        await waitFor(() => {
            const button = screen.getByTestId('commercial-button');
            expect(button).toHaveTextContent('4');
        })
        jest.useRealTimers();
    });

    test("Commercial - button change his value after 5 second to X", async () => {
        jest.useFakeTimers();

        render(<Commercial />);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        await waitFor(() => {
            const button = screen.getByTestId('commercial-button');
            expect(button).toHaveTextContent('X');
        })
        jest.useRealTimers();
    });

    test("Commercial - button after 5 second to be enabled", async () => {
        jest.useFakeTimers();

        render(<Commercial />);

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        await waitFor(() => {
            const button = screen.getByTestId('commercial-button');
            expect(button).toBeEnabled();
        })
        jest.useRealTimers();
    });
})