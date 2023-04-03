import './App.css';

import { Route, Routes } from "react-router-dom"
import { lazy, Suspense } from 'react';

import Header from './Components/Core/Header/Header';
import { Home } from './Components/Core/home-page/Home';
import { Footer } from './Components/Core/footer/Footer';

import { Login } from './Components/Auth/Login/Login';
import { Register } from './Components/Auth/Register/Register';
import { Logout } from './Components/Auth/Logout/Logout';

import { UserProfile } from './Components/Auth/UserProfile/UserProfile/UserProfile';

import Rules from './Components/info/Rules/Rules';
import { ScoreBoard } from './Components/info/ScoreBoard/ScoreBoard';
import { GameCapitals } from './Components/Feature/GameCapitals/GameCapitals';
import { GameFlags } from './Components/Feature/GameFlags/GameFlags';
import { Spinner } from './Components/shared/Spinner.js/Spinner';
import { AuthProvider } from './Contexts/AuthContext';
import { Result } from './Components/Feature/Result/Result';

import { UsersOnlyGuard } from './Components/Guards/UsersOnlyGuard';
import { AdminOnlyGuard } from './Components/Guards/AdminOnlyGuard';
import { PageNotFound } from './Components/Core/404/404';
import { GuestGuardOnly } from './Components/Guards/GuestOnlyGuard';

const AdminHome = lazy(() => import('./Components/admin/Admin Home/AdminHome'));
const AdminCapitalsQuestions = lazy(() => import('./Components/admin/AdminCapitalsQuestions/AdminCapitalsQuestions'));
const AdminFlagsQuestions = lazy(() => import('./Components/admin/AdminFlagsQuestions/AdminFlagQuestions'));
const AdminAddQuestion = lazy(() => import('./Components/admin/AdminActions/AdminAddQuestion'));
const AdminAddFlagsQuestion = lazy(() => import('./Components/admin/AdminActions/AdminAddFlagsQuestion'));
const AdminEditCapitalQuestion = lazy(() => import('./Components/admin/AdminActions/AdminEditCapitalQuestion'));
const AdminEditFlagsQuestion = lazy(() => import('./Components/admin/AdminActions/AdminEditFlagsQuestions'));

function App() {
  return (
    <AuthProvider>
      <div className="App">

        <Header />

        <Routes>

          <Route path='/' element={<Home />} />

          <Route path='/rules' element={<Rules />} />
          <Route path='/auth/logout' element={<Logout />} />

          <Route element={<UsersOnlyGuard />}>
            <Route path='/scoreboard' element={<ScoreBoard />} />
            <Route path='/game-capitals' element={<GameCapitals />} />
            <Route path='/game-flags' element={<GameFlags />} />
            <Route path='/result' element={<Result />} />
            <Route path='/auth/user-profile/:username' element={<UserProfile />} />
          </Route>

          <Route element={<GuestGuardOnly />}>
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
          </Route>

          <Route element={<AdminOnlyGuard />}>
            <Route path='/admin' element={
              <Suspense fallback={<Spinner />}>
                <AdminHome />
              </Suspense>} >
              <Route path='capitals-questions' element={<AdminCapitalsQuestions />} />
              <Route path='add-capitals-question' element={<AdminAddQuestion />} />
              <Route path='capitals-questions/:id/edit' element={<AdminEditCapitalQuestion />} />
              <Route path='flags-questions' element={<AdminFlagsQuestions />} />
              <Route path='add-flags-question' element={<AdminAddFlagsQuestion />} />
              <Route path='flags-question/:id/edit' element={< AdminEditFlagsQuestion />} />
            </Route>
          </Route>

          <Route path='*' element={<PageNotFound />} />

        </Routes>

        <Footer />

      </div>
    </AuthProvider>
  );
}

export default App;
