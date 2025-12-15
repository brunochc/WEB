import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import Hyperspeed from '@/components/Hyperspeed'
import PillNav from '@/components/PillNav'
import logo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Background */}
      <Hyperspeed />

      {/* Overlay UI */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="w-full">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <PillNav
              logo={logo}
              logoAlt="Company Logo"
              items={[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' }
              ]}
              activeHref="/"
              className="custom-nav"
              ease="power2.easeOut"
              baseColor="#000000"
              pillColor="#ffffff"
              hoveredPillTextColor="#ffffff"
              pillTextColor="#000000"
            />
          </div>
        </header>

        {/* Hero */}
        <main className="flex-1">
          <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Build stunning UIs at lightspeed</h1>
              <p className="mt-4 text-muted-foreground">Prebuilt components with shadcn/ui, Tailwind CSS and a cinematic Hyperspeed background.</p>
              <div className="mt-6 flex gap-3">
                <Button size="lg">Start now</Button>
                <Button size="lg" variant="secondary" onClick={() => setCount((c)=>c+1)}>Counter {count}</Button>
              </div>
            </div>
          </section>

          {/* Example content card */}
          <section className="mx-auto max-w-5xl px-6 pb-24">
            <Card className="backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CardHeader>
                <CardTitle>What’s included</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li>Tailwind CSS v3 configured</li>
                  <li>shadcn/ui components (Button, Card)</li>
                  <li>Path alias @ to src</li>
                  <li>Full-screen Hyperspeed background</li>
                </ul>
              </CardContent>
              <CardFooter>
                <span className="text-xs text-muted-foreground">Customize the hero and navbar as needed.</span>
              </CardFooter>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Neon. All rights reserved.
        </footer>
      </div>
    </>
  )
}

export default App
