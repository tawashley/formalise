import formalise from 'formalise';

describe('formalise', () => {
    test('exports an object', () => {
        expect(formalise).not.toBe(undefined);
        expect(typeof formalise).toBe('object');
    });
});
