export function addClass(element: HTMLElement, className: string): void {
    if (element.classList) {
        element.classList.add(className);
    } else {
        element.className += ` ${className}`;
    }
}

export function removeClass(element: HTMLElement, className: string): void {
    if (element.classList) {
        element.classList.remove(className);
    } else {
        element.className = element.className.replace(new RegExp(`(^|\\b)${className.split(' ').join('|')}(\\b|$)`, 'gi'), ' ');
    }
}

export function hasClass(element: HTMLElement, className: string): boolean {
    if (element.classList) {
        return element.classList.contains(className);
    }
    return new RegExp(`(^| )${className}( |$)`, 'gi').test(element.className);
}

export function toggleAttribute(element: HTMLElement, attr: string, val: string): void {
    if (element.hasAttribute(attr) && element.getAttribute(attr) === val) {
        element.removeAttribute(attr);
    } else {
        element.setAttribute(attr, val);
    }
}

export function toggleClass(element: HTMLElement, className: string): void {
    if (element.classList) {
        element.classList.toggle(className);
    } else {
        const classes = element.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) {
            classes.splice(existingIndex, 1);
        } else {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }
}

export function removeElement(element: HTMLElement): void {
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

export function getClosestElement(element: HTMLElement, selector: string): Element | null {
    let baseElement = element;

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

        baseElement = (baseElement.parentElement || baseElement.parentNode) as HTMLElement;
    } while (baseElement !== null && baseElement.nodeType === 1);

    return null;
}
