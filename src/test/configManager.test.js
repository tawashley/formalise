import configManager from 'configManager';

describe('configManager', () => {
    test('exports a function', () => {
        expect(typeof configManager).toBe('function');
    });

    test('returns an object, merging the default object with the provided object', () => {
        const config = configManager({
            form: '.form',
            inputParentSelector: '.element',
            focusOnFirstInvalidInput: false
        });

        expect(config.form).toBe('.form');
        expect(config.inputParentSelector).toBe('.element');
        expect(config.focusOnFirstInvalidInput).toBe(false);
        expect(config.validateOn.blur).toBe(true);
        expect(config.submitFormWhenValid).toBe(false);
        expect(typeof config.onInputBlur).toBe('function');
        expect(typeof config.onFormSubmit).toBe('function');
    });

    test('returns a frozen object', () => {
        const config = configManager({});

        expect(Object.isFrozen(config)).toBe(true);
    })
});
