#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var opn = require("opn");
/**
 * search reference by keyword
 *
 * @param keyword 検索したい語句
 * @param target 検索するライブラリ support→phalcon
 */
function searchReference(keyword, target) {
    if (target === void 0) { target = 'default'; }
    var tl = target.toLowerCase();
    var url = supported[tl].url;
    opn("" + url + keyword);
}
exports.default = searchReference;
var supported = {
    default: { url: 'https://www.google.com/search?q=' },
    phalcon: { url: 'https://docs.phalconphp.com/search?q=' },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TYPESCRIPT_TO_CLI_PREPARE_PARAMS(signature, argv) {
    function padWithWhiteSpaces(str, length) {
        for (let i = str.length; i < length; i++) {
            str += " ";
        }
        return str;
    }
    function parameterLeftDocumentation(parameter) {
        switch (parameter.type) {
            case 0 /* Boolean */:
                return parameter.name;
            case 2 /* String */:
                return parameter.name + " <string>";
            case 1 /* Number */:
                return parameter.name + " <number>";
            default:
                throw new Error(`Unknown cli parameter type: ${parameter.type}`);
        }
    }
    function parametersDocumentation(parameters) {
        const leftParts = parameters.map(parameterLeftDocumentation);
        const padding = Math.max(...leftParts.map(d => d.length + 2).concat(8));
        const help = padWithWhiteSpaces("--help", padding) + "output usage information";
        const parametersDoc = parameters
            .map((parameter, i) => padWithWhiteSpaces(leftParts[i], padding) +
            (parameter.documentation !== null ? parameter.documentation : ""))
            .join("\n");
        return help + "\n" + parametersDoc;
    }
    function displayHelpAndExit(signature) {
        process.stdout.write(`Usage ${signature.fileName} [options]

${signature.documentation !== null ? signature.documentation + "\n" : ""}
Options:

${parametersDocumentation(signature.parameters)}
`);
        process.exit(0);
    }
    function isNumber(num) {
        if (num.trim() !== "") {
            return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
        }
        return false;
    }
    function extractStringFromArg(value, parameter) {
        if (value === undefined) {
            throw new Error(`Missing value for argument ${parameter}`);
        }
        return value;
    }
    function extractNumberFromArg(value, parameter) {
        if (value === undefined) {
            throw new Error(`Missing value for argument ${parameter}`);
        }
        if (!isNumber(value)) {
            throw new Error(`${parameter} should be a number`);
        }
        return Number(value);
    }
    function extractValueFromArg(parameter, value) {
        switch (parameter.type) {
            case 1 /* Number */:
                return extractNumberFromArg(value, parameter.name);
            case 2 /* String */:
                return extractStringFromArg(value, parameter.name);
            default:
                throw new Error(`Invalid argument type ${parameter.type}`);
        }
    }
    function extractParamFromArgv(parameter, argv) {
        if (parameter.type === 0 /* Boolean */) {
            return argv.some(arg => arg === parameter.name);
        }
        for (let i = 0; i < argv.length; i++) {
            if (argv[i] === parameter.name) {
                return extractValueFromArg(parameter, argv[i + 1]);
            }
            if (argv[i].startsWith(parameter.name + "=")) {
                return extractValueFromArg(parameter, argv[i].slice(parameter.name.length + 1));
            }
        }
        throw new Error(`Missing argument ${parameter.name}`);
    }
    if (argv.length === 0 || argv[0] === "--help") {
        displayHelpAndExit(signature);
        return;
    }
    try {
        return signature.parameters.map(p => extractParamFromArgv(p, argv));
    }
    catch (err) {
        process.stderr.write(err.message + "\n");
        process.exit(1);
    }
}
//# sourceMappingURL=wrapper.js.map
exports.default.apply(null, TYPESCRIPT_TO_CLI_PREPARE_PARAMS({"fileName":"search-reference.js","parameters":[{"type":2,"name":"--keyword","documentation":"検索したい語句"},{"type":2,"name":"--target","documentation":"検索するライブラリ support→phalcon"}],"documentation":"search reference by keyword"}, process.argv.slice(2)));
