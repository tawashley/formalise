import { Input } from './input';

type FunctionNoop = () => void;

type OnInputBlurFunction = (
    inputElement: HTMLInputElement,
    isInputValid: boolean,
    inputValidityStatus: ValidityState
) => void;

type OnFormSubmitFunction = (
    formIsValid: boolean,
    inputList: Input[]
) => void;

export interface Config {
    readonly form: HTMLFormElement;
    readonly validateOn: {
        readonly blur: boolean;
    };
    readonly submitFormWhenValid: boolean;
    readonly onInputBlur: OnInputBlurFunction | FunctionNoop;
    readonly onFormSubmit: OnFormSubmitFunction | FunctionNoop;
    readonly inputParentSelector: string | null;
    readonly focusOnFirstInvalidInput: boolean;
}

const defaultConfig: Partial<Config> = {
    validateOn: {
        blur: true
    },
    submitFormWhenValid: false,
    onInputBlur(): void {},
    onFormSubmit(): void {},
    inputParentSelector: null,
    focusOnFirstInvalidInput: true
};

export function configManager(userConfig: Partial<Config>): Config {
    return Object.assign({}, defaultConfig, userConfig) as Config;
}
