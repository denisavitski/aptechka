import {
  ElementConstructorTagObject,
  ElementConstructor,
  ElementConstructorJSS,
  ElementConstructorTagNames,
} from './ElementConstructor'

export function element<
  T extends ElementConstructorTagNames = ElementConstructorTagNames
>(string: string, object: ElementConstructorTagObject<T>): ElementConstructor<T>

export function element<
  T extends ElementConstructorTagNames = ElementConstructorTagNames
>(tag: T, object?: ElementConstructorTagObject<T>): ElementConstructor<T>

export function element(
  node: Node,
  object: ElementConstructorTagObject<Node>
): ElementConstructor<Node>

export function element(...args: any[]) {
  return new (ElementConstructor as any)(...args)
}

export function a(object?: ElementConstructorTagObject<'a'>) {
  return new ElementConstructor('a', object)
}

export function abbr(object?: ElementConstructorTagObject<'abbr'>) {
  return new ElementConstructor('abbr', object)
}

export function address(object?: ElementConstructorTagObject<'address'>) {
  return new ElementConstructor('address', object)
}

export function area(object?: ElementConstructorTagObject<'area'>) {
  return new ElementConstructor('area', object)
}

export function article(object?: ElementConstructorTagObject<'article'>) {
  return new ElementConstructor('article', object)
}

export function aside(object?: ElementConstructorTagObject<'aside'>) {
  return new ElementConstructor('aside', object)
}

export function audio(object?: ElementConstructorTagObject<'audio'>) {
  return new ElementConstructor('audio', object)
}

export function b(object?: ElementConstructorTagObject<'b'>) {
  return new ElementConstructor('b', object)
}

export function base(object?: ElementConstructorTagObject<'base'>) {
  return new ElementConstructor('base', object)
}

export function bdi(object?: ElementConstructorTagObject<'bdi'>) {
  return new ElementConstructor('bdi', object)
}

export function bdo(object?: ElementConstructorTagObject<'bdo'>) {
  return new ElementConstructor('bdo', object)
}

export function blockquote(object?: ElementConstructorTagObject<'blockquote'>) {
  return new ElementConstructor('blockquote', object)
}

export function body(object?: ElementConstructorTagObject<'body'>) {
  return new ElementConstructor('body', object)
}

export function br(object?: ElementConstructorTagObject<'br'>) {
  return new ElementConstructor('br', object)
}

export function button(object?: ElementConstructorTagObject<'button'>) {
  return new ElementConstructor('button', object)
}

export function canvas(object?: ElementConstructorTagObject<'canvas'>) {
  return new ElementConstructor('canvas', object)
}

export function caption(object?: ElementConstructorTagObject<'caption'>) {
  return new ElementConstructor('caption', object)
}

export function cite(object?: ElementConstructorTagObject<'cite'>) {
  return new ElementConstructor('cite', object)
}

export function code(object?: ElementConstructorTagObject<'code'>) {
  return new ElementConstructor('code', object)
}

export function col(object?: ElementConstructorTagObject<'col'>) {
  return new ElementConstructor('col', object)
}

export function colgroup(object?: ElementConstructorTagObject<'colgroup'>) {
  return new ElementConstructor('colgroup', object)
}

export function data(object?: ElementConstructorTagObject<'data'>) {
  return new ElementConstructor('data', object)
}

export function datalist(object?: ElementConstructorTagObject<'datalist'>) {
  return new ElementConstructor('datalist', object)
}

export function dd(object?: ElementConstructorTagObject<'dd'>) {
  return new ElementConstructor('dd', object)
}

export function del(object?: ElementConstructorTagObject<'del'>) {
  return new ElementConstructor('del', object)
}

export function details(object?: ElementConstructorTagObject<'details'>) {
  return new ElementConstructor('details', object)
}

export function dfn(object?: ElementConstructorTagObject<'dfn'>) {
  return new ElementConstructor('dfn', object)
}

export function dialog(object?: ElementConstructorTagObject<'dialog'>) {
  return new ElementConstructor('dialog', object)
}

export function div(object?: ElementConstructorTagObject<'div'>) {
  return new ElementConstructor('div', object)
}

export function dl(object?: ElementConstructorTagObject<'dl'>) {
  return new ElementConstructor('dl', object)
}

export function dt(object?: ElementConstructorTagObject<'dt'>) {
  return new ElementConstructor('dt', object)
}

export function em(object?: ElementConstructorTagObject<'em'>) {
  return new ElementConstructor('em', object)
}

export function embed(object?: ElementConstructorTagObject<'embed'>) {
  return new ElementConstructor('embed', object)
}

export function fieldset(object?: ElementConstructorTagObject<'fieldset'>) {
  return new ElementConstructor('fieldset', object)
}

export function figcaption(object?: ElementConstructorTagObject<'figcaption'>) {
  return new ElementConstructor('figcaption', object)
}

export function figure(object?: ElementConstructorTagObject<'figure'>) {
  return new ElementConstructor('figure', object)
}

export function footer(object?: ElementConstructorTagObject<'footer'>) {
  return new ElementConstructor('footer', object)
}

export function form(object?: ElementConstructorTagObject<'form'>) {
  return new ElementConstructor('form', object)
}

export function h1(object?: ElementConstructorTagObject<'h1'>) {
  return new ElementConstructor('h1', object)
}

export function h2(object?: ElementConstructorTagObject<'h2'>) {
  return new ElementConstructor('h2', object)
}

export function h3(object?: ElementConstructorTagObject<'h3'>) {
  return new ElementConstructor('h3', object)
}

export function h4(object?: ElementConstructorTagObject<'h4'>) {
  return new ElementConstructor('h4', object)
}

export function h5(object?: ElementConstructorTagObject<'h5'>) {
  return new ElementConstructor('h5', object)
}

export function h6(object?: ElementConstructorTagObject<'h6'>) {
  return new ElementConstructor('h6', object)
}

export function head(object?: ElementConstructorTagObject<'head'>) {
  return new ElementConstructor('head', object)
}

export function header(object?: ElementConstructorTagObject<'header'>) {
  return new ElementConstructor('header', object)
}

export function hgroup(object?: ElementConstructorTagObject<'hgroup'>) {
  return new ElementConstructor('hgroup', object)
}

export function hr(object?: ElementConstructorTagObject<'hr'>) {
  return new ElementConstructor('hr', object)
}

export function html(object?: ElementConstructorTagObject<'html'>) {
  return new ElementConstructor('html', object)
}

export function i(object?: ElementConstructorTagObject<'i'>) {
  return new ElementConstructor('i', object)
}

export function iframe(object?: ElementConstructorTagObject<'iframe'>) {
  return new ElementConstructor('iframe', object)
}

export function img(object?: ElementConstructorTagObject<'img'>) {
  return new ElementConstructor('img', object)
}

export function input(object?: ElementConstructorTagObject<'input'>) {
  return new ElementConstructor('input', object)
}

export function ins(object?: ElementConstructorTagObject<'ins'>) {
  return new ElementConstructor('ins', object)
}

export function kbd(object?: ElementConstructorTagObject<'kbd'>) {
  return new ElementConstructor('kbd', object)
}

export function label(object?: ElementConstructorTagObject<'label'>) {
  return new ElementConstructor('label', object)
}

export function legend(object?: ElementConstructorTagObject<'legend'>) {
  return new ElementConstructor('legend', object)
}

export function li(object?: ElementConstructorTagObject<'li'>) {
  return new ElementConstructor('li', object)
}

export function link(object?: ElementConstructorTagObject<'link'>) {
  return new ElementConstructor('link', object)
}

export function main(object?: ElementConstructorTagObject<'main'>) {
  return new ElementConstructor('main', object)
}

export function map(object?: ElementConstructorTagObject<'map'>) {
  return new ElementConstructor('map', object)
}

export function mark(object?: ElementConstructorTagObject<'mark'>) {
  return new ElementConstructor('mark', object)
}

export function menu(object?: ElementConstructorTagObject<'menu'>) {
  return new ElementConstructor('menu', object)
}

export function meta(object?: ElementConstructorTagObject<'meta'>) {
  return new ElementConstructor('meta', object)
}

export function meter(object?: ElementConstructorTagObject<'meter'>) {
  return new ElementConstructor('meter', object)
}

export function nav(object?: ElementConstructorTagObject<'nav'>) {
  return new ElementConstructor('nav', object)
}

export function noscript(object?: ElementConstructorTagObject<'noscript'>) {
  return new ElementConstructor('noscript', object)
}

export function object(object?: ElementConstructorTagObject<'object'>) {
  return new ElementConstructor('object', object)
}

export function ol(object?: ElementConstructorTagObject<'ol'>) {
  return new ElementConstructor('ol', object)
}

export function optgroup(object?: ElementConstructorTagObject<'optgroup'>) {
  return new ElementConstructor('optgroup', object)
}

export function option(object?: ElementConstructorTagObject<'option'>) {
  return new ElementConstructor('option', object)
}

export function output(object?: ElementConstructorTagObject<'output'>) {
  return new ElementConstructor('output', object)
}

export function p(object?: ElementConstructorTagObject<'p'>) {
  return new ElementConstructor('p', object)
}

export function picture(object?: ElementConstructorTagObject<'picture'>) {
  return new ElementConstructor('picture', object)
}

export function pre(object?: ElementConstructorTagObject<'pre'>) {
  return new ElementConstructor('pre', object)
}

export function progress(object?: ElementConstructorTagObject<'progress'>) {
  return new ElementConstructor('progress', object)
}

export function q(object?: ElementConstructorTagObject<'q'>) {
  return new ElementConstructor('q', object)
}

export function rp(object?: ElementConstructorTagObject<'rp'>) {
  return new ElementConstructor('rp', object)
}

export function rt(object?: ElementConstructorTagObject<'rt'>) {
  return new ElementConstructor('rt', object)
}

export function ruby(object?: ElementConstructorTagObject<'ruby'>) {
  return new ElementConstructor('ruby', object)
}

export function s(object?: ElementConstructorTagObject<'s'>) {
  return new ElementConstructor('s', object)
}

export function samp(object?: ElementConstructorTagObject<'samp'>) {
  return new ElementConstructor('samp', object)
}

export function script(object?: ElementConstructorTagObject<'script'>) {
  return new ElementConstructor('script', object)
}

export function search(object?: ElementConstructorTagObject<'search'>) {
  return new ElementConstructor('search', object)
}

export function section(object?: ElementConstructorTagObject<'section'>) {
  return new ElementConstructor('section', object)
}

export function select(object?: ElementConstructorTagObject<'select'>) {
  return new ElementConstructor('select', object)
}

export function slot(object?: ElementConstructorTagObject<'slot'>) {
  return new ElementConstructor('slot', object)
}

export function small(object?: ElementConstructorTagObject<'small'>) {
  return new ElementConstructor('small', object)
}

export function source(object?: ElementConstructorTagObject<'source'>) {
  return new ElementConstructor('source', object)
}

export function span(object?: ElementConstructorTagObject<'span'>) {
  return new ElementConstructor('span', object)
}

export function strong(object?: ElementConstructorTagObject<'strong'>) {
  return new ElementConstructor('strong', object)
}

export function style(object?: ElementConstructorJSS) {
  return new ElementConstructor<'style'>('style', {
    style: object,
  })
}

export function sub(object?: ElementConstructorTagObject<'sub'>) {
  return new ElementConstructor('sub', object)
}

export function summary(object?: ElementConstructorTagObject<'summary'>) {
  return new ElementConstructor('summary', object)
}

export function sup(object?: ElementConstructorTagObject<'sup'>) {
  return new ElementConstructor('sup', object)
}

export function table(object?: ElementConstructorTagObject<'table'>) {
  return new ElementConstructor('table', object)
}

export function tbody(object?: ElementConstructorTagObject<'tbody'>) {
  return new ElementConstructor('tbody', object)
}

export function td(object?: ElementConstructorTagObject<'td'>) {
  return new ElementConstructor('td', object)
}

export function template(object?: ElementConstructorTagObject<'template'>) {
  return new ElementConstructor('template', object)
}

export function textarea(object?: ElementConstructorTagObject<'textarea'>) {
  return new ElementConstructor('textarea', object)
}

export function tfoot(object?: ElementConstructorTagObject<'tfoot'>) {
  return new ElementConstructor('tfoot', object)
}

export function th(object?: ElementConstructorTagObject<'th'>) {
  return new ElementConstructor('th', object)
}

export function thead(object?: ElementConstructorTagObject<'thead'>) {
  return new ElementConstructor('thead', object)
}

export function time(object?: ElementConstructorTagObject<'time'>) {
  return new ElementConstructor('time', object)
}

export function title(object?: ElementConstructorTagObject<'title'>) {
  return new ElementConstructor('title', object)
}

export function tr(object?: ElementConstructorTagObject<'tr'>) {
  return new ElementConstructor('tr', object)
}

export function track(object?: ElementConstructorTagObject<'track'>) {
  return new ElementConstructor('track', object)
}

export function u(object?: ElementConstructorTagObject<'u'>) {
  return new ElementConstructor('u', object)
}

export function ul(object?: ElementConstructorTagObject<'ul'>) {
  return new ElementConstructor('ul', object)
}

export function htmlVar(object?: ElementConstructorTagObject<'var'>) {
  return new ElementConstructor('var', object)
}

export function video(object?: ElementConstructorTagObject<'video'>) {
  return new ElementConstructor('video', object)
}

export function wbr(object?: ElementConstructorTagObject<'wbr'>) {
  return new ElementConstructor('wbr', object)
}

export function fragment(object?: ElementConstructorTagObject<Node>) {
  return new ElementConstructor(document.createDocumentFragment(), object)
}

export function contents(object?: ElementConstructorTagObject<'div'>) {
  return new ElementConstructor('div', {
    ...object,
    style: {
      display: 'contents',
      ...object?.style,
    },
  })
}
