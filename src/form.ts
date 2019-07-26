import { Config } from './configManager'
import { inputManager, Input } from './input';

export interface Form {
    form: HTMLFormElement,
    inputs: Input[]
}

export function formManager(config: Config): Form {
    let inputList: Input[] = [];

    function getAllInputsFromTheForm() {
        const inputs: HTMLInputElement[] = [].slice.call(config.form.querySelectorAll('input'));

        inputs.forEach((input) => {
            if (input.type !== 'hidden') {
                inputList.push(inputManager(input, config));
            }
        });
    }

    function focusOnFirstInvalidInput() {
        const firstInvalidInput = inputList.find((input) => input.element.validity.valid === false);

        if (firstInvalidInput !== undefined) {
            firstInvalidInput.element.focus();
        }
    }

    function submitHandler(event: Event) {
        let validationMap = [];
        let formIsValid = false;

        event.preventDefault();

        validationMap = inputList.map((input) => {
            return input.element.validity.valid;
        });

        formIsValid = validationMap.every((inputValidStatus) => {
            return inputValidStatus === true;
        });

        inputList.forEach((input) => input.validate());

        if (config.focusOnFirstInvalidInput) {
            focusOnFirstInvalidInput();
        }

        config.onFormSubmit(formIsValid, inputList);

        if (formIsValid && config.submitFormWhenValid) {
            config.form.submit();
        }
    }

    function attachToSubmitEvent() {
        config.form.addEventListener('submit', submitHandler, false);
    }

    function addNoValidateToForm() {
        config.form.setAttribute('novalidate', 'true');
    }

    function init() {
        addNoValidateToForm();
        getAllInputsFromTheForm();
        attachToSubmitEvent();
    }

    init();

    return {
        form: config.form,
        inputs: inputList
    };
}
