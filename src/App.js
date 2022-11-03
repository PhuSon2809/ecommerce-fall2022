import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts";
import Authenticated from "./pages/Authenticated/Authenticated";
import { supplierRoutes } from "./routes";

function App() {

  const currentUser = useSelector((state) => state.account.current);

  return (
    <div className="App">
      <Routes>
        {!currentUser ? <Route path="/" element={<Authenticated />}/> : 

        supplierRoutes.map((route, index) => {
          const Page = route.component;

          let Layout = DefaultLayout;

          if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}


      </Routes>
    </div>
  );
}

export default App;
