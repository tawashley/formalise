import { Config } from './configManager';
import { inputManager, Input } from './input';

export interface Form {
    form: HTMLFormElement;
    inputs: Input[];
}

export function formManager(config: Config): Form {
    const inputList: Input[] = [];

    function getAllInputsFromTheForm(): void {
        const inputs: HTMLInputElement[] = [].slice.call(config.form.querySelectorAll('input'));

        inputs.forEach((input): void => {
            if (input.type !== 'hidden') {
                inputList.push(inputManager(input, config));
            }
        });
    }

    function focusOnFirstInvalidInput(): void {
        const firstInvalidInput = inputList.find((input): boolean => input.element.validity.valid === false);

        if (firstInvalidInput !== undefined) {
            firstInvalidInput.element.focus();
        }
    }

    function submitHandler(event: Event): void {
        let validationMap: boolean[] = [];
        let formIsValid = false;

        event.preventDefault();

        validationMap = inputList.map((input): boolean => {
            return input.element.validity.valid;
        });

        formIsValid = validationMap.every((inputValidStatus): boolean => {
            return inputValidStatus === true;
        });

        inputList.forEach((input): void => input.validate());

        if (config.focusOnFirstInvalidInput) {
            focusOnFirstInvalidInput();
        }

        config.onFormSubmit(formIsValid, inputList);

        if (formIsValid && config.submitFormWhenValid) {
            config.form.submit();
        }
    }

    function attachToSubmitEvent(): void {
        config.form.addEventListener('submit', submitHandler, false);
    }

    function addNoValidateToForm(): void {
        config.form.setAttribute('novalidate', 'true');
    }

    function init(): void {
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
