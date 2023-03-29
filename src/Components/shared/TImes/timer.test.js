import { cleanup, render, screen, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import { Timer } from "./Times";

describe('Timer tests suit', () => {

    afterEach(cleanup);

    test('timer-wrapper - to be rendered', () => {
        render(<Timer />);

        expect(screen.getByTestId('timer-wrapper')).toBeInTheDocument();
    });

    test('timer - to be rendered', () => {
        render(<Timer />);

        expect(screen.getByTestId('timer')).toBeInTheDocument();
    });

    test('timer - to start from 60', () => {
        render(<Timer />);

        expect(screen.getByTestId('timer')).toHaveTextContent('60');
    });

    test('timer - correct time moving', async () => {
        jest.useFakeTimers();
        render(<Timer />);

        act(() => {
            jest.advanceTimersByTime(1000);
        })
        waitFor(() => {
            expect(screen.getByTestId('timer')).toHaveTextContent('59');
        })

        jest.useRealTimers();
    });
})