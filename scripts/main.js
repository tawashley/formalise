(function formValidator(window, undefined) {
    var forms = [];

    function addForm(config) {
        forms.push(formManager(config));
    }

    function getForms() {
        console.log('forms', forms);
        return forms;
    }

    window.formValidator = {
        addForm,
        getForms
    }

})(window);