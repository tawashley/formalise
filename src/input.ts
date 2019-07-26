import {
    addClass,
    removeClass,
    hasClass,
    getClosestElement
} from './DOMUtils';
import { Config } from './configManager';

export interface Input {
    element: HTMLInputElement,
    validate: () => void
}

enum InputValidatityCssClassNames {
    Pristine = 'is-pristine',
    Dirty = 'is-dirty',
    Valid = 'is-valid',
    Invalid = 'is-invalid'
}

export function inputManager(inputElement: HTMLInputElement, formaliseConfig: Config): Input {
    function isInputValid() {
        return inputElement.validity.valid;
    }

    function inputValidityStatus() {
        return inputElement.validity;
    }

    function setInputValidityStatus(element: HTMLElement = inputElement) {
        if (isInputValid()) {
            removeClass(element, InputValidatityCssClassNames.Invalid);
            addClass(element, InputValidatityCssClassNames.Valid);
        } else {
            removeClass(element, InputValidatityCssClassNames.Valid);
            addClass(element, InputValidatityCssClassNames.Invalid);
        }
    }

    function setInputAsDirty() {
        removeClass(inputElement, InputValidatityCssClassNames.Pristine);
        addClass(inputElement, InputValidatityCssClassNames.Dirty);
    }

    function setInputStatusClass() {
        addClass(inputElement, InputValidatityCssClassNames.Pristine);
    }

    function validateInputStatus() {
        if (hasClass(inputElement, InputValidatityCssClassNames.Pristine)) {
            setInputAsDirty();
        }

        setInputValidityStatus();

        if (formaliseConfig.inputParentSelector !== null && formaliseConfig.inputParentSelector !== '') {
            const inputRowElement = getClosestElement(inputElement, formaliseConfig.inputParentSelector);

            if(inputRowElement) {
                setInputValidityStatus(inputRowElement as HTMLElement);
            }
        }
    }

    function blurHandler() {
        validateInputStatus();

        formaliseConfig.onInputBlur(inputElement, isInputValid(), inputValidityStatus());
    }

    function bindInputBlurEvent() {
        inputElement.addEventListener('blur', blurHandler, false);
    }

    function init() {
        setInputStatusClass();

        if (formaliseConfig.validateOn.blur) {
            bindInputBlurEvent();
        }
    }

    init();

    return {
        element: inputElement,
        validate: validateInputStatus
    };
}
