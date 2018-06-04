(function() {

    var _config;
    var _inputList = [];

    function formManager(config) {
        _config = config;

        addNoValidateToFor();
        getAllInputsFromTheForm()
        attachToSubmitEvent();

        return {
            form: _config.form,
            inputs: _inputList
        };
    }

    function getAllInputsFromTheForm() {
        var inputs = [].slice.call(_config.form.querySelectorAll('input'));

        inputs.forEach(function(input) {
            _inputList.push(inputManager(input));
        });
    };

    function attachToSubmitEvent() {
        _config.form.addEventListener('submit', submitHandler, false);
    }

    function submitHandler(event) {
        var validationMap = [];
        var formIsValid;

        event.preventDefault();

        validationMap = _inputList.map(function(input) {
            return input.element.validity.valid;
        });

        formIsValid = validationMap.every(function(inputValidStatus) { return inputValidStatus === true; });

        if(formIsValid) {
            console.log('form is valid 👍');
        } else {
            console.log('form is invalid 👎');
        }
    }

    function addNoValidateToFor() {
        _config.form.setAttribute('novalidate', true);
    }

    window.formManager = formManager;
})()
