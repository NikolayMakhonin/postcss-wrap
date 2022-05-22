import {
  Plugin,
  AtRule,
  Processor,
  AtRuleProps,
  RuleProps,
  Rule,
} from 'postcss'

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
            raws  : result.root.raws,
            source: result.root.source,
            nodes,
          })
          break
        case 'rule':
          wrapNode = new Rule({
            ...options.props,
            raws  : result.root.raws,
            source: result.root.source,
            nodes,
          })
          break
        default:
          throw new Error('Unknown options.type: ' + (options as any).type)
      }

      wrapNode.parent = result.root
      result.root.nodes.forEach(node => {
        node.parent = wrapNode
      })
      result.root.nodes = [wrapNode]
    },
  }
}

postcssWrap.postcss = true

