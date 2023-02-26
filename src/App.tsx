import React from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./shared/GlobalStyles";

// 페이지 임포트
import Layout from "./component/common/Layout";
import Home from "./pages/Home";
import Room from "./pages/Room";

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/room/:idx" element={<Room />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
