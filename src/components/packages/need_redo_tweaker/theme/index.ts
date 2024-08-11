import { createTheme, style } from '../element-constructor'
import { isBrowser } from '@packages/utils'

export const aptechkaTheme = createTheme(
  {
    colorMain: '#1c1c1c',
    colorMainAux: '#282828',
    colorFont: '#ffffff',
    colorActive: '#00E5B0',
    borderRadius: '12px',
    borderRadiusSmall: '4px',
  } as const,
  { prefix: 'aptechka-' }
)

if (isBrowser) {
  const styleNode = style({
    ':root': aptechkaTheme.style,
  }).node

  styleNode.setAttribute('data-permanent', '')

  document.head.appendChild(styleNode)
}
