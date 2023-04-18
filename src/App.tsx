import React, { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Suspense, useContext } from 'react';
import {AuthContext} from "src/components/contexts/AuthContext";
const AppLayout = React.lazy(() => import("src/layouts/AppLayout"));
const HomePage = React.lazy(() => import("src/pages/HomePage"));
const LoginPage = React.lazy(() => import("src/pages/LoginPage"));
const RanchPage = React.lazy(() => import("src/pages/RanchPage"));
const AnimalsPage = React.lazy(() => import("src/pages/AnimalsPage"));
const LandPage = React.lazy(() => import("src/pages/LandPage"));
const NewFarm = React.lazy(() => import("src/pages/NewFarmPage"));
const NewRanch = React.lazy(() => import("src/pages/NewRanchPage"));
const NewAnimal = React.lazy(() => import("src/pages/NewAnimalPage"));
const NewLand = React.lazy(() => import("src/pages/NewLandPage"));
const AnimalData = React.lazy(() => import("src/pages/AnimalDataPage"));
const NotFound = React.lazy(() => import("src/pages/NotFoundPage"));
const Loading = React.lazy(() => import("src/components/loading/Loading"));

function App() {
  const {token}: {token: string | undefined} = useContext(AuthContext);
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                {token ? <HomePage/> : <LoginPage/> }
              </AppLayout>
            </Suspense>
          } />
          <Route path="farms/new" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                {token ? <NewFarm /> : <LoginPage/> }
              </AppLayout>
            </Suspense>
          } />
          <Route path="farms/edit/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                {token ? <NewFarm /> : <LoginPage/> }
              </AppLayout>
            </Suspense>
          } />
          <Route path="ranches/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                {token ? <RanchPage /> : <LoginPage/> }
              </AppLayout>
            </Suspense>
          } />
          <Route path="ranches/new/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
               {token ? <NewRanch /> : <LoginPage/> }
              </AppLayout>
            </Suspense>
          } />
          <Route path="ranches/edit/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                {token ? <NewRanch /> : <LoginPage/> }
              </AppLayout>
            </Suspense>
          } />
          <Route path="lands/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                {token ? <LandPage /> : <LoginPage/> }
              </AppLayout>
            </Suspense>
          } />
          <Route path="lands/new/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                {token ? <NewLand /> : <LoginPage/> }
              </AppLayout>
            </Suspense>
          } />
          <Route path="lands/edit/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                {token ? <NewLand /> : <LoginPage/> }
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
          <Route path="animal/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                <AnimalData />
              </AppLayout>
            </Suspense>
          } />
          <Route path="animals/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                <AnimalsPage />
              </AppLayout>
            </Suspense>
          } />
          <Route path="animals/new" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                <NewAnimal />
              </AppLayout>
            </Suspense>
          } />
          <Route path="animals/edit/:id" element={
            <Suspense fallback={<Loading />}>
              <AppLayout>
                <NewAnimal />
              </AppLayout>
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
  );
}

export default App
