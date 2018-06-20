import inputManager from './input';

let _config;
let _inputList = [];

function getAllInputsFromTheForm() {
    let inputs = [].slice.call(_config.form.querySelectorAll('input'));

    inputs.forEach(function (input) {
        if(input.type !== "hidden") {
            _inputList.push(inputManager(input, _config));
        }
    });
};

function attachToSubmitEvent() {
    _config.form.addEventListener('submit', submitHandler, false);
}

function submitHandler(event) {
    let validationMap = [];
    let formIsValid;

    event.preventDefault();

    validationMap = _inputList.map(function (input) {
        return input.element.validity.valid;
    });

    formIsValid = validationMap.every(function (inputValidStatus) {
        return inputValidStatus === true;
    });

    _config.onFormSubmit(formIsValid, _inputList);
}

function addNoValidateToForm() {
    _config.form.setAttribute('novalidate', true);
}

export default function formManager(config) {
    _config = config;

    addNoValidateToForm();
    getAllInputsFromTheForm()
    attachToSubmitEvent();

    return {
        form: _config.form,
        inputs: _inputList
    };
}
