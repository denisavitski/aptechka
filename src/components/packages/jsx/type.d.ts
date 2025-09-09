import type { Store } from '@packages/store'
import type { ClassListInput } from './utils/attributes/class'
import type { StyleAttribute } from './utils/attributes/style'

declare global {
  type StoreOr<T> = T | Store<T | null | undefined>

  namespace JSX {
    export type Children = Array<
      | Element
      | string
      | number
      | null
      | undefined
      | Store<any>
      | Array<Children>
      | void
    >

    type Fragment = any

    type StoreOr<T> = T | Store<any>

    type Ref<T = unknown> = { value: T }

    type ComponentBaseProps = {
      children?: Children | Children[number]
    }

    type Component<TProps extends object = object> = {
      formAssociated?: boolean
      template?: boolean
      (props: ComponentBaseProps & TProps): Children[number]
    }

    type EventMap = keyof HTMLElementEventMap | keyof SVGElementEventMap

    type Events = Partial<{
      [K in `on${Capitalize<EventMap>}`]: (
        event: (HTMLElementEventMap & SVGElementEventMap)[Extract<
          Uncapitalize<Extract<K, `on${string}`>>,
          EventMap
        >],
      ) => void
    }>

    interface KnownAttributes {
      accept?: StoreOr<string>
      acceptCharset?: StoreOr<string>
      accessKey?: StoreOr<string>
      action?: StoreOr<string>
      allowFullScreen?: StoreOr<boolean>
      allowTransparency?: StoreOr<boolean>
      alt?: StoreOr<string>
      as?: StoreOr<string>
      async?: StoreOr<boolean>
      autocomplete?: StoreOr<string>
      autoComplete?: StoreOr<string>
      autocorrect?: StoreOr<string>
      autoCorrect?: StoreOr<string>
      autofocus?: StoreOr<boolean>
      autoFocus?: StoreOr<boolean>
      autoPlay?: StoreOr<boolean>
      capture?: StoreOr<boolean | string>
      cellPadding?: StoreOr<number | string>
      cellSpacing?: StoreOr<number | string>
      charSet?: StoreOr<string>
      challenge?: StoreOr<string>
      checked?: StoreOr<boolean>
      class?: ClassListInput
      className?: ClassListInput
      cols?: StoreOr<number>
      colSpan?: StoreOr<number>
      content?: StoreOr<string>
      contentEditable?: StoreOr<boolean>
      contextMenu?: StoreOr<string>
      controls?: StoreOr<boolean>
      controlsList?: StoreOr<string>
      coords?: StoreOr<string>
      crossOrigin?: StoreOr<string>
      data?: StoreOr<string>
      dateTime?: StoreOr<string>
      default?: StoreOr<boolean>
      defer?: StoreOr<boolean>
      dir?: StoreOr<'auto' | 'rtl' | 'ltr'>
      disabled?: StoreOr<boolean>
      disableRemotePlayback?: StoreOr<boolean>
      download?: StoreOr<string>
      draggable?: StoreOr<'false' | true>
      encType?: StoreOr<string>
      form?: StoreOr<string>
      formAction?: StoreOr<string>
      formEncType?: StoreOr<string>
      formMethod?: StoreOr<string>
      formNoValidate?: StoreOr<boolean>
      formTarget?: StoreOr<string>
      frameBorder?: StoreOr<number | string>
      headers?: StoreOr<string>
      height?: StoreOr<number | string>
      hidden?: StoreOr<boolean>
      high?: StoreOr<number>
      href?: StoreOr<string>
      hrefLang?: StoreOr<string>
      for?: StoreOr<string>
      htmlFor?: StoreOr<string>
      httpEquiv?: StoreOr<string>
      icon?: StoreOr<string>
      id?: StoreOr<string>
      inputMode?: StoreOr<string>
      integrity?: StoreOr<string>
      is?: StoreOr<string>
      keyParams?: StoreOr<string>
      keyType?: StoreOr<string>
      kind?: StoreOr<string>
      label?: StoreOr<string>
      lang?: StoreOr<string>
      list?: StoreOr<string>
      loading?: StoreOr<'eager' | 'lazy'>
      loop?: StoreOr<boolean>
      low?: StoreOr<number>
      manifest?: StoreOr<string>
      marginHeight?: StoreOr<number>
      marginWidth?: StoreOr<number>
      max?: StoreOr<number | string>
      maxLength?: StoreOr<number>
      media?: StoreOr<string>
      mediaGroup?: StoreOr<string>
      method?: StoreOr<string>
      min?: StoreOr<number | string>
      minLength?: StoreOr<number>
      multiple?: StoreOr<boolean>
      muted?: StoreOr<boolean>
      name?: StoreOr<string>
      nonce?: StoreOr<string>
      noValidate?: StoreOr<boolean>
      open?: StoreOr<boolean>
      optimum?: StoreOr<number>
      pattern?: StoreOr<string>
      placeholder?: StoreOr<string>
      playsInline?: StoreOr<boolean>
      poster?: StoreOr<string>
      preload?: StoreOr<string>
      radioGroup?: StoreOr<string>
      readOnly?: StoreOr<boolean>
      rel?: StoreOr<string>
      required?: StoreOr<boolean>
      role?: StoreOr<string>
      rows?: StoreOr<number>
      rowSpan?: StoreOr<number>
      sandbox?: StoreOr<string>
      scope?: StoreOr<string>
      scoped?: StoreOr<boolean>
      scrolling?: StoreOr<string>
      seamless?: StoreOr<boolean>
      selected?: StoreOr<boolean>
      shape?: StoreOr<string>
      size?: StoreOr<number>
      sizes?: StoreOr<string>
      slot?: StoreOr<string>
      span?: StoreOr<number>
      spellcheck?: StoreOr<boolean>
      src?: StoreOr<string>
      srcset?: StoreOr<string>
      srcDoc?: StoreOr<string>
      srcLang?: StoreOr<string>
      srcSet?: StoreOr<string>
      start?: StoreOr<number>
      step?: StoreOr<number | string>
      style?: StyleAttribute | string
      summary?: StoreOr<string>
      tabIndex?: StoreOr<number>
      target?: StoreOr<string>
      title?: StoreOr<string>
      type?: StoreOr<string>
      useMap?: StoreOr<string>
      value?: StoreOr<string | string[] | number>
      volume?: StoreOr<number>
      width?: StoreOr<number | string>
      wmode?: StoreOr<string>
      wrap?: StoreOr<string>

      about?: StoreOr<string>
      datatype?: StoreOr<string>
      inlist?: StoreOr<boolean>
      prefix?: StoreOr<string>
      property?: StoreOr<string>
      resource?: StoreOr<string>
      typeof?: StoreOr<string>
      vocab?: StoreOr<string>

      itemProp?: StoreOr<string>
      itemScope?: StoreOr<boolean>
      itemType?: StoreOr<string>
      itemID?: StoreOr<string>
      itemRef?: StoreOr<string>

      ref?: Ref<any> | Array<Ref<any>>
      key?: string
      setHtml?: any
    }

    type UnknownAttributes = { [key: string]: any }

    type Attributes = KnownAttributes &
      Events & {
        [key: string]: any
      } & UnknownAttributes

    type TagNameMap =
      | 'component'
      | 'shadow'
      | 'nest'
      | `${string}-${string}`
      | keyof HTMLElementTagNameMap
      | keyof SVGElementTagNameMap

    type IntrinsicElementsHTML = {
      [TKey in TagNameMap]?: Attributes
    }

    type IntrinsicElements = IntrinsicElementsHTML
  }

  interface Node {
    __storeId: string
    __key: string
  }

  var Fragment: {
    (props: { children?: any }): any
  }
}
