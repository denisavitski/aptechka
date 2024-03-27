import { element, span } from '@packages/element-constructor'

const node = element('div', {
  children: element('e-select', {
    lightChildren: [
      element('e-select-head', {
        children: [
          span({
            'data-value-holder': '',
          }),
        ],
      }),
      ...[1, 2, 3].map((v, i) =>
        element('e-select-option', {
          lightChildren: v,
          default: i === 0 ? true : null,
        })
      ),
    ],
  }),
})

document.body.appendChild(node.node)
