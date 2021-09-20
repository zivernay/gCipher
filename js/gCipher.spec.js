const gCipher = require('./gCipher')

describe('Gronsfeld Cipher', () => {
    test('Is able to transorm A to B', () => {
        expect(gCipher('A', 1, 'encrypt')).toBe('B');
    });
    test('Is able to transorm Z to A', () => {
        expect(gCipher('Z', 1, 'encrypt')).toBe(('A'));
    });
    test('Is able to transorm B to A', () => {
        expect(gCipher('B', 1, 'decrypt')).toBe('A');
    });
    test('Is able to transorm 0 to 9', () => {
        expect(gCipher('0', 1, 'decrypt')).toBe('9');
    });
    test('Is able to transorm A to Z', () => {
        expect(gCipher('A', 1, 'decrypt')).toBe(('Z'));
    });
    test('Is able to trasform Xy with multicase', () => {
        expect(gCipher('Xy', 7, 'encrypt')).toBe('Ef');
    });
    test('Can handle spaces', () => {
        expect(gCipher('Xy aa', 7, 'encrypt')).toBe('Ef hh');
    });
    test('Is able to trasform Xy with multicase with multi key', () => {
        expect(gCipher('Xy', 71, 'encrypt')).toBe('Ez');
    });
    test('Can handle spaces', () => {
        expect(gCipher('Xy aa 1', 71, 'encrypt')).toBe('Ez bh 8');
    });
    test('Is able to trasform Xy with multicase with multi key', () => {
        expect(gCipher('Xy', 71, 'decrypt')).toBe('Qx');
    });
    test('Can handle spaces', () => {
        expect(gCipher('Xy aa', 71, 'decrypt')).toBe('Qx zt');
    });
    test('Can handle spaces', () => {
        expect(gCipher('Xy aa ', 71, 'decrypt')).toBe('Qx zt ');
    });
});
