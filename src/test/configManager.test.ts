/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configManager } from '../configManager';

describe('configManager', () => {
    test('exports a function', () => {
        expect(typeof configManager).toBe('function');
    });

    test('returns an object, merging the default object with the provided object', () => {
        const config = configManager({
            form: {} as HTMLFormElement,
            validateOn: {
                blur: true
            },
            submitFormWhenValid: false,
            onInputBlur(): void {},
            onFormSubmit(): void {},
            inputParentSelector: null,
            focusOnFirstInvalidInput: true
        });

        expect(config.form).toStrictEqual({});
        expect(config.inputParentSelector).toBe(null);
        expect(config.focusOnFirstInvalidInput).toBe(true);
        expect(config.validateOn.blur).toBe(true);
        expect(config.submitFormWhenValid).toBe(false);
        expect(typeof config.onInputBlur).toBe('function');
        expect(typeof config.onFormSubmit).toBe('function');
    });
});
