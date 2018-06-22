let defaultConfig = Object.freeze({
    form: null,
    validateOnFocusLoss: true,
    submitFormWhenValid: true,
    onInputBlur: function() {},
    onFormSubmit: function() {}
});

export default function configManager(config) {
    return Object.assign({}, defaultConfig, config);
}