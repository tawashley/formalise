import { formManager, Form } from './form';
import { configManager, Config } from './configManager';

const forms: Form[] = [];

interface Formalise {
    addForm(config: Config): void
}

function addForm(config: Config) {
    const completeConfig = configManager(config);

    forms.push(formManager(completeConfig));
}

export default {
    addForm,
} as Formalise;
