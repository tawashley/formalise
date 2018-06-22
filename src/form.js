import inputManager from './input';

export default function formManager(config) {
    let inputList = [];

    function getAllInputsFromTheForm() {
        let inputs = [].slice.call(config.form.querySelectorAll('input'));

        inputs.forEach(function (input) {
            if (input.type !== "hidden") {
                inputList.push(inputManager(input, config));
            }
        });
    };

    function attachToSubmitEvent() {
        config.form.addEventListener('submit', submitHandler, false);
    }

    function submitHandler(event) {
        let validationMap = [];
        let formIsValid;

        event.preventDefault();

        validationMap = inputList.map(function (input) {
            return input.element.validity.valid;
        });

        formIsValid = validationMap.every(function (inputValidStatus) {
            return inputValidStatus === true;
        });

        inputList.forEach((input) => input.validateInputStatus());

        config.onFormSubmit(formIsValid, inputList);

        if (formIsValid && config.submitFormWhenValid) {
            config.form.submit();
        }
    }

    function addNoValidateToForm() {
        config.form.setAttribute('novalidate', true);
    }

    function init() {
        addNoValidateToForm();
        getAllInputsFromTheForm()
        attachToSubmitEvent();
    }

    init();

    return {
        form: config.form,
        inputs: inputList
    };
}