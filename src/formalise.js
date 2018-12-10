import formManager from './form';
import configManager from './configManager';

const forms = [];

function addForm(config) {
    const completeConfig = configManager(config);

    forms.push(formManager(completeConfig));
}

export default {
    addForm
};
