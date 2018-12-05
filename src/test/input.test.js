import inputManager from 'input';

function createInputElement() {
    const input = document.createElement('input');

    input.type = 'text';

    return input;
}

function getDefaultConfigObject() {
    return {
        form: null,
        validateOn: {
            blur: true
        },
        submitFormWhenValid: false,
        onInputBlur: function() {},
        onFormSubmit: function() {},
        inputParentSelector: null,
        focusOnFirstInvalidInput: true
    }
}

function getConfigObject(config = {}) {
    return Object.assign({}, getDefaultConfigObject(), config);
}

describe('inputManager', () => {
    test('exports a function', () => {
        expect(typeof inputManager).toBe('function');
    });

    describe('When creating an instance of an input', () => {
        test('returns the public api object', () => {
            const inputInstance = inputManager(createInputElement(), getConfigObject());

            expect(inputInstance.element).not.toBeNull();
            expect(inputInstance.validate).not.toBeNull();
        });

        test('returns a HTMLInputElement', () => {
            const inputInstance = inputManager(createInputElement(), getConfigObject());

            expect(inputInstance.element instanceof HTMLInputElement).toBe(true);
        });

        test('add the class "is-pristine" to the element after creation', () => {
            const inputInstance = inputManager(createInputElement(), getConfigObject());

            expect(inputInstance.element.classList.contains('is-pristine')).toBe(true);
        });

        test('calls the provided "blur" handler if validateOn.blur is set to true', () => {
            const mockFunction = jest.fn();

            const inputInstance = inputManager(createInputElement(), getConfigObject({
                validateOn: {
                    blur: true
                },
                onInputBlur: mockFunction
            }));

            inputInstance.element.focus();
            inputInstance.element.blur();

            expect(mockFunction.mock.calls.length).toBe(1);
        })
    })
});
