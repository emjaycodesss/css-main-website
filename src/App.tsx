import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { SmoothScrollProvider } from './shared/providers/SmoothScrollProvider';

function App() {
  return (
    <Router>
      {/* Optional: wrap with SmoothScrollProvider to unify Lenis + GSAP ScrollTrigger + Framer Motion. See docs/LENIS_SMOOTH_SCROLL.md */}
      <SmoothScrollProvider>
        <div className="min-h-screen flex flex-col text-white">
          <AppRoutes />
        </div>
      </SmoothScrollProvider>
    </Router>
  );
}

export default App
