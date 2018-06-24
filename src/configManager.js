let defaultConfig = Object.freeze({
    form: null,
    validateOnFocusLoss: true,
    submitFormWhenValid: false,
    onInputBlur: function() {},
    onFormSubmit: function() {},
    inputParentSelector: null
});

export default function configManager(config) {
    return Object.assign({}, defaultConfig, config);
}