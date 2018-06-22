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

export function getClosestElement(element, selector) {
    if(element.closest) {
        return element.closest(selector);
    } else {
        if (!document.documentElement.contains(element)) return null;
        
        do {
            if (element.matches(selector)) return element;
            element = element.parentElement || element.parentNode;
        } while (element !== null && element.nodeType === 1); 

        return null;
    }
}