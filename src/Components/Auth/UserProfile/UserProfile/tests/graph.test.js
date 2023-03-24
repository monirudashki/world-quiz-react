const { cleanup, render, screen } = require("@testing-library/react");
const { default: Graph } = require("../Graph");
import { getPercentage } from '../Graph'

describe('graph userProfile tests suit', () => {

    afterEach(cleanup);

    test('graph userProfile heading render with correct value', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph-h2')).toHaveTextContent(/Last 5 games score graph/i);
    });

    test('function getPercentage correct works', () => {
        expect(getPercentage(25)).toEqual('100%');
    });

    test('graph userProfile game 1 with correct value', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph game1')).toHaveTextContent('10/25');
    })

    test('graph userProfile game 2 with correct value', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph game2')).toHaveTextContent('20/25');
    })

    test('graph userProfile game 3 with correct value', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph game3')).toHaveTextContent('0/25');
    })

    test('graph userProfile game 4 with correct value', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph game4')).toHaveTextContent('8/25');
    })

    test('graph userProfile game 5 with correct value', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph game5')).toHaveTextContent('20/25');
    })

    test('graph game1 style', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph style1')).toHaveStyle({ gridColumn: 2, '--h': getPercentage(10) });
    });

    test('graph game2 style', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph style2')).toHaveStyle({ gridColumn: 3, '--h': getPercentage(20) });
    });

    test('graph game3 style', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph style3')).toHaveStyle({ gridColumn: 4, '--h': getPercentage(0) });
    });

    test('graph game4 style', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph style4')).toHaveStyle({ gridColumn: 5, '--h': getPercentage(8) });
    });

    test('graph game5 style', () => {
        render(<Graph lastFiveGames={[10, 20, 0, 8, 20]} />);

        expect(screen.getByTestId('graph style5')).toHaveStyle({ gridColumn: 6, '--h': getPercentage(20) });
    });
})