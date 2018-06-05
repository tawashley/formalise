let _elemInput;

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
    var inputIsValid = event.target.validity.valid;

    if(inputIsValid === true) {
        console.log('input is valid!')
    } else {
        console.log('input is invalid, show error message');
    }
}

export default function inputManager(elemInput, formConfig) {
    _elemInput = elemInput;

    if(formConfig.validateOnFocusLoss === true) {
        bindInputBlurEvent();
    }

    return {
        element: elemInput,
        type: getInputType(),
        isRequired: isInputRequired()
    };
}