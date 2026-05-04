import { useEffect, useState } from 'react'
import CardInventoryPage from './pages/CardInventoryPage'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import MarketPage from './pages/MarketPage'
import PackInventoryPage from './pages/PackInventoryPage'
import RegisterPage from './pages/RegisterPage'

function installClientSideNavigation() {
  const handler = (event: MouseEvent) => {
    const target = event.target

    if (!(target instanceof Element)) {
      return
    }

    const anchor = target.closest('a[href]') as HTMLAnchorElement | null

    if (!anchor) {
      return
    }

    const href = anchor.getAttribute('href')

    if (!href || !href.startsWith('/')) {
      return
    }

    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  document.addEventListener('click', handler)

  return () => {
    document.removeEventListener('click', handler)
  }
}

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname)
    const removeNavigation = installClientSideNavigation()

    window.addEventListener('popstate', syncPath)

    return () => {
      removeNavigation()
      window.removeEventListener('popstate', syncPath)
    }
  }, [])

  if (path === '/login') {
    return <LoginPage />
  }

  if (path === '/register') {
    return <RegisterPage />
  }

  if (path === '/home') {
    return <HomePage />
  }

  if (path === '/packs') {
    return <PackInventoryPage />
  }

  if (path === '/cards') {
    return <CardInventoryPage />
  }

  if (path === '/market') {
    return <MarketPage />
  }

  return <LandingPage />
}

export default App
