import React, { useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Suspense, useContext } from 'react';
import {AuthContext} from "src/components/contexts/AuthContext";
const AppLayout = React.lazy(() => import("src/layouts/AppLayout"));
const HomePage = React.lazy(() => import("src/pages/HomePage"));
const LoginPage = React.lazy(() => import("src/pages/LoginPage"));
const RanchPage = React.lazy(() => import("src/pages/RanchPage"));
const LandPage = React.lazy(() => import("src/pages/LandPage"));
const NewFarm = React.lazy(() => import("src/pages/NewFarmPage"));
const NewRanch = React.lazy(() => import("src/pages/NewRanchPage"));
const NewLand = React.lazy(() => import("src/pages/NewLandPage"));
const NotFound = React.lazy(() => import("src/pages/NotFoundPage"));

function App() {
  const {token}: {token: string | undefined} = useContext(AuthContext);
  return (
      <BrowserRouter>
        <Routes>
          <Route index element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <LoginPage/>}
              </AppLayout>
            </Suspense>
          } />
          <Route path="farms/new" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <NewFarm />}
              </AppLayout>
            </Suspense>
          } />
          <Route path="farms/edit/:id" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <NewFarm />}
              </AppLayout>
            </Suspense>
          } />
          <Route path="ranches/:id" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <RanchPage />}
              </AppLayout>
            </Suspense>
          } />
          <Route path="ranches/new" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
               {token ? <HomePage/> : <NewRanch />}
              </AppLayout>
            </Suspense>
          } />
          <Route path="ranches/edit/:id" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <NewRanch />}
              </AppLayout>
            </Suspense>
          } />
          <Route path="lands/:id" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <LandPage />}
              </AppLayout>
            </Suspense>
          } />
          <Route path="lands/new" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <NewLand />}
              </AppLayout>
            </Suspense>
          } />
          <Route path="lands/edit/:id" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <NewLand />}
              </AppLayout>
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<div>loading ...</div>}>
              <AppLayout>
                {token ? <HomePage/> : <NotFound />}
              </AppLayout>
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
  );
}

export default App
