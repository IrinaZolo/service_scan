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
          <Route path="/service_scan/" element={<MainPage />} />
          <Route path="/service_scan/auth" element={<AuthPage />} />
          {isAuth ? (
            <>
              <Route path="/service_scan/search" element={<SearchPage />} />
              <Route path="/service_scan/results" element={<ResultsPage />} />
            </>
          ) : (
            <>
              <Route
                path={"/service_scan/search"}
                element={
                  <p style={{ height: "calc(100vh - 230px)" }}>
                    Страница недоступна. Вернитесь на главную страницу.
                  </p>
                }
              />
              <Route
                path={"/service_scan/results"}
                element={
                  <p style={{ height: "calc(100vh - 230px)" }}>
                    Страница недоступна. Вернитесь на главную страницу.
                  </p>
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
