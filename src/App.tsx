import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthPage } from "./pages/AuthPage";
import { MainPage } from "./pages/MainPage";
import { ResultsPage } from "./pages/ResultsPage";
import { SearchPage } from "./pages/SearchPage";
import { Footer } from "./components/Footer";
import { useAppSelector } from "./hooks/redux";

function App() {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <>
      <Header />
      <main className="box-border mx-auto px-[15px] py-0 flex flex-col max-w-[1440px] relative">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage />} />
          {isAuth ? (
            <>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </>
          ) : (
            <>
              <Route
                path={"/search"}
                element={
                  <main>
                    <p>Страница недоступна. Вернитесь на главную страницу.</p>
                  </main>
                }
              />
              <Route
                path={"/results"}
                element={
                  <main>
                    <p>Страница недоступна. Вернитесь на главную страницу.</p>
                  </main>
                }
              />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
