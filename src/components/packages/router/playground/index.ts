import { Router } from '..'

console.log('Playground')

const router = new Router({
  base: '/components/packages/router/playground',
})

router.defineRoute('/', () => import('./HomeRoute'))
router.defineRoute('/about', () => import('./AboutRoute'))
