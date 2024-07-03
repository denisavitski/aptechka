import { Router } from '@packages/router'

const router = new Router({
  base: '/components/packages/jsx/playground',
})

router.defineRoute('*', () => import('./routes/Layout'))
router.defineRoute('/', () => import('./routes/Home'))
router.defineRoute('/about*', () => import('./routes/About'))
router.defineRoute('/about/news', () => import('./routes/News'))
