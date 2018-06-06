import formManager from './form';

let forms = [];

let defaultConfig = {
    form: null,
    validateOnFocusLoss: false,
    fieldValidateHandler: function() {}
}

function addForm(config) {
    config = Object.assign(defaultConfig, config);

    forms.push(formManager(config));
}

function getForms() {
    console.log('forms', forms);
    return forms;
}

window.formValidator = {
    addForm,
    getForms
}
