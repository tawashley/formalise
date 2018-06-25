let defaultConfig = Object.freeze({
    form: null,
    validateOn: {
        blur: true,
        change: false
    },
    submitFormWhenValid: false,
    onInputBlur: function() {},
    onFormSubmit: function() {},
    inputParentSelector: null
});

export default function configManager(config) {
    return Object.assign({}, defaultConfig, config);
}
