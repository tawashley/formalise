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
        var inputs = [..._config.form.querySelectorAll('input')];

        inputs.forEach(function(input) {
            _inputList.push(inputManager(input));
        });
    };

    function attachToSubmitEvent() {
        _config.form.addEventListener('submit', submitHandler, false);
    }

    function submitHandler(event) {
        console.log('hits submitHandler');
        event.preventDefault();
    }

    function addNoValidateToFor() {
        _config.form.setAttribute('novalidate', true);
    }

    window.formManager = formManager;
})()