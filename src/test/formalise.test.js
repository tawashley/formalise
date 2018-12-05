import formalise from 'formalise';

describe('formalise', () => {
    test('exports an object', () => {
        expect(typeof formalise).toBe('object');
    });

    test('exports .addForm function', () => {
        expect(typeof formalise.addForm).toBe('function');
    });
});
