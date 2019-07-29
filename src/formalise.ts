import { formManager, Form } from './form';
import { configManager, Config } from './configManager';

const forms: Form[] = [];

interface Formalise {
    addForm(config: Config): void;
}

function addForm(config: Partial<Config>): void {
    const fullConfig = configManager(config);

    if (fullConfig.form) {
        forms.push(formManager(fullConfig));
    }
}

const formalise: Formalise = {
    addForm
};

export default formalise;
