export const minLength = (e, min, setter, formValues) => {
    setter(state => ({
        ...state,
        [e.target.name]: formValues[e.target.name].length < min
    }));

    if (formValues[e.target.name].length < min) {
        e.target.style['border-left'] = '5px solid red';
    } else {
        e.target.style['border-left'] = '5px solid green';
    }
}

export const emailValidator = (e, setter, formValues) => {
    const pattern = /^.{3,}@gmail\.(bg|com)$/;

    setter(state => ({
        ...state,
        [e.target.name]: !pattern.test(formValues[e.target.name])
    }));

    if (!pattern.test(formValues[e.target.name])) {
        e.target.style['border-left'] = '5px solid red';
    } else {
        e.target.style['border-left'] = '5px solid green';
    }
}

export const imageUrlValidator = (e, setter, formValues) => {
    setter(state => ({
        ...state,
        [e.target.name]: !formValues.imageUrl.startsWith('http') || !formValues.imageUrl.startsWith('https')
    }));

    if (!formValues.imageUrl.startsWith('http') || !formValues.imageUrl.startsWith('https')) {
        e.target.style['border-left'] = '5px solid red';
    } else {
        e.target.style['border-left'] = '5px solid green';
    }
}

export const passwordsMatch = (e, setter, formValues) => {
    setter(state => ({
        ...state,
        [e.target.name]: !(formValues.password === formValues.rePass)
    }));

    if (!(formValues.password === formValues.rePass)) {
        e.target.style['border-left'] = '5px solid red';
    } else {
        e.target.style['border-left'] = '5px solid green';
    }
}

export const firstCapitalLetter = (e, setter, formValues) => {
    setter(state => ({
        ...state,
        [e.target.name]: formValues[e.target.name] === '' || formValues[e.target.name][0] === formValues[e.target.name][0].toLowerCase()
    }))

    if (formValues[e.target.name] === '' || formValues[e.target.name][0] === formValues[e.target.name][0].toLowerCase()) {
        e.target.style['border-left'] = '5px solid red';
    } else {
        e.target.style['border-left'] = '5px solid green';
    }
}

export const wrightAnswerExist = (e, setter, formValues) => {
    firstCapitalLetter(e, setter, formValues);
    setter(state => ({
        ...state,
        [e.target.name]: ![formValues.firstAnswer, formValues.secondAnswer, formValues.thirdAnswer, formValues.fourthAnswer].includes(formValues.wrightAnswer)
    }));

    if (
        ![formValues.firstAnswer,
        formValues.secondAnswer,
        formValues.thirdAnswer,
        formValues.fourthAnswer]
            .includes(formValues.wrightAnswer)) {
        e.target.style['border-left'] = '5px solid red';
    } else {
        e.target.style['border-left'] = '5px solid green';
    }
}
