import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as capitalsService from '../../../../Services/capitalsService';
import { fakeFlagQuestion } from "../../../../testUtils/mockFlagsQuestion";
import AdminAddQuestion from "../AdminAddQuestion";

function renderAdminAddCapitals() {
    render(
        <MemoryRouter>
            <AdminAddQuestion />
        </MemoryRouter>
    )
}

describe('Admin Add capitals question tests suit', () => {

    afterEach(cleanup);

    test('A.A.C.Q - error message not show', () => {
        renderAdminAddCapitals();

        expect(screen.getByTestId('requestError')).toHaveTextContent('');
    });

    test('A.A.C.Q - success message not show', () => {
        renderAdminAddCapitals();

        expect(screen.queryByTestId('success')).toBeNull();
    });

    test('A.A.C.Q - h2 is rendered', () => {
        renderAdminAddCapitals();

        expect(screen.getByText(/Add Capitals Question/i)).toBeInTheDocument();
    });

    //title

    test('A.A.C.Q title input render without value', async () => {
        renderAdminAddCapitals();

        const input = screen.getByTestId('title');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
    });

    test('A.A.C.Q title correct change', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('title');
            const testValue = 'TestForTitle';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.A.C.Q title with incorrect data , error message show', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('title');
            const testValue = 'testForTitle';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('firstAnswer'));
                expect(screen.getByText(/Title is required and needs to starts with capital letter!/i)).toBeInTheDocument();
            })
        });
    });

    test('A.A.C.Q title with correct data , error message hide', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('title');
            const testValue = 'Bulgaria';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('firstAnswer'));
                expect(screen.queryByText(/Title is required and needs to starts with capital letter!/i)).toBeNull();
            })
        });
    });

    //firstAnswer

    test('A.A.C.Q firstAnswer input render without value', async () => {
        renderAdminAddCapitals();

        const input = screen.getByTestId('firstAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
    });

    test('A.A.C.Q firstAnswer correct change', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('firstAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.A.C.Q firstAnswer with incorrect data , error message show', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('firstAnswer');
            const testValue = 'test';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/First Answer is required and needs to starts with capital letter!/i)).toBeInTheDocument();
            })
        });
    });

    test('A.A.C.Q firstAnswer with correct data , error message hide', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('firstAnswer');
            const testValue = 'Bulgaria';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/First Answer is required and needs to starts with capital letter!/i)).toBeNull();
            })
        });
    });

    //secondAnswers

    test('A.A.C.Q secondAnswer input render without value', async () => {
        renderAdminAddCapitals();

        const input = screen.getByTestId('secondAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
    });

    test('A.A.C.Q secondAnswer correct change', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('secondAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.A.C.Q secondAnswer with incorrect data , error message show', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('secondAnswer');
            const testValue = 'test';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/Second Answer is required and needs to starts with capital letter!/i)).toBeInTheDocument();
            })
        });
    });

    test('A.A.C.Q secondAnswer with correct data , error message hide', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('secondAnswer');
            const testValue = 'Bulgaria';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/Second Answer is required and needs to starts with capital letter!/i)).toBeNull();
            })
        });
    });

    //thirdAnswer

    test('A.A.C.Q thirdAnswer input render without value', async () => {
        renderAdminAddCapitals();

        const input = screen.getByTestId('thirdAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
    });

    test('A.A.C.Q thirdAnswer correct change', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('thirdAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.A.C.Q thirdAnswer with incorrect data , error message show', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('thirdAnswer');
            const testValue = 'test';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/Third Answer is required and needs to starts with capital letter!/i)).toBeInTheDocument();
            })
        });
    });

    test('A.A.C.Q thirdAnswer with correct data , error message hide', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('thirdAnswer');
            const testValue = 'Bulgaria';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/Third Answer is required and needs to starts with capital letter!/i)).toBeNull();
            })
        });
    });

    //fourthAnswer

    test('A.A.C.Q fourthAnswer input render without value', async () => {
        renderAdminAddCapitals();

        const input = screen.getByTestId('fourthAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
    });

    test('A.A.C.Q fourthAnswer correct change', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('fourthAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.A.C.Q fourthAnswer with incorrect data , error message show', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('fourthAnswer');
            const testValue = 'test';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/Fourth Answer is required and needs to starts with capital letter!/i)).toBeInTheDocument();
            })
        });
    });

    test('A.A.C.Q fourthAnswer with correct data , error message hide', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('fourthAnswer');
            const testValue = 'Bulgaria';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/Fourth Answer is required and needs to starts with capital letter!/i)).toBeNull();
            })
        });
    });

    //wrightAnswer

    test('A.A.C.Q wrightAnswer input render without value', async () => {
        renderAdminAddCapitals();

        const input = screen.getByTestId('wrightAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
    });

    test('A.A.C.Q wrightAnswer correct change', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('wrightAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.A.C.Q wrightAnswer with incorrect data , error message show', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input = screen.getByTestId('wrightAnswer');
            const testValue = 'test';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/Wright Answer must exist in other for answers!/i)).toBeInTheDocument();
            })
        });
    });

    test('A.A.C.Q wrightAnswer with correct data , error message hide', async () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const inputFirstAnswer = screen.getByTestId('wrightAnswer');
            const input = screen.getByTestId('wrightAnswer');
            const testValue = 'Bulgaria';

            fireEvent.change(inputFirstAnswer, { target: { value: testValue } });
            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('title'));
                expect(screen.getByText(/Wright Answer must exist in other for answers!/i)).toBeNull();
            })
        });
    });

    //buttons

    test('A.A.C.Q button cancel is rendered', () => {
        renderAdminAddCapitals();

        expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    });

    test('A.A.C.Q button create is rendered', () => {
        renderAdminAddCapitals();

        expect(screen.getByText(/CREATE/i)).toBeInTheDocument();
    });

    test('A.A.C.Q button create is disabled', () => {
        renderAdminAddCapitals();

        expect(screen.getByText(/CREATE/i)).toBeDisabled();
    });

    test('A.A.C.Q button create with correct data is enabled', () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input1 = screen.getByTestId('firstAnswer');
            const testValue1 = 'Test';
            fireEvent.change(input1, { target: { value: testValue1 } });

            const input2 = screen.getByTestId('secondAnswer');
            const testValue2 = 'Test';
            fireEvent.change(input2, { target: { value: testValue2 } });


            const input3 = screen.getByTestId('thirdAnswer');
            const testValue3 = 'Test';
            fireEvent.change(input3, { target: { value: testValue3 } });

            const input4 = screen.getByTestId('fourthAnswer');
            const testValue4 = 'Test';
            fireEvent.change(input4, { target: { value: testValue4 } });

            const wright = screen.getByTestId('wrightAnswer');
            const wrightValue = 'Test';
            fireEvent.change(wright, { target: { value: wrightValue } });

            fireEvent.click(input1);
            expect(screen.getByText(/CREATE/i)).toBeEnabled();
        });
    });

    test('A.A.C.Q button show spinner when is clicked', () => {
        renderAdminAddCapitals();

        waitFor(() => {
            const input1 = screen.getByTestId('firstAnswer');
            const testValue1 = 'Test';
            fireEvent.change(input1, { target: { value: testValue1 } });

            const input2 = screen.getByTestId('secondAnswer');
            const testValue2 = 'Test';
            fireEvent.change(input2, { target: { value: testValue2 } });


            const input3 = screen.getByTestId('thirdAnswer');
            const testValue3 = 'Test';
            fireEvent.change(input3, { target: { value: testValue3 } });

            const input4 = screen.getByTestId('fourthAnswer');
            const testValue4 = 'Test';
            fireEvent.change(input4, { target: { value: testValue4 } });

            const wright = screen.getByTestId('wrightAnswer');
            const wrightValue = 'Test';
            fireEvent.change(wright, { target: { value: wrightValue } });

            fireEvent.click(screen.getByText(/CREATE/i));
            const spinner = screen.getByText(/Create/i).firstChild;
            expect(spinner).toBeInTheDocument();
        });
    });

    test('A.A.C.Q button hide spinner when is done', () => {
        jest.spyOn(capitalsService, 'createCapitalsQuestion').mockImplementation(() =>
            Promise.resolve(fakeFlagQuestion)
        )

        renderAdminAddCapitals();

        waitFor(() => {
            const input1 = screen.getByTestId('firstAnswer');
            const testValue1 = 'Test';
            fireEvent.change(input1, { target: { value: testValue1 } });

            const input2 = screen.getByTestId('secondAnswer');
            const testValue2 = 'Test';
            fireEvent.change(input2, { target: { value: testValue2 } });


            const input3 = screen.getByTestId('thirdAnswer');
            const testValue3 = 'Test';
            fireEvent.change(input3, { target: { value: testValue3 } });

            const input4 = screen.getByTestId('fourthAnswer');
            const testValue4 = 'Test';
            fireEvent.change(input4, { target: { value: testValue4 } });

            const wright = screen.getByTestId('wrightAnswer');
            const wrightValue = 'Test';
            fireEvent.change(wright, { target: { value: wrightValue } });

            fireEvent.click(screen.getByText(/CREATE/i));
            expect(screen.getByText(/create/i)).toBeInTheDocument();
        });
    });

    test('A.A.C.Q success is show when request is done', () => {
        jest.spyOn(capitalsService, 'createCapitalsQuestion').mockImplementation(() =>
            Promise.resolve(fakeFlagQuestion)
        )

        renderAdminAddCapitals();

        waitFor(() => {
            const input1 = screen.getByTestId('firstAnswer');
            const testValue1 = 'Test';
            fireEvent.change(input1, { target: { value: testValue1 } });

            const input2 = screen.getByTestId('secondAnswer');
            const testValue2 = 'Test';
            fireEvent.change(input2, { target: { value: testValue2 } });


            const input3 = screen.getByTestId('thirdAnswer');
            const testValue3 = 'Test';
            fireEvent.change(input3, { target: { value: testValue3 } });

            const input4 = screen.getByTestId('fourthAnswer');
            const testValue4 = 'Test';
            fireEvent.change(input4, { target: { value: testValue4 } });

            const wright = screen.getByTestId('wrightAnswer');
            const wrightValue = 'Test';
            fireEvent.change(wright, { target: { value: wrightValue } });

            fireEvent.click(screen.getByText(/CREATE/i));
            expect(screen.getByTestId('success')).toBeInTheDocument();
        });
    });
});