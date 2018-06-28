# formalise

| form and input validation built around browser APIs

## Usage

```js
// Basic usage

formalise.addForm({
    form: document.querySelector('[data-formalise-example]'),
});

```

This will add the form element `[data-formalise-example]` to use formalise validation.

## Config

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
