const { Suite } = require('benchmark')
const grayMatter = require('gray-matter')
const whiteMatter = require('./dist').default

const FIXTURE_COUNT = 1000
const sharedMarkdown = '---\nfoo: bar\nbaz: qux\n---\n# Hello World\n\nThis is a test.'
const markdowns = Array.from({ length: FIXTURE_COUNT }, (_, index) =>
  `---\nfoo: bar\nbaz: qux\nindex: ${index}\n---\n# Hello World\n\nThis is a test.`
)
const whiteMatterCacheOptions = { cache: true }
const grayMatterNoCacheOptions = {}

const runSuite = (name, setupBenchmarks) => {
  console.log(`\n${name}`)
  const suite = new Suite()

  setupBenchmarks(suite)

  suite
    .on('cycle', function(event) {
      console.log(String(event.target))
    })
    .on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
    .run({ async: false })
}

console.log('Examples:')
console.log('gray-matter:', grayMatter(sharedMarkdown))
console.log('white-matter:', whiteMatter(sharedMarkdown))

runSuite('Cold parse (unique input, cache disabled)', (suite) => {
  let grayIndex = 0
  let whiteIndex = 0

  suite
    .add('gray-matter', () => {
      grayMatter(markdowns[grayIndex++ % markdowns.length], grayMatterNoCacheOptions)
    })
    .add('white-matter', () => {
      whiteMatter(markdowns[whiteIndex++ % markdowns.length])
    })
})

runSuite('Warm parse (identical input, cache enabled)', (suite) => {
  whiteMatter.clearCache()
  whiteMatter(sharedMarkdown, whiteMatterCacheOptions)

  suite
    .add('gray-matter', () => {
      grayMatter(sharedMarkdown)
    })
    .add('white-matter', () => {
      whiteMatter(sharedMarkdown, whiteMatterCacheOptions)
    })
})
