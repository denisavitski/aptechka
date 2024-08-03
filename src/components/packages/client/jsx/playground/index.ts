import { Router } from '@packages/client/router'
import { user } from './user'

const router = new Router({
  base: '/components/packages/jsx/playground/',
})

router.defineRoute('*', () => import('./routes/Layout'))
router.defineRoute('/', () => import('./routes/Home'))
router.defineRoute('/about', () => import('./routes/About'))
router.defineRoute('/admin', () => import('./routes/Admin'))
router.defineRoute('/login', () => import('./routes/Login'))

router.preprocessor = (e) => {
  if (e.path.leaf.includes('admin') && !user.current) {
    e.reject()

    router.navigate('/login')

    return
  } else if (e.path.leaf.includes('login') && user.current) {
    e.reject()

    return
  }

  e.resolve()
}

user.subscribe((e) => {
  if (e.current && !e.previous) {
    router.navigate('/admin')
  }
})
