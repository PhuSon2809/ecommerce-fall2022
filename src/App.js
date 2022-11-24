import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts";
import Authenticated from "./pages/Authenticated/Authenticated";
import Login from "./pages/Authenticated/Login/Login";
import SignUp from "./pages/Authenticated/SignUp/SignUp";
import { supplierRoutes } from "./routes";
import config from "~/config";
import RegisterInfor from "./pages/Authenticated/SignUp/RegisterInfor";

function App() {
  const [reload, setReload] = useState(false);
  const token = localStorage.getItem("access_token");

  return (
    <div className="App">
      <Routes>
        {!token ? (
          <>
          <Route
            path="/"
            element={<Authenticated reload={() => setReload(!reload)} />}
          />
          <Route
            path= {config.routes.signup}
            element={<SignUp />}
          />
           <Route
            path= {config.routes.login}
            element={<Login />}
          />
          </>
          
         
        ) : (
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
          })
        )}
      </Routes>
    </div>
  );
}

export default App;
