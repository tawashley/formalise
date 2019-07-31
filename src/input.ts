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

type validityCssClassNames = 'is-pristine' | 'is-dirty' | 'is-valid' | 'is-invalid';

const cssClassPristine: validityCssClassNames = 'is-pristine';
const cssClassDirty: validityCssClassNames = 'is-dirty';
const cssClassValid: validityCssClassNames = 'is-valid';
const cssClassInvalid: validityCssClassNames = 'is-invalid';

export function inputManager(inputElement: HTMLInputElement, formaliseConfig: Config): Input {
    function isInputValid(): boolean {
        return inputElement.validity.valid;
    }

    function inputValidityStatus(): ValidityState {
        return inputElement.validity;
    }

    function setInputValidityStatus(element: HTMLElement = inputElement): void {
        if (isInputValid()) {
            removeClass(element, cssClassInvalid);
            addClass(element, cssClassValid);
        } else {
            removeClass(element, cssClassValid);
            addClass(element, cssClassInvalid);
        }
    }

    function setInputAsDirty(): void {
        removeClass(inputElement, cssClassPristine);
        addClass(inputElement, cssClassDirty);
    }

    function setInputStatusClass(): void {
        addClass(inputElement, cssClassPristine);
    }

    function validateInputStatus(): void {
        if (hasClass(inputElement, cssClassPristine)) {
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
