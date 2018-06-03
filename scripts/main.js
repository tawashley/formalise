(function formValidator(window, undefined) {
    function addForm(config) {
        addNoValidateToFor(config.form);
        getAllInputsFromTheForm(config.form)
        attachToSubmitEvent(config.form);
    }

    function getAllInputsFromTheForm(elemForm) {};

    function attachToSubmitEvent(elemForm) {
        elemForm.addEventListener('submit', submitHandler, false);
    }

    function submitHandler(event) {
        console.log('hits submitHanlder');
        event.preventDefault();
    }

    function addNoValidateToFor(elemForm) {
        elemForm.setAttribute('novalidate', true);
    }

    window.formValidator = {
        addForm
    }

})(window);