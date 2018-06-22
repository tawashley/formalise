import {
    addClass,
    removeClass,
    hasClass
} from './DOMUtils';

export default function inputManager(elemInput, formConfig) {
    let _elemInput;
    let _formConfig;

    const cssClassPristine = 'is-pristine';
    const cssClassDirty = 'is-dirty';
    const cssClassValid = 'is-valid';
    const cssClassInvalid = 'is-invalid';

    function bindInputBlurEvent() {
        _elemInput.addEventListener('blur', blurHandler, false);
    }

    function setInputAsDirty(elemInput) {
        if (hasClass(elemInput, cssClassPristine)) {
            removeClass(elemInput, cssClassPristine);
            addClass(elemInput, cssClassDirty);
        }
    }

    function setInputValidityStatus(elemInput) {
        if (hasClass(elemInput, cssClassDirty) && isInputValid(elemInput)) {
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

        if (hasClass(inputElement, cssClassPristine)) {
            setInputAsDirty(inputElement);
        }

        setInputValidityStatus(inputElement);

        _formConfig.onInputBlur(inputElement, isInputValid(inputElement), inputValidityStatus(inputElement));
    }

    function setInputStatusClass() {
        addClass(_elemInput, cssClassPristine);
    }

    _elemInput = elemInput;
    _formConfig = formConfig;

    setInputStatusClass();

    if (formConfig.validateOnFocusLoss === true) {
        bindInputBlurEvent();
    }

    return {
        element: _elemInput
    };
}