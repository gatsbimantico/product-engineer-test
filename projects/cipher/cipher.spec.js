const { encoder, decoder } = require('./cipher.js');

describe('cipher', () => {
  describe('encoder', () => {
    it('generates all the samples', () => {
      expect(encoder('HELLO')).toEqual('8 5 12 12 15');
      expect(encoder('HELLO')).toEqual('8 5 12 12 15');
      expect(encoder('HELLO WORLD')).toEqual('8 5 12 12 15 28 23 15 18 12 4');
      expect(encoder('PLURAL AI')).toEqual('16 12 21 18 1 12 28 1 9');
      expect(encoder('FINTECH')).toEqual('6 9 14 20 5 3 8');
      expect(encoder('WE LIKE RAMEN')).toEqual('23 5 28 12 9 11 5 28 18 1 13 5 14');
    });
  });

  describe('decoder', () => {
    it('matches all the samples', () => {
      expect(decoder('8 5 12 12 15')).toEqual('HELLO');
      expect(decoder('216 3645 12 324 405')).toEqual('HELLO');
      expect(decoder('8 5 324 8748 295245 730 23 405 13122 12 108')).toEqual('HELLO WORLD');
      expect(decoder('16 12 567 486 1 12 64 27 243')).toEqual('PLURAL AI');
      expect(decoder('4374 243 14 20 5 59049 8')).toEqual('FINTECH');
      expect(decoder('23 135 64 12 9 11 3645 64 18 19683 13 5 14')).toEqual('WE LIKE RAMEN');
    });
  });

  describe('custom strings', () => {
    expect(
      encoder(decoder(encoder('A USER JOINED THE ROOM')))
    ).toEqual('1 28 21 19 5 18 28 10 15 9 14 5 4 28 20 8 5 28 18 15 15 13');
    expect(
      encoder(decoder(encoder('A USER DISCONNECTED')))
    ).toEqual('1 28 21 19 5 18 28 4 9 19 3 15 14 14 5 3 20 5 4');
    expect(
      encoder(decoder(encoder('ABCDEFGHIJKLMNOPQRSTUVWXYZ')))
    ).toEqual('1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26');
  });
});