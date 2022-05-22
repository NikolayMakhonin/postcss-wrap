import { Plugin, Processor, AtRuleProps, RuleProps } from 'postcss';
declare type PostCssWrapOptions = {
    type: 'atrule';
    props: AtRuleProps;
} | {
    type: 'rule';
    props: RuleProps;
};
export declare function postcssWrap(options: PostCssWrapOptions): Plugin | Processor;
export declare namespace postcssWrap {
    var postcss: boolean;
}
export {};
