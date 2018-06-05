let _elemInput;

function isInputRequired() {
    return _elemInput.hasAttribute('required');
}

function getInputType() {
    return _elemInput.getAttribute('type');
}

export default function inputManager(elemInput) {
    _elemInput = elemInput;

    return {
        element: elemInput,
        type: getInputType(),
        isRequired: isInputRequired()
    };
}