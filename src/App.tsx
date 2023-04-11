import React from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Suspense } from 'react';
const AppLayout = React.lazy(() => import("src/layouts/AppLayout"));
const HomePage = React.lazy(() => import("src/pages/HomePage"));
const RanchPage = React.lazy(() => import("src/pages/RanchPage"));
const AnimalsPage = React.lazy(() => import("src/pages/AnimalsPage"));
const LandPage = React.lazy(() => import("src/pages/LandPage"));
const NewFarm = React.lazy(() => import("src/pages/NewFarmPage"));
const NewRanch = React.lazy(() => import("src/pages/NewRanchPage"));
const NewAnimal = React.lazy(() => import("src/pages/NewAnimalPage"));
const NewLand = React.lazy(() => import("src/pages/NewLandPage"));
const AnimalData = React.lazy(() => import("src/pages/AnimalDataPage"));
const NotFound = React.lazy(() => import("src/pages/NotFoundPage"));

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
        <Route path="farms/new" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NewFarm />
            </AppLayout>
          </Suspense>
        } />
        <Route path="farms/edit/:id" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NewFarm />
            </AppLayout>
          </Suspense>
        } />
        <Route path="animal/:id" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <AnimalData />
            </AppLayout>
          </Suspense>
        } />
        <Route path="animals/:id" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <AnimalsPage />
            </AppLayout>
          </Suspense>
        } />
        <Route path="animals/new" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NewAnimal />
            </AppLayout>
          </Suspense>
        } />
        <Route path="animals/edit/:id" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NewAnimal />
            </AppLayout>
          </Suspense>
        } />
        <Route path="ranches/:id" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <RanchPage />
            </AppLayout>
          </Suspense>
        } />
        <Route path="ranches/new" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NewRanch />
            </AppLayout>
          </Suspense>
        } />
        <Route path="ranches/edit/:id" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NewRanch />
            </AppLayout>
          </Suspense>
        } />
        <Route path="lands/:id" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <LandPage />
            </AppLayout>
          </Suspense>
        } />
        <Route path="lands/new" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NewLand />
            </AppLayout>
          </Suspense>
        } />
        <Route path="lands/edit/:id" element={
          <Suspense fallback={<div>loading ...</div>}>
            <AppLayout>
              <NewLand />
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
