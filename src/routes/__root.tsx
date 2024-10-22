import { Button } from '@/components/ui/button'
import { motion } from "framer-motion"
import { createRootRoute, Outlet, useMatch, useMatches } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Moon, Sun } from 'lucide-react'
import { FC, forwardRef, useEffect } from 'react'

const AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <motion.div ref={ref}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: .2 }}>
      <Outlet />
    </motion.div>
  );
});

const RootLayout: FC = () => {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  const matches = useMatches();
  const match = useMatch({ strict: false });
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
  const nextMatch = matches[nextMatchIndex];

  return (
    <main>
      <div className="p-2 flex justify-end items-center">
        {/* <div className="flex gap-2 justify-center items-center">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div> */}
        <div className="flex gap-2 justify-center items-center float-end">
          <Button onClick={toggleTheme} variant='fidelity' size={'icon'} className='p-2.5 rounded-none'>
            <div className='hidden dark:block'>
              <Moon />
            </div>
            <div className='block dark:hidden'>
              <Sun />
            </div>
          </Button>
        </div>
      </div>
      <AnimatedOutlet key={nextMatch.id} />
      <TanStackRouterDevtools />
    </main>
  )
}

export const Route = createRootRoute({
  component: RootLayout
})
