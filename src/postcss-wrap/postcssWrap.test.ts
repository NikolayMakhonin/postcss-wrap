import postcss from 'postcss'
import {postcssWrap} from './postcssWrap'

describe('pluginCreator', function () {
  async function testMedia(input: string, params: string) {
    const output = (await postcss(postcssWrap({
      type : 'atrule',
      props: {
        name: 'media',
        params,
      },
    })).process(input)).css
    const checkOutput = `@media ${params}{${input}}`
    assert.strictEqual(output, checkOutput)
  }

  it('media', async function () {
    await testMedia('.class{}', 'all')
    await testMedia('.class{}.class2{}', 'all')
    await testMedia('.class{}.class2{}', 'all and qwe')
    await testMedia('.class{}.class2{}', 'all and qwe, (min-width: 10px)')
    await testMedia('.class{}.class2{}@keyframes example{from{}to{}}', 'all and qwe, (min-width: 10px)')
    await testMedia('.class{}@media all {.class2{}@keyframes example{from{}to{}}}', 'all and qwe, (min-width: 10px)')
    await testMedia('.class{}@media all {@media all, (min-width: 20px) {.class2{}@keyframes example{from{}to{}}}}', 'all and qwe, (min-width: 10px)')
  })

  async function testSelector(input: string, selector: string) {
    const output = (await postcss(postcssWrap({
      type : 'rule',
      props: {
        selectors: [selector],
      },
    })).process(input)).css
    const checkOutput = `${selector}{${input}}`
    assert.strictEqual(output, checkOutput)
  }

  it('selector', async function () {
    await testSelector('.class{}', '.class3')
    await testSelector('.class{}.class2{}', '.class3#id')
    await testSelector('.class{}.class2{}', '.class3#id, .class4')
    await testSelector('.class{}.class2{}', '.class3#id, .class4:has(min-width: 10px)')
    await testSelector('.class{}.class2{}@keyframes example{from{}to{}}', '.class3#id, .class4:has(min-width: 10px)')
    await testSelector('.class{}@media all {.class2{}@keyframes example{from{}to{}}}', '.class3#id, .class4:has(min-width: 10px)')
    await testSelector('.class{}@media all {@media all, (min-width: 20px) {.class2{}@keyframes example{from{}to{}}}}', '.class3#id, .class4:has(min-width: 10px)')
  })
})
