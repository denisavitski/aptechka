import { Router } from '@packages/router/Router.ts'

const router = new Router({
  base: '/components/packages/jsx/playground',
  trailingSlash: true,
  viewTransition: true,
})

router.defineRoute('*', () => import('./routes/Layout.tsx'))
router.defineRoute('/', () => import('./routes/Home.tsx'))
router.defineRoute('/about*', () => import('./routes/About.tsx'))
router.defineRoute('/about/company/', () => import('./routes/Company.tsx'))

router.run()
