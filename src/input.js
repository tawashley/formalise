import {
    addClass,
    removeClass,
    hasClass,
    getClosestElement
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

    function setInputValidityStatus(element = inputElement) {
        if (isInputValid()) {
            removeClass(element, cssClassInvalid);
            addClass(element, cssClassValid);
        } else {
            removeClass(element, cssClassValid);
            addClass(element, cssClassInvalid);
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
            setInputAsDirty();
        }

        setInputValidityStatus();

        if(formConfig.inputParentSelector !== null && formConfig.inputParentSelector !== '') {
            var inputRowElement = getClosestElement(inputElement, formConfig.inputParentSelector);

            setInputValidityStatus(inputRowElement);
        }
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
        validate: validateInputStatus,
    };
}