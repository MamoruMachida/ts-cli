import * as opn from 'opn';

/**
 * search reference by keyword
 *
 * @param keyword 検索したい語句
 * @param target 検索するライブラリ support→phalcon
 */
export default function searchReference(keyword: string, target: string = 'default') {
    const tl = target.toLowerCase();
    const url = supported[tl].url;
    opn(`${url}${keyword}`)
}

const supported = {
  default: {url: 'https://www.google.com/search?q='},
  phalcon: {url: 'https://docs.phalconphp.com/search?q='},
}
