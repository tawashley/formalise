function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define('formalise', factory) : global.formalise = factory();
})(this, function () {
  'use strict';

  function addClass(element, className) {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += " " + className;
    }
  }

  function removeClass(element, className) {
    if (element.classList) {
      element.classList.remove(className);
    } else {
      element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(' ').join('|') + "(\\b|$)", 'gi'), ' ');
    }
  }

  function hasClass(element, className) {
    if (element.classList) {
      return element.classList.contains(className);
    }

    return new RegExp("(^| )" + className + "( |$)", 'gi').test(element.className);
  }

  function getClosestElement(element, selector) {
    var baseElement = element;

    if (baseElement.closest) {
      return baseElement.closest(selector);
    }

    if (!document.documentElement.contains(baseElement)) {
      return null;
    }

    do {
      if (baseElement.matches(selector)) {
        return baseElement;
      }

      baseElement = baseElement.parentElement || baseElement.parentNode;
    } while (baseElement !== null && baseElement.nodeType === 1);

    return null;
  }

  var cssClassPristine = 'is-pristine';
  var cssClassDirty = 'is-dirty';
  var cssClassValid = 'is-valid';
  var cssClassInvalid = 'is-invalid';

  function inputManager(inputElement, formaliseConfig) {
    function isInputValid() {
      return inputElement.validity.valid;
    }

    function inputValidityStatus() {
      return inputElement.validity;
    }

    function setInputValidityStatus(element) {
      if (element === void 0) {
        element = inputElement;
      }

      if (isInputValid()) {
        removeClass(element, cssClassInvalid);
        addClass(element, cssClassValid);
      } else {
        removeClass(element, cssClassValid);
        addClass(element, cssClassInvalid);
      }
    }

    function setInputAsDirty() {
      removeClass(inputElement, cssClassPristine);
      addClass(inputElement, cssClassDirty);
    }

    function setInputStatusClass() {
      addClass(inputElement, cssClassPristine);
    }

    function validateInputStatus() {
      if (hasClass(inputElement, cssClassPristine)) {
        setInputAsDirty();
      }

      setInputValidityStatus();

      if (formaliseConfig.inputParentSelector !== null && formaliseConfig.inputParentSelector !== '') {
        var inputRowElement = getClosestElement(inputElement, formaliseConfig.inputParentSelector);

        if (inputRowElement) {
          setInputValidityStatus(inputRowElement);
        }
      }
    }

    function blurHandler() {
      validateInputStatus();
      formaliseConfig.onInputBlur(inputElement, isInputValid(), inputValidityStatus());
    }

    function bindInputBlurEvent() {
      inputElement.addEventListener('blur', blurHandler, false);
    }

    function init() {
      setInputStatusClass();

      if (formaliseConfig.validateOn.blur) {
        bindInputBlurEvent();
      }
    }

    init();
    return {
      element: inputElement,
      validate: validateInputStatus
    };
  }

  function formManager(config) {
    var inputList = [];

    function getAllInputsFromTheForm() {
      var inputs = [].slice.call(config.form.querySelectorAll('input'));
      inputs.forEach(function (input) {
        if (input.type !== 'hidden') {
          inputList.push(inputManager(input, config));
        }
      });
    }

    function focusOnFirstInvalidInput() {
      var firstInvalidInput = inputList.find(function (input) {
        return input.element.validity.valid === false;
      });

      if (firstInvalidInput !== undefined) {
        firstInvalidInput.element.focus();
      }
    }

    function submitHandler(event) {
      var validationMap = [];
      var formIsValid = false;
      event.preventDefault();
      validationMap = inputList.map(function (input) {
        return input.element.validity.valid;
      });
      formIsValid = validationMap.every(function (inputValidStatus) {
        return inputValidStatus === true;
      });
      inputList.forEach(function (input) {
        return input.validate();
      });

      if (config.focusOnFirstInvalidInput) {
        focusOnFirstInvalidInput();
      }

      config.onFormSubmit(formIsValid, inputList);

      if (formIsValid && config.submitFormWhenValid) {
        config.form.submit();
      }
    }

    function attachToSubmitEvent() {
      config.form.addEventListener('submit', submitHandler, false);
    }

    function addNoValidateToForm() {
      config.form.setAttribute('novalidate', 'true');
    }

    function init() {
      addNoValidateToForm();
      getAllInputsFromTheForm();
      attachToSubmitEvent();
    }

    init();
    return {
      form: config.form,
      inputs: inputList
    };
  }

  var defaultConfig = {
    validateOn: {
      blur: true
    },
    submitFormWhenValid: false,
    onInputBlur: function onInputBlur() {},
    onFormSubmit: function onFormSubmit() {},
    inputParentSelector: null,
    focusOnFirstInvalidInput: true
  };

  function configManager(userConfig) {
    return Object.assign({}, defaultConfig, userConfig);
  }

  var forms = [];

  function addForm(config) {
    var fullConfig = configManager(config);

    if (fullConfig.form) {
      forms.push(formManager(fullConfig));
    }
  }

  var formalise = {
    addForm: addForm
  };
  return formalise;
});