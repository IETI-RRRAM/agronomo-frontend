import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Suspense } from 'react';
const AppLayout = React.lazy(() => import("src/layouts/AppLayout"));
const HomePage = React.lazy(() => import("src/pages/HomePage"));
const RanchPage = React.lazy(() => import("src/pages/RanchPage"));
const LandPage = React.lazy(() => import("src/pages/LandPage"));
const NewFarm = React.lazy(() => import("src/pages/NewFarmPage"));
const NewRanch = React.lazy(() => import("src/pages/NewRanchPage"));
const NewLand = React.lazy(() => import("src/pages/NewLandPage"));
const NotFound = React.lazy(() => import("src/pages/NotFoundPage"));
const Loading = React.lazy(() => import("src/components/loading/Loading"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <HomePage />
            </AppLayout>
          </Suspense>
        } />
        <Route path="farms/new" element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <NewFarm />
            </AppLayout>
          </Suspense>
        } />
        <Route path="farms/edit/:id" element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <NewFarm />
            </AppLayout>
          </Suspense>
        } />
        <Route path="ranches/:id" element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <RanchPage />
            </AppLayout>
          </Suspense>
        } />
        <Route path="ranches/new" element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <NewRanch />
            </AppLayout>
          </Suspense>
        } />
        <Route path="ranches/edit/:id" element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <NewRanch />
            </AppLayout>
          </Suspense>
        } />
        <Route path="lands/:id" element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <LandPage />
            </AppLayout>
          </Suspense>
        } />
        <Route path="lands/new" element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <NewLand />
            </AppLayout>
          </Suspense>
        } />
        <Route path="lands/edit/:id" element={
          <Suspense fallback={<Loading />}>
            <AppLayout>
              <NewLand />
            </AppLayout>
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<Loading />}>
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
