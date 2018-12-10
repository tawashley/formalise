import {
    addClass,
    removeClass,
    hasClass,
    toggleClass,
    toggleAttribute,
    removeElement,
    getClosestElement
} from 'DOMUtils';

describe('DOM utils', () => {
    describe('classList exists in element prototype', () => {
        describe('#addClass', () => {
            let testElement = '';

            beforeEach(() => {
                testElement = document.createElement('span');
                document.body.appendChild(testElement);
            });

            afterEach(() => {
                testElement.parentNode.removeChild(testElement);
            });

            test('should correctly add the class to the element', () => {
                const className = 'this-is-a-test-class';

                addClass(testElement, className);

                expect(testElement.className).toEqual(className);
            });
        });

        describe('#removeClass', () => {
            let testElement = '';
            const className = 'class-to-be-removed';

            beforeEach(() => {
                testElement = document.createElement('span');
                testElement.className = className;

                document.body.appendChild(testElement);
            });

            afterEach(() => {
                testElement.parentNode.removeChild(testElement);
            });

            test('should correctly remove the class from the element', () => {
                removeClass(testElement, className);
                expect(testElement.className).toEqual('');
            });
        });

        describe('#hasClass', () => {
            let testElement = '';
            const className = 'class-to-check';

            beforeEach(() => {
                testElement = document.createElement('span');
                testElement.className = className;

                document.body.appendChild(testElement);
            });

            afterEach(() => {
                testElement.parentNode.removeChild(testElement);
            });

            test('should return true when the element has the class', () => {
                const actual = hasClass(testElement, className);
                expect(actual).toBe(true);
            });

            test('should return false when the element does not have the class', () => {
                const actual = hasClass(testElement, 'class-not-there');
                expect(actual).toBe(false);
            });
        });

        describe('#toggleClass', () => {
            let testElement = '';
            const className = 'class-to-check';

            beforeEach(() => {
                testElement = document.createElement('span');
                testElement.className = className;

                document.body.appendChild(testElement);
            });

            afterEach(() => {
                testElement.parentNode.removeChild(testElement);
            });

            test('should remove the class from the element if it exists', () => {
                toggleClass(testElement, className);

                expect(testElement.className).toEqual('');
            });

            test('should add the class to the element if it does not exist', () => {
                testElement.className = '';
                toggleClass(testElement, className);

                expect(testElement.className).toEqual(className);
            });
        });

        describe('#toggleAttribute', () => {
            let testElement = '';

            beforeEach(() => {
                testElement = document.createElement('span');

                document.body.appendChild(testElement);
            });

            afterEach(() => {
                testElement.parentNode.removeChild(testElement);
            });

            test('should add the attribute to the element if it does not exist', () => {
                toggleAttribute(testElement, 'name', 'test');

                expect(testElement.getAttribute('name')).toEqual('test');
            });

            test('should remove the attribute from the element if it does exist', () => {
                testElement.setAttribute('name', 'test');
                toggleAttribute(testElement, 'name', 'test');

                expect(testElement.getAttribute('name')).toBe(null);
            });
        });

        describe('#removeElement', () => {
            const elementId = 'test-element-added-to-page';

            beforeEach(() => {
                const element = document.createElement('section');

                element.setAttribute('id', elementId);
                document.body.appendChild(element);
            });

            test('should correctly from the element from the page', () => {
                const element = document.getElementById(elementId);
                let elementAfterRemoval = '';

                removeElement(element);

                elementAfterRemoval = document.getElementById(elementId);

                expect(elementAfterRemoval).toBe(null);
            });
        });
    });

    describe('classList does not exist in the element prototype', () => {
        describe('#addClass', () => {
            let mockElement = {};

            beforeEach(() => {
                mockElement = {
                    className: ''
                };
            });

            test('should correctly add the class to the element', () => {
                const className = 'this-is-a-test-class';

                addClass(mockElement, className);

                expect(mockElement.className).toEqual(` ${className}`);
            });
        });

        describe('#removeClass', () => {
            let mockElement = {};
            const className = 'class-to-be-removed';

            beforeEach(() => {
                mockElement = {
                    className
                };
            });

            test('should correctly remove the class from the element', () => {
                removeClass(mockElement, className);
                expect(mockElement.className).toEqual(' ');
            });
        });

        describe('#hasClass', () => {
            let mockElement = {};
            const className = 'class-to-check';

            beforeEach(() => {
                mockElement = {
                    className
                };
            });

            test('should return true when the element has the class', () => {
                const actual = hasClass(mockElement, className);
                expect(actual).toBe(true);
            });

            test('should return false when the element does not have the class', () => {
                const actual = hasClass(mockElement, 'class-not-there');
                expect(actual).toBe(false);
            });
        });

        describe('#toggleClass', () => {
            let mockElement = {};
            const className = 'class-to-check';

            beforeEach(() => {
                mockElement = {
                    className
                };
            });

            test('should remove the class from the element if it exists', () => {
                toggleClass(mockElement, className);

                expect(mockElement.className).toEqual('');
            });

            test('should add the class to the element if it does not exist', () => {
                mockElement.className = '';
                toggleClass(mockElement, className);

                expect(mockElement.className).toEqual(` ${className}`);
            });
        });

        describe('#getClosestElement', () => {
            beforeEach(() => {
                var html = [];

                html.push('<main class="getClosestElement-test-element">');
                html.push('<article class="article">');
                html.push('article');
                html.push('<section class="section">');
                html.push('section');
                html.push('<div class="div">');
                html.push('div');
                html.push('<span class="span">');
                html.push('span');
                html.push('</span>');
                html.push('</div>');
                html.push('</section>');
                html.push('</article>');
                html.push('</main>');

                document.body.insertAdjacentHTML('afterbegin', html.join(''));
            });

            afterEach(() => {
                var stubbedElement = document.querySelector('.getClosestElement-test-element');

                stubbedElement.parentElement.removeChild(stubbedElement);
            });

            test('should correctly select the closest element if it exists', () => {
                var elemInstanceWithoutNativeClosest = Object.assign(document.querySelector('.span'), { closest: null });
                var elemClosestArticle = getClosestElement(elemInstanceWithoutNativeClosest, '.article');

                expect(elemClosestArticle instanceof HTMLElement).toBe(true);
                expect(elemClosestArticle.isSameNode(document.querySelector('.getClosestElement-test-element .article'))).toBe(true);
            });

            test('should correctly return null if the closest element does not exist on the page', () => {
                var elemInstanceWithoutNativeClosest = Object.assign(document.querySelector('.span'), { closest: null });
                var elemClosestElementThatDoesNotExist = getClosestElement(elemInstanceWithoutNativeClosest, '.does-not-exist');

                expect(elemClosestElementThatDoesNotExist).toBe(null);
            });

            test('should correctly return null if the base element does not exist on the page', () => {
                var elemFauxWithoutNativeClosest = Object.assign(document.createElement('div'), { closest: null });
                var elemClosestBaseElementThatDoesNotExist = getClosestElement(elemFauxWithoutNativeClosest, '.does-not-exist');

                expect(elemClosestBaseElementThatDoesNotExist).toBe(null);
            });
        })
    });
});
