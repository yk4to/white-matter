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

## Benchmark

```
gray-matter x 573,338 ops/sec ±1.34% (84 runs sampled)
white-matter x 795,682,710 ops/sec ±0.56% (86 runs sampled)
Fastest is white-matter
```

## License

MIT