(function() {
    var _elemInput;

    function inputManager(elemInput) {
        _elemInput = elemInput;

        return {
            element: elemInput,
            type: getInputType(),
            isRequired: isInputRequired()
        };
    }

    function isInputRequired() {
        return _elemInput.hasAttribute('required');
    }

    function getInputType() {
        return _elemInput.getAttribute('type');
    }

    window.inputManager = inputManager;
})()