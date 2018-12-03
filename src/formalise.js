import formManager from './form';
import configManager from './configManager';

let forms = [];

function addForm(config) {
    config = configManager(config);

    forms.push(formManager(config));
}

export default {
    addForm
}
