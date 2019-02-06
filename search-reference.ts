import * as opn from 'opn';

/**
 * search reference by keyword
 *
 * @param k 検索したい語句
 * @param t 検索するリファレンス 対応済み:phalcon, php, google, fontawesome, mdn, android, kotlin
 */
export default function searchReference(k: string = '', t: string = 'default') {
    const tl = t.toLowerCase();
    if (alias.has(tl)) {
      tl = alias.get(tl)
    }
    const url = supported[tl].url;
    return opn(`${url}${k}`);
}

const supported = {
  default: {url: 'https://www.google.com/search?q='},
  phalcon: {url: 'https://docs.phalconphp.com/search?q='},
  fontawesome: {url: 'https://fontawesome.com/icons?d=gallery&q='},
  mdn: {url: 'https://developer.mozilla.org/ja/search?q='},
  php: {url: 'http://php.net/manual-lookup.php?pattern='},
  android: {url: 'https://developer.android.com/s/results/?q='},
  kotlin: {url: 'https://kotlinlang.org/docs/reference/coding-conventions.html?q='},
  mysql: {url: 'https://www.oracle.com/search/results?cat=mysql&Ntk=SI-ALL5&Ntt='}
}

const alias = new Map([
  ['pha', 'phalcon'],
  ['fa', 'fontawesome'],
  ['droid', 'android']
]);
