/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configManager } from '../configManager';

describe('configManager', () => {
    test('exports a function', () => {
        expect(typeof configManager).toBe('function');
    });

    test('returns an object, merging the default object with the provided object', () => {
        const config = configManager({
            form: {} as HTMLFormElement,
            submitFormWhenValid: false,
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

    test('returns an object when all properties are set', () => {
        // const onSubmit = jest.fn();
        // const onInputBlur = jest.fn();

        const config = configManager({
            form: {} as HTMLFormElement,
            submitFormWhenValid: true,
            focusOnFirstInvalidInput: false,
            inputParentSelector: '.foo-bar',
            onFormSubmit: () => {},
            onInputBlur: () => {},
            validateOn: {
                blur: false
            }
        });

        expect(config.form).toStrictEqual({});
        expect(config.submitFormWhenValid).toBe(true);
        expect(config.focusOnFirstInvalidInput).toBe(false);
        expect(config.inputParentSelector).toBe('.foo-bar');
        // expect(onSubmit.mock.calls.length).toBe(1);
        // expect(onInputBlur.mock.calls.length).toBe(1);
        expect(config.validateOn.blur).toBe(false);
    });
});
