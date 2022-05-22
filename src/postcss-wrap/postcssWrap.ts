import {Plugin, AtRule, Processor, AtRuleProps, RuleProps, Rule} from 'postcss'

type PostCssWrapOptions = {
  type: 'atrule',
  props: AtRuleProps,
} | {
  type: 'rule',
  props: RuleProps,
}

export function postcssWrap(options: PostCssWrapOptions): Plugin | Processor {
  return {
    postcssPlugin: 'postcss-wrap',
    Once(css, { result }) {
      const nodes = result.root.nodes
      let wrapNode
      switch (options.type) {
        case 'atrule':
          wrapNode = new AtRule({
            ...options.props,
            nodes,
          })
          break
        case 'rule':
          wrapNode = new Rule({
            ...options.props,
            nodes,
          })
          break
        default:
          throw new Error('Unknown options.type: ' + (options as any).type)
      }

      result.root.nodes = [wrapNode]
    },
  }
}

postcssWrap.postcss = true

