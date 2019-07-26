import {
    addClass,
    removeClass,
    hasClass,
    getClosestElement
} from './DOMUtils';
import { Config } from './configManager';

export interface Input {
    element: HTMLInputElement;
    validate: () => void;
}

enum InputValidatityCssClassNames {
    Pristine = 'is-pristine',
    Dirty = 'is-dirty',
    Valid = 'is-valid',
    Invalid = 'is-invalid'
}

export function inputManager(inputElement: HTMLInputElement, formaliseConfig: Config): Input {
    function isInputValid(): boolean {
        return inputElement.validity.valid;
    }

    function inputValidityStatus(): ValidityState {
        return inputElement.validity;
    }

    function setInputValidityStatus(element: HTMLElement = inputElement): void {
        if (isInputValid()) {
            removeClass(element, InputValidatityCssClassNames.Invalid);
            addClass(element, InputValidatityCssClassNames.Valid);
        } else {
            removeClass(element, InputValidatityCssClassNames.Valid);
            addClass(element, InputValidatityCssClassNames.Invalid);
        }
    }

    function setInputAsDirty(): void {
        removeClass(inputElement, InputValidatityCssClassNames.Pristine);
        addClass(inputElement, InputValidatityCssClassNames.Dirty);
    }

    function setInputStatusClass(): void {
        addClass(inputElement, InputValidatityCssClassNames.Pristine);
    }

    function validateInputStatus(): void {
        if (hasClass(inputElement, InputValidatityCssClassNames.Pristine)) {
            setInputAsDirty();
        }

        setInputValidityStatus();

        if (formaliseConfig.inputParentSelector !== null && formaliseConfig.inputParentSelector !== '') {
            const inputRowElement = getClosestElement(inputElement, formaliseConfig.inputParentSelector);

            if (inputRowElement) {
                setInputValidityStatus(inputRowElement as HTMLElement);
            }
        }
    }

    function blurHandler(): void {
        validateInputStatus();

        formaliseConfig.onInputBlur(inputElement, isInputValid(), inputValidityStatus());
    }

    function bindInputBlurEvent(): void {
        inputElement.addEventListener('blur', blurHandler, false);
    }

    function init(): void {
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
