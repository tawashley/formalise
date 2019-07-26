/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inputManager } from '../input';

function createInputElement(required = false) {
    const input = document.createElement('input');

    input.type = 'text';

    if (required) {
        input.required = true;
    }

    return input;
}

function getDefaultConfigObject() {
    return {
        form: {} as HTMLFormElement,
        validateOn: {
            blur: true
        },
        submitFormWhenValid: false,
        onInputBlur() {},
        onFormSubmit() {},
        inputParentSelector: null,
        focusOnFirstInvalidInput: true
    };
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

        describe('and validate.blur config is set to true', () => {
            let mockFunction: any;
            let inputInstance: any;

            beforeEach(() => {
                mockFunction = jest.fn();

                inputInstance = inputManager(createInputElement(), getConfigObject({
                    validateOn: {
                        blur: true
                    },
                    onInputBlur: mockFunction
                }));
            });

            test('the "blur" function handler is correctly called', () => {
                inputInstance.element.focus();
                inputInstance.element.blur();

                expect(mockFunction.mock.calls.length).toBe(1);
            });

            test('the correct validiation classes are added to the input element', () => {
                inputInstance.element.focus();
                inputInstance.element.blur();

                expect(inputInstance.element.classList.contains('is-dirty')).toBe(true);
                expect(inputInstance.element.classList.contains('is-valid')).toBe(true);
            });
        });

        describe('and the input is validated', () => {
            test('the correct validation classes are add to the element when', () => {
                const inputInstanceRequired = inputManager(createInputElement(true), getConfigObject());

                expect(inputInstanceRequired.element.classList.contains('is-pristine')).toBe(true);
                expect(inputInstanceRequired.element.classList.contains('is-dirty')).toBe(false);

                inputInstanceRequired.validate();

                expect(inputInstanceRequired.element.classList.contains('is-dirty')).toBe(true);
                expect(inputInstanceRequired.element.classList.contains('is-invalid')).toBe(true);
                expect(inputInstanceRequired.element.classList.contains('is-valid')).toBe(false);

                inputInstanceRequired.element.value = 'input value';
                inputInstanceRequired.validate();

                expect(inputInstanceRequired.element.classList.contains('is-dirty')).toBe(true);
                expect(inputInstanceRequired.element.classList.contains('is-valid')).toBe(true);
                expect(inputInstanceRequired.element.classList.contains('is-invalid')).toBe(false);

                inputInstanceRequired.element.value = '';
                inputInstanceRequired.validate();

                expect(inputInstanceRequired.element.classList.contains('is-dirty')).toBe(true);
                expect(inputInstanceRequired.element.classList.contains('is-invalid')).toBe(true);
                expect(inputInstanceRequired.element.classList.contains('is-valid')).toBe(false);
            });

            describe('and the inputParentSelector config is correctly set', () => {
                test('the correct validation classes are added to the parent element', () => {
                    const inputElement = createInputElement(true);
                    const inputParent = document.createElement('section');

                    inputParent.classList.add('input-parent');

                    inputParent.appendChild(inputElement);

                    const inputInstanceRequired = inputManager(inputElement, getConfigObject({
                        inputParentSelector: '.input-parent'
                    }));

                    expect(inputElement.classList.contains('is-pristine')).toBe(true);
                    expect(inputElement.classList.contains('is-dirty')).toBe(false);

                    inputInstanceRequired.validate();

                    expect(inputElement.classList.contains('is-dirty')).toBe(true);
                    expect(inputElement.classList.contains('is-invalid')).toBe(true);
                    expect(inputParent.classList.contains('is-invalid')).toBe(true);
                    expect(inputParent.classList.contains('is-valid')).toBe(false);

                    inputElement.value = 'input value';
                    inputInstanceRequired.validate();

                    expect(inputElement.classList.contains('is-dirty')).toBe(true);
                    expect(inputElement.classList.contains('is-valid')).toBe(true);
                    expect(inputElement.classList.contains('is-invalid')).toBe(false);
                    expect(inputParent.classList.contains('is-valid')).toBe(true);
                    expect(inputParent.classList.contains('is-invalid')).toBe(false);

                    inputElement.value = '';
                    inputInstanceRequired.validate();

                    expect(inputElement.classList.contains('is-dirty')).toBe(true);
                    expect(inputElement.classList.contains('is-invalid')).toBe(true);
                    expect(inputElement.classList.contains('is-valid')).toBe(false);
                    expect(inputParent.classList.contains('is-invalid')).toBe(true);
                    expect(inputParent.classList.contains('is-valid')).toBe(false);
                });
            });
        });
    });
});
