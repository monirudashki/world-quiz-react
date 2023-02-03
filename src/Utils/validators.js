export const minLength = (e, min, setter, formValues) => {
    setter(state => ({
        ...state,
        [e.target.name]: formValues[e.target.name].length < min
    }))
}

export const emailValidator = (e, setter, formValues) => {
    const pattern = /^.{3,}@gmail\.(bg|com)$/;

    setter(state => ({
        ...state,
        [e.target.name]: !pattern.test(formValues[e.target.name])
    }))
}

export const imageUrlValidator = (e, setter, formValues) => {
    setter(state => ({
        ...state,
        [e.target.name]: !formValues.imageUrl.startsWith('http') || !formValues.imageUrl.startsWith('https')
    }))
}

export const passwordsMatch = (e, setter, formValues) => {
    setter(state => ({
        ...state,
        [e.target.name]: !(formValues.password === formValues.rePass)
    }))
}

