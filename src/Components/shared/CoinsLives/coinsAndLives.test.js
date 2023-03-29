import { cleanup, render, screen } from "@testing-library/react"
import CoinsLives from "./Coins&Lives";

describe('Coins And Lives tests suit', () => {

    afterEach(cleanup);

    test('Coins and lives - to be rendered', () => {
        render(<CoinsLives lives={5} coins={1000} />);

        expect(screen.getByTestId('coins-and-lives')).toBeInTheDocument();
    });

    test('Coins and lives - lives to be rendered', () => {
        render(<CoinsLives lives={5} coins={1000} />);

        expect(screen.getByTestId('lives')).toBeInTheDocument();
    });

    test('Coins and lives - coins to be rendered', () => {
        render(<CoinsLives lives={5} coins={1000} />);

        expect(screen.getByTestId('coins')).toBeInTheDocument();
    });

    test('Coins and lives - coins to be rendered', () => {
        render(<CoinsLives lives={5} coins={1000} />);

        expect(screen.getByTestId('coins')).toHaveTextContent(/1000/i);
    });
}) 