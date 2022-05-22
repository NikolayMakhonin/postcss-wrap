'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var postcss = require('postcss');

function postcssWrap(options) {
    return {
        postcssPlugin: 'postcss-wrap',
        Once(css, { result }) {
            const nodes = result.root.nodes;
            let wrapNode;
            switch (options.type) {
                case 'atrule':
                    wrapNode = new postcss.AtRule(Object.assign(Object.assign({}, options.props), { nodes }));
                    break;
                case 'rule':
                    wrapNode = new postcss.Rule(Object.assign(Object.assign({}, options.props), { nodes }));
                    break;
                default:
                    throw new Error('Unknown options.type: ' + options.type);
            }
            result.root.nodes = [wrapNode];
        },
    };
}
postcssWrap.postcss = true;

exports.postcssWrap = postcssWrap;
