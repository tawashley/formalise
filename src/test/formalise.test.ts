import formalise from '../formalise';

describe('formalise', () => {
    test('should export the API object', () => {
        expect(typeof formalise).toBe('object');
    });

    test('should export the addForm function', () => {
        expect(typeof formalise.addForm).toBe('function');
    });
});
