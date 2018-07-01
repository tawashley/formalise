# formalise

[![Build Status](https://travis-ci.org/tawashley/formalise.svg?branch=master)](https://travis-ci.org/tawashley/formalise)

| form and input validation built around browser APIs

## Usage

```js
formalise.addForm({
    form: document.querySelector('[data-formalise-example]'),
});
```

This will add the form element `[data-formalise-example]` to use formalise validation.

## How it works

formalise itself doesn't do the heavy lifting in terms of validate, rather hooking into native browser APIs whilst adding a few quality of life features.

Once `.addForm` is called, the following occurs:

* `novalidate` attribute is added to the form
* The class `is-pristine` is added to all inputs

Depending in the config, when either the input or form is validated the following occurs:

* The class `is-pristine` is replaced with `is-dirty` if it's the first time checking the status of an input
* The input is checked to see if it's valid using `HTMLInputElement.validity.valid`
* The class `is-valid` or `is-invalid` is added to the input depending on it's validity status
* If `inputParentSelector` config value is provided, the parent element is found and the class `is-valid` or `is-invalid` is added to the element.

The above classes can be hooked into and used to style valid, invalid inputs.

## Config

```js
formalise.addForm({
    form: null,
    validateOn: {
        blur: true
    },
    submitFormWhenValid: false,
    onInputBlur: function() {},
    onFormSubmit: function() {},
    inputParentSelector: null
});
```

### form
Type: `HTMLFormElement`<br>
Default: `null`<br>

The form to hook validation into, this is required.

### validateOn
Type: `Object`<br>

#### validateOn.blur
Type: `Object`<br>
Default: `true`<br>

Controls whether all inputs should be validated when the blur event is fired.

### submitFormWhenValid
Type: `Boolean`<br>
Default: `false`<br>

Sets whether the form should be submitted once valid and 'submit' event is fired. Changing this can allow for extra control over submitting the form once it's valid.

### onInputBlur
Type: `Function`<br>
Default: `function(inputElement, isInputValid, inputValidityStatus) {}`<br>

Handler for when an input 'blur' event is fired. Passed into it is the input element the event was fired on, boolean for if the input is valid and the complete validity status object.

### onFormSubmit
Type: `Function`<br>
Default: `function(formIsValid, inputList) {}`<br>

Handler for when the form 'submit' event is fired. Passed into it is a boolean for if the form is valid and an array of all inputs in the form.

### inputParentSelector
Type: `String`<br>
Default: `null`<br>
Example `.input-parent`<br>

A selector for a parent of the input can be provided that adds the same validation state classes (such as is-valid, is-invalid) to a parent element of the input. If provided, the DOM will be traversed upwards and stop when it matches an element with the provided selector.

This can help for handling UI around inputs, such as validation errors.
