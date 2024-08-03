import { CSSProperty } from '..'

const v = new CSSProperty('#xxx', '--height', 0)

v.subscribe((e) => {
  console.log(e)
})
