import {
    addClass,
    removeClass,
    hasClass
} from './DOMUtils';

export default function inputManager(inputElement, formConfig) {
    const cssClassPristine = 'is-pristine';
    const cssClassDirty = 'is-dirty';
    const cssClassValid = 'is-valid';
    const cssClassInvalid = 'is-invalid';

    function bindInputBlurEvent() {
        inputElement.addEventListener('blur', blurHandler, false);
    }

    function setInputAsDirty() {
        removeClass(inputElement, cssClassPristine);
        addClass(inputElement, cssClassDirty);
    }

    function setInputValidityStatus() {
        if (hasClass(inputElement, cssClassDirty) && isInputValid()) {
            removeClass(inputElement, cssClassInvalid);
            addClass(inputElement, cssClassValid);
        } else {
            removeClass(inputElement, cssClassValid);
            addClass(inputElement, cssClassInvalid);
        }
    }

    function isInputValid() {
        return inputElement.validity.valid;
    }

    function inputValidityStatus() {
        return inputElement.validity;
    }

    function blurHandler() {
        validateInputStatus();

        formConfig.onInputBlur(inputElement, isInputValid(inputElement), inputValidityStatus(inputElement));
    }

    function validateInputStatus() {
        if (hasClass(inputElement, cssClassPristine)) {
            setInputAsDirty(inputElement);
        }

        setInputValidityStatus(inputElement);
    }

    function setInputStatusClass() {
        addClass(inputElement, cssClassPristine);
    }

    function init() {
        setInputStatusClass();

        if (formConfig.validateOnFocusLoss === true) {
            bindInputBlurEvent();
        }
    }

    init();

    return {
        element: inputElement,
        validateInputStatus,
    };
}