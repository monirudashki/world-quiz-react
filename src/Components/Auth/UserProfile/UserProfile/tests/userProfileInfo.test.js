import { cleanup, render, screen } from "@testing-library/react"
import UserProfileInfo from "../UserProfileInfo";

describe('userProfileInfo tests suit', () => {

    afterEach(cleanup);

    test('userProfileInfo username span with correct value', () => {
        render(<UserProfileInfo username={'simeon'} email={'simeon@gmail.bg'} lives={4} />);

        expect(screen.getByTestId('info-username')).toHaveTextContent(/simeon/i);
    });

    test('userProfileInfo email span with correct value', () => {
        render(<UserProfileInfo username={'simeon'} email={'simeon@gmail.bg'} lives={4} />);

        expect(screen.getByTestId('info-email')).toHaveTextContent(/simeon@gmail.bg/i);
    });

    test('userProfileInfo button edit rendered', () => {
        render(<UserProfileInfo username={'simeon'} email={'simeon@gmail.bg'} lives={4} />);

        expect(screen.getByTestId('info-button-edit')).toBeInTheDocument();
    });

    test('userProfileInfo button lives rendered', () => {
        render(<UserProfileInfo username={'simeon'} email={'simeon@gmail.bg'} lives={4} />);

        expect(screen.getByTestId('info-button-lives')).toBeInTheDocument();
    });

    test('userProfileInfo button lives enabled', () => {
        render(<UserProfileInfo username={'simeon'} email={'simeon@gmail.bg'} lives={4} />);

        expect(screen.getByTestId('info-button-lives')).toBeEnabled();
    });

    test('userProfileInfo button lives disabled with 5 lives', () => {
        render(<UserProfileInfo username={'simeon'} email={'simeon@gmail.bg'} lives={5} />);

        expect(screen.getByTestId('info-button-lives')).toBeDisabled();
    });
})