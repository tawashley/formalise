let defaultConfig = Object.freeze({
    form: null,
    validateOn: {
        blur: true
    },
    submitFormWhenValid: false,
    onInputBlur: function() {},
    onFormSubmit: function() {},
    inputParentSelector: null,
    focusOnFirstInvalidInput: true
});

export default function configManager(config) {
    return Object.freeze(Object.assign({}, defaultConfig, config));
}
