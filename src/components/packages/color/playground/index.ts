import { Color } from '../Color'
import { DocumentColors } from '../DocumentColors'

const color1 = new Color('#ff0000')
const color2 = new Color('#00ff00')

const documentColors = new DocumentColors()
console.log(documentColors.get('--color-red')?.hex)
