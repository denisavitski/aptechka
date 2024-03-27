import { Router } from '..'

const router = new Router({
  base: '/components/packages/router/playground',
})

router.defineRoute('*', () => import('./Layout'))
router.defineRoute('/', () => import('./Home'))
router.defineRoute('/about', () => import('./About'))
router.defineRoute('/contacts', () => import('./Contacts'))
