import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Layout from "../components/Layout";
import Team from "../pages/TeamBuilding";
import MyPage from "../pages/MyPage";
import Notifications from "../pages/Notifications";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/:category" element={<Team />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
