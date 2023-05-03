import React, { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import { Header } from './components/Header';
import { AuthPage } from './pages/AuthPage';
import { MainPage } from './pages/MainPage';
import { ResultsPage } from './pages/ResultsPage';
import { SearchPage } from './pages/SearchPage';
import { Footer } from './components/Footer';

function App() {

  const [ auth, setAuth ] = useState<boolean>(true) // fix разновидность шапки в зависимости от авторизации

  return (
    <>
      <Header auth={auth} setAuth={setAuth} />
        <main className='box-border mx-auto px-[15px] py-0 flex flex-col max-w-[1440px] relative'>
          <Routes >
            <Route path='/' element={ <MainPage auth={auth} setAuth={setAuth} /> } />
            <Route path='/auth' element={ <AuthPage /> } />
            <Route path='/search' element={ <SearchPage /> } />
            <Route path='/results' element={ <ResultsPage /> } />
          </Routes>
        </main>
      <Footer />
    </>
  );
}

export default App;
