import inputManager from './input';

export default function formManager(config) {
    const inputList = [];

    function getAllInputsFromTheForm() {
        const inputs = [].slice.call(config.form.querySelectorAll('input'));

        inputs.forEach((input) => {
            if (input.type !== 'hidden') {
                inputList.push(inputManager(input, config));
            }
        });
    }

    function focusOnFirstInvalidInput() {
        const firstInvalidInput = inputList.find((input) => input.element.validity.valid === false);

        firstInvalidInput.element.focus();
    }

    function submitHandler(event) {
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
        config.form.setAttribute('novalidate', true);
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
