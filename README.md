# white-matter

`white-matter` is a YAML front matter parser which is an alternative to [`gray-matter`](https://github.com/jonschlinkert/gray-matter) and includes minimal functionality.

Instead of throwing an error like `gray-matter` when a YAML syntax error occurs in `js-yaml` used internally, this package sets `undefined` to `data` and returns `content` (the Markdown part) as usual.

This behavior may be useful in cases where processing must continue even with an invalid front matter format (e.g. Markdown editor plugins).

## Installation

```
npm install white-matter
```

## Usage

The basic usage is the same as for `gray-matter`, but no advanced options exist now.

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
- `Warm parse`: identical input with `white-matter` cache explicitly enabled, for repeated parse workloads

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
