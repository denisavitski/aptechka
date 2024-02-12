import {
  ElementConstructorTagObject,
  ElementConstructor,
  ElementConstructorJSS,
  ElementConstructorTagNames,
} from './ElementConstructor'

export type HTMLConstructorTagObject<T extends ElementConstructorTagNames> =
  Omit<ElementConstructorTagObject<T>, 'svg'>

export function a(object?: HTMLConstructorTagObject<'a'>) {
  return new ElementConstructor({
    a: object,
  })
}

export function abbr(object?: HTMLConstructorTagObject<'abbr'>) {
  return new ElementConstructor({
    abbr: object,
  })
}

export function address(object?: HTMLConstructorTagObject<'address'>) {
  return new ElementConstructor({
    address: object,
  })
}

export function area(object?: HTMLConstructorTagObject<'area'>) {
  return new ElementConstructor({
    area: object,
  })
}

export function article(object?: HTMLConstructorTagObject<'article'>) {
  return new ElementConstructor({
    article: object,
  })
}

export function aside(object?: HTMLConstructorTagObject<'aside'>) {
  return new ElementConstructor({
    aside: object,
  })
}

export function audio(object?: HTMLConstructorTagObject<'audio'>) {
  return new ElementConstructor({
    audio: object,
  })
}

export function b(object?: HTMLConstructorTagObject<'b'>) {
  return new ElementConstructor({
    b: object,
  })
}

export function base(object?: HTMLConstructorTagObject<'base'>) {
  return new ElementConstructor({
    base: object,
  })
}

export function bdi(object?: HTMLConstructorTagObject<'bdi'>) {
  return new ElementConstructor({
    bdi: object,
  })
}

export function bdo(object?: HTMLConstructorTagObject<'bdo'>) {
  return new ElementConstructor({
    bdo: object,
  })
}

export function blockquote(object?: HTMLConstructorTagObject<'blockquote'>) {
  return new ElementConstructor({
    blockquote: object,
  })
}

export function body(object?: HTMLConstructorTagObject<'body'>) {
  return new ElementConstructor({
    body: object,
  })
}

export function br(object?: HTMLConstructorTagObject<'br'>) {
  return new ElementConstructor({
    br: object,
  })
}

export function button(object?: HTMLConstructorTagObject<'button'>) {
  return new ElementConstructor({
    button: object,
  })
}

export function canvas(object?: HTMLConstructorTagObject<'canvas'>) {
  return new ElementConstructor({
    canvas: object,
  })
}

export function caption(object?: HTMLConstructorTagObject<'caption'>) {
  return new ElementConstructor({
    caption: object,
  })
}

export function cite(object?: HTMLConstructorTagObject<'cite'>) {
  return new ElementConstructor({
    cite: object,
  })
}

export function code(object?: HTMLConstructorTagObject<'code'>) {
  return new ElementConstructor({
    code: object,
  })
}

export function col(object?: HTMLConstructorTagObject<'col'>) {
  return new ElementConstructor({
    col: object,
  })
}

export function colgroup(object?: HTMLConstructorTagObject<'colgroup'>) {
  return new ElementConstructor({
    colgroup: object,
  })
}

export function data(object?: HTMLConstructorTagObject<'data'>) {
  return new ElementConstructor({
    data: object,
  })
}

export function datalist(object?: HTMLConstructorTagObject<'datalist'>) {
  return new ElementConstructor({
    datalist: object,
  })
}

export function dd(object?: HTMLConstructorTagObject<'dd'>) {
  return new ElementConstructor({
    dd: object,
  })
}

export function del(object?: HTMLConstructorTagObject<'del'>) {
  return new ElementConstructor({
    del: object,
  })
}

export function details(object?: HTMLConstructorTagObject<'details'>) {
  return new ElementConstructor({
    details: object,
  })
}

export function dfn(object?: HTMLConstructorTagObject<'dfn'>) {
  return new ElementConstructor({
    dfn: object,
  })
}

export function dialog(object?: HTMLConstructorTagObject<'dialog'>) {
  return new ElementConstructor({
    dialog: object,
  })
}

export function div(object?: HTMLConstructorTagObject<'div'>) {
  return new ElementConstructor({
    div: object,
  })
}

export function dl(object?: HTMLConstructorTagObject<'dl'>) {
  return new ElementConstructor({
    dl: object,
  })
}

export function dt(object?: HTMLConstructorTagObject<'dt'>) {
  return new ElementConstructor({
    dt: object,
  })
}

export function em(object?: HTMLConstructorTagObject<'em'>) {
  return new ElementConstructor({
    em: object,
  })
}

export function embed(object?: HTMLConstructorTagObject<'embed'>) {
  return new ElementConstructor({
    embed: object,
  })
}

export function fieldset(object?: HTMLConstructorTagObject<'fieldset'>) {
  return new ElementConstructor({
    fieldset: object,
  })
}

export function figcaption(object?: HTMLConstructorTagObject<'figcaption'>) {
  return new ElementConstructor({
    figcaption: object,
  })
}

export function figure(object?: HTMLConstructorTagObject<'figure'>) {
  return new ElementConstructor({
    figure: object,
  })
}

export function footer(object?: HTMLConstructorTagObject<'footer'>) {
  return new ElementConstructor({
    footer: object,
  })
}

export function form(object?: HTMLConstructorTagObject<'form'>) {
  return new ElementConstructor({
    form: object,
  })
}

export function h1(object?: HTMLConstructorTagObject<'h1'>) {
  return new ElementConstructor({
    h1: object,
  })
}

export function h2(object?: HTMLConstructorTagObject<'h2'>) {
  return new ElementConstructor({
    h2: object,
  })
}

export function h3(object?: HTMLConstructorTagObject<'h3'>) {
  return new ElementConstructor({
    h3: object,
  })
}

export function h4(object?: HTMLConstructorTagObject<'h4'>) {
  return new ElementConstructor({
    h4: object,
  })
}

export function h5(object?: HTMLConstructorTagObject<'h5'>) {
  return new ElementConstructor({
    h5: object,
  })
}

export function h6(object?: HTMLConstructorTagObject<'h6'>) {
  return new ElementConstructor({
    h6: object,
  })
}

export function head(object?: HTMLConstructorTagObject<'head'>) {
  return new ElementConstructor({
    head: object,
  })
}

export function header(object?: HTMLConstructorTagObject<'header'>) {
  return new ElementConstructor({
    header: object,
  })
}

export function hgroup(object?: HTMLConstructorTagObject<'hgroup'>) {
  return new ElementConstructor({
    hgroup: object,
  })
}

export function hr(object?: HTMLConstructorTagObject<'hr'>) {
  return new ElementConstructor({
    hr: object,
  })
}

export function html(object?: HTMLConstructorTagObject<'html'>) {
  return new ElementConstructor({
    html: object,
  })
}

export function i(object?: HTMLConstructorTagObject<'i'>) {
  return new ElementConstructor({
    i: object,
  })
}

export function iframe(object?: HTMLConstructorTagObject<'iframe'>) {
  return new ElementConstructor({
    iframe: object,
  })
}

export function img(object?: HTMLConstructorTagObject<'img'>) {
  return new ElementConstructor({
    img: object,
  })
}

export function input(object?: HTMLConstructorTagObject<'input'>) {
  return new ElementConstructor({
    input: object,
  })
}

export function ins(object?: HTMLConstructorTagObject<'ins'>) {
  return new ElementConstructor({
    ins: object,
  })
}

export function kbd(object?: HTMLConstructorTagObject<'kbd'>) {
  return new ElementConstructor({
    kbd: object,
  })
}

export function label(object?: HTMLConstructorTagObject<'label'>) {
  return new ElementConstructor({
    label: object,
  })
}

export function legend(object?: HTMLConstructorTagObject<'legend'>) {
  return new ElementConstructor({
    legend: object,
  })
}

export function li(object?: HTMLConstructorTagObject<'li'>) {
  return new ElementConstructor({
    li: object,
  })
}

export function link(object?: HTMLConstructorTagObject<'link'>) {
  return new ElementConstructor({
    link: object,
  })
}

export function main(object?: HTMLConstructorTagObject<'main'>) {
  return new ElementConstructor({
    main: object,
  })
}

export function map(object?: HTMLConstructorTagObject<'map'>) {
  return new ElementConstructor({
    map: object,
  })
}

export function mark(object?: HTMLConstructorTagObject<'mark'>) {
  return new ElementConstructor({
    mark: object,
  })
}

export function menu(object?: HTMLConstructorTagObject<'menu'>) {
  return new ElementConstructor({
    menu: object,
  })
}

export function meta(object?: HTMLConstructorTagObject<'meta'>) {
  return new ElementConstructor({
    meta: object,
  })
}

export function meter(object?: HTMLConstructorTagObject<'meter'>) {
  return new ElementConstructor({
    meter: object,
  })
}

export function nav(object?: HTMLConstructorTagObject<'nav'>) {
  return new ElementConstructor({
    nav: object,
  })
}

export function noscript(object?: HTMLConstructorTagObject<'noscript'>) {
  return new ElementConstructor({
    noscript: object,
  })
}

export function object(object?: HTMLConstructorTagObject<'object'>) {
  return new ElementConstructor({
    object: object,
  })
}

export function ol(object?: HTMLConstructorTagObject<'ol'>) {
  return new ElementConstructor({
    ol: object,
  })
}

export function optgroup(object?: HTMLConstructorTagObject<'optgroup'>) {
  return new ElementConstructor({
    optgroup: object,
  })
}

export function option(object?: HTMLConstructorTagObject<'option'>) {
  return new ElementConstructor({
    option: object,
  })
}

export function output(object?: HTMLConstructorTagObject<'output'>) {
  return new ElementConstructor({
    output: object,
  })
}

export function p(object?: HTMLConstructorTagObject<'p'>) {
  return new ElementConstructor({
    p: object,
  })
}

export function picture(object?: HTMLConstructorTagObject<'picture'>) {
  return new ElementConstructor({
    picture: object,
  })
}

export function pre(object?: HTMLConstructorTagObject<'pre'>) {
  return new ElementConstructor({
    pre: object,
  })
}

export function progress(object?: HTMLConstructorTagObject<'progress'>) {
  return new ElementConstructor({
    progress: object,
  })
}

export function q(object?: HTMLConstructorTagObject<'q'>) {
  return new ElementConstructor({
    q: object,
  })
}

export function rp(object?: HTMLConstructorTagObject<'rp'>) {
  return new ElementConstructor({
    rp: object,
  })
}

export function rt(object?: HTMLConstructorTagObject<'rt'>) {
  return new ElementConstructor({
    rt: object,
  })
}

export function ruby(object?: HTMLConstructorTagObject<'ruby'>) {
  return new ElementConstructor({
    ruby: object,
  })
}

export function s(object?: HTMLConstructorTagObject<'s'>) {
  return new ElementConstructor({
    s: object,
  })
}

export function samp(object?: HTMLConstructorTagObject<'samp'>) {
  return new ElementConstructor({
    samp: object,
  })
}

export function script(object?: HTMLConstructorTagObject<'script'>) {
  return new ElementConstructor({
    script: object,
  })
}

export function search(object?: HTMLConstructorTagObject<'search'>) {
  return new ElementConstructor({
    search: object,
  })
}

export function section(object?: HTMLConstructorTagObject<'section'>) {
  return new ElementConstructor({
    section: object,
  })
}

export function select(object?: HTMLConstructorTagObject<'select'>) {
  return new ElementConstructor({
    select: object,
  })
}

export function slot(object?: HTMLConstructorTagObject<'slot'>) {
  return new ElementConstructor({
    slot: object,
  })
}

export function small(object?: HTMLConstructorTagObject<'small'>) {
  return new ElementConstructor({
    small: object,
  })
}

export function source(object?: HTMLConstructorTagObject<'source'>) {
  return new ElementConstructor({
    source: object,
  })
}

export function span(object?: HTMLConstructorTagObject<'span'>) {
  return new ElementConstructor({
    span: object,
  })
}

export function strong(object?: HTMLConstructorTagObject<'strong'>) {
  return new ElementConstructor({
    strong: object,
  })
}

export function style(object?: ElementConstructorJSS) {
  return new ElementConstructor<'style'>({
    style: {
      style: object,
    },
  })
}

export function sub(object?: HTMLConstructorTagObject<'sub'>) {
  return new ElementConstructor({
    sub: object,
  })
}

export function summary(object?: HTMLConstructorTagObject<'summary'>) {
  return new ElementConstructor({
    summary: object,
  })
}

export function sup(object?: HTMLConstructorTagObject<'sup'>) {
  return new ElementConstructor({
    sup: object,
  })
}

export function table(object?: HTMLConstructorTagObject<'table'>) {
  return new ElementConstructor({
    table: object,
  })
}

export function tbody(object?: HTMLConstructorTagObject<'tbody'>) {
  return new ElementConstructor({
    tbody: object,
  })
}

export function td(object?: HTMLConstructorTagObject<'td'>) {
  return new ElementConstructor({
    td: object,
  })
}

export function template(object?: HTMLConstructorTagObject<'template'>) {
  return new ElementConstructor({
    template: object,
  })
}

export function textarea(object?: HTMLConstructorTagObject<'textarea'>) {
  return new ElementConstructor({
    textarea: object,
  })
}

export function tfoot(object?: HTMLConstructorTagObject<'tfoot'>) {
  return new ElementConstructor({
    tfoot: object,
  })
}

export function th(object?: HTMLConstructorTagObject<'th'>) {
  return new ElementConstructor({
    th: object,
  })
}

export function thead(object?: HTMLConstructorTagObject<'thead'>) {
  return new ElementConstructor({
    thead: object,
  })
}

export function time(object?: HTMLConstructorTagObject<'time'>) {
  return new ElementConstructor({
    time: object,
  })
}

export function title(object?: HTMLConstructorTagObject<'title'>) {
  return new ElementConstructor({
    title: object,
  })
}

export function tr(object?: HTMLConstructorTagObject<'tr'>) {
  return new ElementConstructor({
    tr: object,
  })
}

export function track(object?: HTMLConstructorTagObject<'track'>) {
  return new ElementConstructor({
    track: object,
  })
}

export function u(object?: HTMLConstructorTagObject<'u'>) {
  return new ElementConstructor({
    u: object,
  })
}

export function ul(object?: HTMLConstructorTagObject<'ul'>) {
  return new ElementConstructor({
    ul: object,
  })
}

export function htmlVar(object?: HTMLConstructorTagObject<'var'>) {
  return new ElementConstructor({
    var: object,
  })
}

export function video(object?: HTMLConstructorTagObject<'video'>) {
  return new ElementConstructor({
    video: object,
  })
}

export function wbr(object?: HTMLConstructorTagObject<'wbr'>) {
  return new ElementConstructor({
    wbr: object,
  })
}

export function custom<
  T extends Extract<ElementConstructorTagNames, `e-${string}`>
>(tag: T, object?: HTMLConstructorTagObject<T>) {
  return new ElementConstructor({
    [tag]: object,
  })
}
