const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let i =0;
function factorize(n) {
  if (isNaN(n)) return '';

  if (n < 27 && Number.isInteger(n)) {
    return alphabet[n - 1];
  } else if (n < 27) {
    return ' ';
  }

  return factorize(n / 27);
}

function encoder(str) {
  return str.split('').map(v => (v === ' ' ? 28 : alphabet.indexOf(v) + 1)).join(' ');
}

function decoder(str) {
  return str.split(' ').map(v => factorize(parseInt(v, 10))).join('');
}

if (process.argv[1].indexOf('cipher') > -1 && process.argv[2] === 'encode' && process.argv[3]) {
  console.log(encoder(process.argv[3]));
}

if (process.argv[1].indexOf('cipher') > -1 && process.argv[2] === 'decode' && process.argv[3]) {
  console.log(decoder(process.argv[3]));
}

module.exports = {
  encoder,
  decoder,
};
