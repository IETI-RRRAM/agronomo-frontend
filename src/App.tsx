import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Suspense } from 'react';
const HomePage = React.lazy(() => import("src/pages/HomePage"));
const RanchPage = React.lazy(() => import("src/pages/RanchPage"));
const NotFound = React.lazy(() => import("src/pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ranches">Ranches</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route index element={
            <Suspense fallback={<div>loading ...</div>}>
              <HomePage />
            </Suspense>
          } />
          <Route path="ranches" element={
            <Suspense fallback={<div>loading ...</div>}>
              <RanchPage />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<div>loading ...</div>}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
