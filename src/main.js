import './polyfill.objectAssign';
import './polyfill.validityState';

import formManager from './form';

let forms = [];

let defaultConfig = {
    form: null,
    validateOnFocusLoss: true,
    submitFormWhenValid: true,
    onInputBlur: function() {},
    onFormSubmit: function() {}
}

function addForm(config) {
    config = Object.assign(defaultConfig, config);

    forms.push(formManager(config));
}

window.formValidator = {
    addForm
}
