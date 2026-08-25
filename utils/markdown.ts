import MarkdownIt from 'markdown-it';

// `html: false` escapes all raw HTML in the source, so neither the model nor any
// embedded record text can inject active markup. markdown-it's built-in
// validateLink also blocks dangerous link protocols (javascript:, vbscript:,
// non-image data:). Pure JS, safe during SSR.
const md = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true
});

export function renderMarkdown(text: string | null | undefined): string {
  return md.render(text ?? '');
}
