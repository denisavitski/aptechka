import { Nav } from './Nav'

const Layout: JSX.Component = () => {
  return (
    <component>
      <Nav index={0}></Nav>
      <Nav index={1}></Nav>
      <Nav index={2}></Nav>
      <div data-nest></div>
    </component>
  )
}

export default Layout
