import logo from "./logo.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getMoviesList } from "./api/apiService";
import Test from "./Test";
import { Content, Header } from "antd/es/layout/layout";
import { Layout, Switch } from "antd";
import { MoonFilled, SunFilled, VideoCameraOutlined } from "@ant-design/icons";
import { ConfigProvider, theme } from "antd";
import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainPage from "./components/pages/MainPage";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));
  const location = useLocation();
  console.log(location?.state?.genre);
  const [genre, setGenre] = useState(
    location?.state?.genre ? location?.state?.genre : 80
  );
  const [page, setPage] = useState(
    location?.state?.page ? location?.state?.page : 1
  );
  const [name, setName] = useState(
    location?.state?.name ? location?.state?.name : ""
  );
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        cacheTime: 60 * (60 * 1000),
        retry: 3,
      },
    },
  });

  const LazyMainPage = React.lazy(() =>
    import("../src/components/pages/MainPage")
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: darkMode ? theme.darkAlgorithm : theme.compactAlgorithm,
        }}
      >
        <Layout className={localStorage.getItem("darkMode ") ? "dark" : ""}>
          <Header className="fixed z-50 w-full h-[70px] text-yellow-300  bg-slate-700 dark:bg-slate-800 font-semibold text-xl flex items-center  justify-between">
            <h1 className="flex flex-row gap-2">
              Advanced Movie Search
              <VideoCameraOutlined />
            </h1>
            <SearchBox
              name={name}
              setName={setName}
              setGenre={setGenre}
              genre={genre}
              setPage={setPage}
              page={page}
            />
            <Switch
              defaultChecked={!localStorage.getItem("darkMode")}
              onChange={(value) => {
                if (value === true) {
                  localStorage.removeItem("darkMode");
                  setDarkMode(false);
                } else {
                  setDarkMode(true);
                  localStorage.setItem("darkMode", true);
                }
              }}
              unCheckedChildren={<MoonFilled className="text-lg" />}
              checkedChildren={<SunFilled className="text-lg" />}
            />
          </Header>
          <Layout>
            <Content className="pt-14" >
              <Routes>
                <Route
                  path="/*"
                  element={
                    <Test
                      setGenre={setGenre}
                      name={name}
                      genre={genre}
                      setPage={setPage}
                      page={page}
                    />
                  }
                />

                <Route
                  path="/movie/:id"
                  element={
                    <React.Suspense
                      fallback={
                        <div className="h-[100vh] mt-60 mr-96 text-8xl max-lg:">
                          Loading
                        </div>
                      }
                    >
                      <LazyMainPage
                        setGenre={setGenre}
                        name={name}
                        genre={genre}
                        setPage={setPage}
                        page={page}
                      />
                    </React.Suspense>
                  }
                ></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
