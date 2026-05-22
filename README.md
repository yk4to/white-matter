# white-matter

`white-matter` is a minimal YAML front matter parser and an alternative to [`gray-matter`](https://github.com/jonschlinkert/gray-matter).

Unlike `gray-matter`, it does not throw when `js-yaml` encounters invalid YAML. Instead, it returns the Markdown content as usual and sets `data` to `undefined`.

This is useful when processing should continue even if the front matter is invalid, for example in Markdown editor plugins.

## Installation

```
npm install white-matter
```

## Usage

The basic usage is the same as `gray-matter`, but it currently has no advanced options.

```typescript
import matter from 'white-matter';

console.log(matter('---\ntitle: Front Matter\n---\nThis is content.'));

// -> { content: 'This is content.', data: { title: 'Front Matter' } }
```

By default, `white-matter` does not cache parse results.
You can enable a simple built-in cache for repeated identical inputs.

```typescript
import matter from 'white-matter';

console.log(matter('---\ntitle: Front Matter\n---\nThis is content.', { cache: true }));
```

Call `matter.clearCache()` to reset it.

## Benchmark

Run the benchmark with:

```
npm run benchmark
```

The benchmark reports two separate scenarios:

- `Cold parse`: unique input with `white-matter` cache disabled, for parser-to-parser comparison
- `Warm parse`: identical input with `white-matter` cache enabled, for repeated parse workloads

Example output:

```
Cold parse (unique input, cache disabled)
gray-matter x 434,280 ops/sec ±0.17% (101 runs sampled)
white-matter x 754,335 ops/sec ±0.14% (99 runs sampled)
Fastest is white-matter

Warm parse (identical input, cache enabled)
gray-matter x 1,902,103 ops/sec ±0.84% (98 runs sampled)
white-matter x 104,284,156 ops/sec ±3.14% (89 runs sampled)
Fastest is white-matter
```

## License

MIT
