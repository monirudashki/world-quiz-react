import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as capitalsService from '../../../../Services/capitalsService';
import { fakeFlagQuestion } from "../../../../testUtils/mockFlagsQuestion";
import AdminEditCapitalQuestion from "../AdminEditCapitalQuestion";


function renderEditCapitalsQuestion() {
    render(
        <MemoryRouter>
            <AdminEditCapitalQuestion />
        </MemoryRouter>
    )
}

describe('Admin Edit capitals question tests suit', () => {

    beforeEach(() => {
        jest.spyOn(capitalsService, 'getCapitalsQuestionById').mockImplementation(() =>
            Promise.resolve(fakeFlagQuestion)
        )
    })

    afterEach(cleanup);

    test('A.E.C.Q - error message not show', async () => {
        renderEditCapitalsQuestion();

        expect(await screen.findByTestId('requestError')).toHaveTextContent('');
    });

    test('A.E.C.Q - h2 is rendered', async () => {
        renderEditCapitalsQuestion();

        expect(await screen.findByText(/Edit Capitals Question/i)).toBeInTheDocument();
    });

    //title

    test('A.E.C.Q title input render without value', async () => {
        renderEditCapitalsQuestion();

        const input = await screen.findByTestId('title');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe(fakeFlagQuestion.title.toString());
    });

    test('A.E.C.Q title correct change', async () => {
        renderEditCapitalsQuestion();

        waitFor(() => {
            const input = screen.getByTestId('title');
            const testValue = 'TestForTitle';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.E.C.Q title with incorrect data , error message show', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q title with correct data , error message hide', async () => {
        renderEditCapitalsQuestion();

        waitFor(() => {
            const input = screen.getByTestId('title');
            const testValue = 'Bulgaria';

            fireEvent.change(input, { target: { value: testValue } });
            waitFor(() => {
                fireEvent.click(screen.getByTestId('firstAnswer'));
                expect(screen.getByText(/Title is required and needs to starts with capital letter!/i)).toBeNull();
            })
        });
    });

    //firstAnswer

    test('A.E.C.Q firstAnswer input render without value', async () => {
        renderEditCapitalsQuestion();

        const input = await screen.findByTestId('firstAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe(fakeFlagQuestion.firstAnswer.toString());
    });

    test('A.E.C.Q firstAnswer correct change', async () => {
        renderEditCapitalsQuestion();

        waitFor(() => {
            const input = screen.getByTestId('firstAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.E.C.Q firstAnswer with incorrect data , error message show', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q firstAnswer with correct data , error message hide', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q secondAnswer input render without value', async () => {
        renderEditCapitalsQuestion();

        const input = await screen.findByTestId('secondAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe(fakeFlagQuestion.secondAnswer.toString());
    });

    test('A.E.C.Q secondAnswer correct change', async () => {
        renderEditCapitalsQuestion();

        waitFor(() => {
            const input = screen.getByTestId('secondAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.E.C.Q secondAnswer with incorrect data , error message show', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q secondAnswer with correct data , error message hide', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q thirdAnswer input render without value', async () => {
        renderEditCapitalsQuestion();

        const input = await screen.findByTestId('thirdAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe(fakeFlagQuestion.thirdAnswer.toString());
    });

    test('A.E.C.Q thirdAnswer correct change', async () => {
        renderEditCapitalsQuestion();

        waitFor(() => {
            const input = screen.getByTestId('thirdAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.E.C.Q thirdAnswer with incorrect data , error message show', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q thirdAnswer with correct data , error message hide', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q fourthAnswer input render without value', async () => {
        renderEditCapitalsQuestion();

        const input = await screen.findByTestId('fourthAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe(fakeFlagQuestion.fourthAnswer.toString());
    });

    test('A.E.C.Q fourthAnswer correct change', async () => {
        renderEditCapitalsQuestion();

        waitFor(() => {
            const input = screen.getByTestId('fourthAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.E.C.Q fourthAnswer with incorrect data , error message show', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q fourthAnswer with correct data , error message hide', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q wrightAnswer input render without value', async () => {
        renderEditCapitalsQuestion();

        const input = await screen.findByTestId('wrightAnswer');
        expect(input).toBeInTheDocument();
        expect(input.value).toBe(fakeFlagQuestion.wrightAnswer.toString());
    });

    test('A.E.C.Q wrightAnswer correct change', async () => {
        renderEditCapitalsQuestion();

        waitFor(() => {
            const input = screen.getByTestId('wrightAnswer');
            const testValue = 'Test';

            fireEvent.change(input, { target: { value: testValue } });

            expect(input.value).toBe(testValue);
        })
    });

    test('A.E.C.Q wrightAnswer with incorrect data , error message show', async () => {
        renderEditCapitalsQuestion();

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

    test('A.E.C.Q wrightAnswer with correct data , error message hide', async () => {
        renderEditCapitalsQuestion();

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

    //button Cancel

    test('A.E.C.Q button cancel is rendered', async () => {
        renderEditCapitalsQuestion();

        expect(await screen.findByText(/cancel/i)).toBeInTheDocument();
    });

    test('A.E.C.Q button edit is rendered', async () => {
        renderEditCapitalsQuestion();

        expect(await screen.findByText('EDIT')).toBeInTheDocument();
    });

    test('A.E.C.Q button edit is enabled', async () => {
        renderEditCapitalsQuestion();

        expect(await screen.findByText('EDIT')).toBeEnabled();
    });

    test('A.E.C.Q button is disabled with incorrect data', () => {
        renderEditCapitalsQuestion();

        waitFor(() => {
            const input1 = screen.getByTestId('firstAnswer');
            const testValue1 = 'test';
            fireEvent.change(input1, { target: { value: testValue1 } });

            fireEvent.click(screen.getByTestId('title'));

            expect(screen.getByText('EDIT')).toBeDisabled();
        });
    });

    test('A.E.C.Q button show spinner when is clicked', () => {
        renderEditCapitalsQuestion();

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

            fireEvent.click(screen.getByText('EDIT'));
            const spinner = screen.getByText('EDIT').firstChild;
            expect(spinner).toBeInTheDocument();
        });
    });
});