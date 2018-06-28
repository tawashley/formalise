# Setup for validation

Augment the browser based validation using JS behaviour.

Add the form to the 'validator', passing in options (to be defined)

```js
formalise.addForm({
    form: document.querySelector('#formElement')
};
```

Calling this will do several things:

* Add the form to the global form list
    * Can be retrived using `formalise.getForm('something')`, behaviour and full usage still to be defined
* Using the form element, grab all of the inputs and attach submit listener for the validation to take place
* Add novalidate attr to the 

# Input

Grab a bunch of attributes from the input
* type
* maxlength
* minlength
* pattern
    * Can use this internally as validation regex
* required 
