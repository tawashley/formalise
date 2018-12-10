const defaultConfig = Object.freeze({
    form: null,
    validateOn: {
        blur: true
    },
    submitFormWhenValid: false,
    onInputBlur() {},
    onFormSubmit() {},
    inputParentSelector: null,
    focusOnFirstInvalidInput: true
});

export default function configManager(config) {
    return Object.freeze(Object.assign({}, defaultConfig, config));
}
