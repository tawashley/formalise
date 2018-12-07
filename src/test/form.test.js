import formManager from 'form';

function createInputElement({ inputType, required = false, inputId = null }) {
    const input = document.createElement('input');

    input.type = inputType

    if(inputId !== null) {
        input.id = inputId;
    }

    if(required) {
        input.required = true;
    }

    return input;
}

function getFormElementWithMulipleInput() {
    const form = document.createElement('form');

    form.classList.add('test-form');

    form.appendChild(createInputElement({ inputType: 'text', inputId: 'text' }));
    form.appendChild(createInputElement({ inputType: 'text', inputId: 'text-required', required: true }));
    form.appendChild(createInputElement({ inputType: 'hidden', inputId: 'hidden' }));
    form.appendChild(createInputElement({ inputType: 'email', inputId: 'email-required', required: true }));
    form.appendChild(createInputElement({ inputType: 'number', inputId: 'number' }));

    return form;
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

describe('form manager', () => {
    test('exports a function ', () => {
        expect(typeof formManager).toBe('function');
    });

    describe('When creating an instance of a form manager', () => {
        const formElement = getFormElementWithMulipleInput();

        test('exposes the form element', () => {
            const formManagerInstance = formManager(getConfigObject({
                form: formElement
            }));

            expect(formManagerInstance.form instanceof HTMLFormElement).toBe(true);
            expect(formManagerInstance.form.isSameNode(formElement)).toBe(true);
        });

        test('adds the "novalidate" attribute to the form', () => {
            const formManagerInstance = formManager(getConfigObject({
                form: formElement
            }));

            expect(formElement.getAttribute('novalidate')).not.toBeNull;
            expect(formElement.getAttribute('novalidate')).toBe('true');
        });

        test('correctlys select all inputs that are not type "hidden" from the form', () => {
            const formManagerInstance = formManager(getConfigObject({
                form: formElement
            }));

            expect(formManagerInstance.inputs.length).toBe(4);
        });

        describe('And a form that is invalid is submitted', () => {
            test('should invoke the config onFormSubmit handler, passing the correct arguments', ()=> {
                let mockFunction = jest.fn();

                const formManagerInstance = formManager(getConfigObject({
                    form: formElement,
                    onFormSubmit: mockFunction
                }));

                formElement.dispatchEvent(
                    new Event('submit')
                );

                expect(mockFunction.mock.calls.length).toBe(1);
                expect(mockFunction.mock.calls[0][0]).toBe(false);
                expect(typeof mockFunction.mock.calls[0][1]).toBe('object');
                expect(mockFunction.mock.calls[0][1].length).toBe(4);
            });
        });

        // describe('And a form that is valid is submitted', () => {
        //     test('should invoke the config onFormSubmit handler, passing the correct arguments', ()=> {
        //         let mockFunction = jest.fn();

        //         const formManagerInstance = formManager(getConfigObject({
        //             form: formElement,
        //             onFormSubmit: mockFunction
        //         }));

        //         formElement.querySelector('#text-required').value = 'here is some text';
        //         formElement.querySelector('#email-required').value = 'test@test.co.uk';

        //         formElement.dispatchEvent(
        //             new Event('submit')
        //         );

        //         expect(mockFunction.mock.calls.length).toBe(1);
        //         expect(mockFunction.mock.calls[0][0]).toBe(false);
        //         expect(typeof mockFunction.mock.calls[0][1]).toBe('object');
        //         expect(mockFunction.mock.calls[0][1].length).toBe(4);
        //     });
        // });
    });
});
