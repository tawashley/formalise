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

    function handleInputValidationMessage() {
        console.log('hits handleInputValidationMessage()');
        console.log('will need to have the CSS selector for the parent of the label, so can grab the label it and insert the validation message next to the input');
        console.log('validation message config would be better as an object');

        var fauxConfigObject = {
            inputParentSelector: '.input-row',

        };

        if (isInputValid()) {
            console.log('> input is valid');
            console.log('');
            console.log('  - clear input validation message');
        } else {
            console.log('> input is invalid');
            console.log('');
            console.log('  - get input validation message based on validity status');
            console.log('  - get input label text ');
            console.log('  - set validation message');
        }
    }

    function validateInputStatus() {
        if (hasClass(inputElement, cssClassPristine)) {
            setInputAsDirty();
        }

        setInputValidityStatus();

        // if(formConfig.showValidationMessages) {
        //     handleInputValidationMessage();
        // }

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

        if (formConfig.validateOn.blur) {
            bindInputBlurEvent();
        }
    }

    init();

    return {
        element: inputElement,
        validate: validateInputStatus,
    };
}
