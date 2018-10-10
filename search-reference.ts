import * as opn from 'opn';

/**
 * search reference by keyword
 *
 * @param k 検索したい語句
 * @param t 検索するライブラリ support→phalcon
 */
export default function searchReference(k: string, t: string = 'default') {
    const tl = t.toLowerCase();
    const url = supported[tl].url;
    opn(`${url}${k}`);
}

const supported = {
  default: {url: 'https://www.google.com/search?q='},
  phalcon: {url: 'https://docs.phalconphp.com/search?q='},
  fontawesome: {url: 'https://fontawesome.com/icons?d=gallery&q='},
  web: {url: 'https://developer.mozilla.org/ja/search?q='},
  php: {url: 'http://php.net/manual-lookup.php?pattern='},
  android: {url: 'https://developer.android.com/s/results/?q='}
}
