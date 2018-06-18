export function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    } else {
        element.className += ' ' + className;
    }
};

export function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    } else {
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
};

export function hasClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    } else {
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
};

export function toggleAttribute(element, attr, val) {
    if (element.hasAttribute(attr) && element.getAttribute(attr) === val) {
        element.removeAttribute(attr);
    } else {
        element.setAttribute(attr, val);
    }
};

export function toggleClass(element, className) {
    if (element.classList) {
        element.classList.toggle(className);
    } else {
        var classes = element.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
        } else {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }
};

export function removeElement(element) {
    element.parentNode.removeChild(element);
}

export function findParentElement(element, selector) {
    var elements = [];
    var elem = element;
    var ishaveselector = selector !== undefined;

    while ((elem = elem.parentElement) !== null) {
        if (elem.nodeType !== Node.ELEMENT_NODE) {
            continue;
        }

        if (!ishaveselector || elem.matches(selector)) {
            elements.push(elem);
        }
    }

    return elements;
}
