import yaml from 'js-yaml';

type MatterResult = { content: string; data: unknown; };
type MatterOptions = { cache?: boolean; };
type Matter = ((markdown: string, options?: MatterOptions) => MatterResult) & {
  cache: Record<string, MatterResult>;
  clearCache: () => void;
};

/**
  * Extracts the front matter and content from a markdown string.
  *
  * @param {string} markdown Markdown string to parse.
  * @param {{ cache?: boolean }} [options] Parsing options.
  * @returns {{ content: string, data: unknown }} The markdown content and the front matter data.
  */
const matter = ((markdown: string, options: MatterOptions = {}): MatterResult => {
  // If the markdown is empty, return empty content and undefined data
  if (markdown === '') {
    return { content: markdown, data: undefined };
  }

  if (options.cache !== true) {
    return parseMatter(markdown);
  }

  const cached = matter.cache[markdown];
  if (cached) {
    return cached;
  } else {
    const parsed = parseMatter(markdown);
    matter.cache[markdown] = parsed;
    return parsed;
  }
}) as Matter;

const parseMatter = (markdown: string): MatterResult => {
  const open = '---';
  const close = '\n' + open;

  // If there's no front matter, return the original markdown and undefined data
  if (!markdown.startsWith(open) || markdown.charAt(open.length) !== '\n') {
    return { content: markdown, data: undefined };
  }

  const str = markdown.slice(open.length);
  const len = str.length;
  let closeIndex = str.indexOf(close);
  if (closeIndex === -1) {
    closeIndex = len;
  }
  const frontMatter = str.slice(0, closeIndex);

  let content = '';
  if (closeIndex !== len) {
    content = str.slice(closeIndex + close.length);
    if (content[0] === '\r') {
      content = content.slice(1);
    }
    if (content[0] === '\n') {
      content = content.slice(1);
    }
  }

  const block = frontMatter.replace(/^\s*#[^\n]+/gm, '').trim();
  if (block === '') {
    return { content, data: undefined };
  }

  let data: unknown;
  try {
    data = yaml.load(frontMatter);
  } catch (err) {
    data = undefined;
  }

  return { content, data };
};

matter.cache = Object.create(null) as Record<string, MatterResult>;
matter.clearCache = (): void => {
  matter.cache = Object.create(null) as Record<string, MatterResult>;
};

export default matter;
