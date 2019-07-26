import { formManager, Form } from './form';
import { configManager, Config } from './configManager';

const forms: Form[] = [];

interface Formalise {
    addForm(config: Config): void;
}

function addForm(config: Partial<Config>): void {
    const completeConfig = configManager(config as Config);

    if (completeConfig.form) {
        forms.push(formManager(completeConfig));
    }
}

const formalise: Formalise = {
    addForm
};

export default formalise;
