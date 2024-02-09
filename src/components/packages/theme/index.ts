import { createTheme, style } from '@packages/element-constructor'
import { isBrowser } from '@packages/utils'

export const aptechkaTheme = createTheme(
  {
    colorDark: '#1c1c1c',
    colorDarkAux: '#282828',
    colorLight: '#ffffff',
    colorActive: '#00E5B0',

    tweakerWidth: '480px',
    tweakerOffset: '20px',
    tweakerFolderHeight: '40px',

    heightInput: '30px',

    borderRadius: '12px',

    gapLarge: '16px',
    gapMedium: '12px',
    gapSmall: '8px',
    gapExtraSmall: '4px',

    fontSizeLarge: '20px',
    fontSizeMedium: '16px',
    fontSizeSmall: '14px',

    durationShort: '0.2s',
  } as const,
  { prefix: 'aptechka-' }
)

if (isBrowser) {
  document.head.appendChild(
    style({
      ':root': aptechkaTheme.style,
    }).rootElements[0]
  )
}
