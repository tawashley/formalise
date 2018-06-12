let _elemInput;
let _formConfig;

function isInputRequired() {
    return _elemInput.hasAttribute('required');
}

function getInputType() {
    return _elemInput.getAttribute('type');
}

function bindInputBlurEvent() {
    _elemInput.addEventListener('blur', blurHandler, false);
}

function blurHandler(event) {
    var inputElement = event.target;
    var validityStatus = inputElement.validity;
    var inputIsValid = validityStatus.valid;

    _formConfig.onInputBlur(inputElement, inputIsValid, validityStatus);
}

export default function inputManager(elemInput, formConfig) {
    _elemInput = elemInput;
    _formConfig = formConfig;

    if(formConfig.validateOnFocusLoss === true) {
        bindInputBlurEvent();
    }

    return {
        element: elemInput,
        type: getInputType(),
        isRequired: isInputRequired()
    };
}
