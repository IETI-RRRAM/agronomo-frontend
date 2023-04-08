import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Suspense } from 'react';
const HomePage = React.lazy(() => import("src/pages/HomePage"));
const RanchPage = React.lazy(() => import("src/pages/RanchPage"));
const NotFound = React.lazy(() => import("src/pages/NotFoundPage"));
const AppLayout = React.lazy(() => import("src/layouts/AppLayout"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <HomePage />
            </AppLayout>
          </Suspense>
        } />
        <Route path="ranches" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <RanchPage />
              <RanchPage />
              <RanchPage />
              <RanchPage />
              <RanchPage />
            </AppLayout>
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NotFound />
            </AppLayout>
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
