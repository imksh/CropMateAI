import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/layouts/AppLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import Lenis from "lenis";
import { Predict } from "./pages/Predict";
import { RecentPredictions } from "./pages/RecentPredictions";

function App() {
  // Keep smooth scrolling lightweight and centralized.
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/predict",
          element: <Predict />,
        },
        {
          path: "/recent-predictions",
          element: <RecentPredictions />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
