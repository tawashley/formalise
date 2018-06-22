import {
    addClass,
    removeClass,
    hasClass
} from './DOMUtils';

let _elemInput;
let _formConfig;

const cssClassPristine = 'is-pristine';
const cssClassDirty = 'is-dirty';
const cssClassValid = 'is-valid';
const cssClassInvalid = 'is-invalid';

function isInputRequired() {
    return _elemInput.hasAttribute('required');
}

function getInputType() {
    return _elemInput.getAttribute('type');
}

function bindInputBlurEvent() {
    _elemInput.addEventListener('blur', blurHandler, false);
}

function setInputAsDirty(elemInput) {
    if(hasClass(elemInput, cssClassPristine)) {
        removeClass(elemInput, cssClassPristine);
        addClass(elemInput, cssClassDirty);
    }
}

function setInputValidityStatus(elemInput) {
    if(hasClass(elemInput, cssClassDirty) && isInputValid(elemInput)) {
        removeClass(elemInput, cssClassInvalid);
        addClass(elemInput, cssClassValid);
    } else {
        removeClass(elemInput, cssClassValid);
        addClass(elemInput, cssClassInvalid);
    }
}

function isInputValid(elemInput) {
    return elemInput.validity.valid;
}

function inputValidityStatus(elemInput) {
    return elemInput.validity;
}

function blurHandler(event) {
    var inputElement = event.currentTarget;

    if(hasClass(inputElement, cssClassPristine)) {
        setInputAsDirty(inputElement);
    }

    setInputValidityStatus(inputElement);

    _formConfig.onInputBlur(inputElement, isInputValid(inputElement), inputValidityStatus(inputElement));
}

function setInputStatusClass() {
    addClass(_elemInput, cssClassPristine);
}

export default function inputManager(elemInput, formConfig) {
    _elemInput = elemInput;
    _formConfig = formConfig;

    setInputStatusClass();

    if(formConfig.validateOnFocusLoss === true) {
        bindInputBlurEvent();
    }

    return {
        element: elemInput
    };
}
