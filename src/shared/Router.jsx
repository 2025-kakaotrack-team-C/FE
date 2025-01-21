import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Main from "../pages/Home";
import Layout from "../components/Layout";
import MyPage from "../pages/MyPage";
import Notifications from "../pages/Notifications";
// import Team from "../pages/Team";
// import TeamDetail from "../pages/TeamDetail";
import CreateTeam from "../pages/CreateTeam";
import Team from "../pages/Team";
import TeamDetail from "../pages/TeamDetail";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import Evaluation from "../pages/Evaluation";
import ApplyForm from "../pages/ApplyForm";
import ApplyStatus from "../pages/ApplyStatus";
// import MainPage from "../pages/Team";
//test

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Team />} />
          <Route path="/:category" element={<Team />} />
          <Route path="/project/:id" element={<TeamDetail />} />
          <Route path="/create" element={<CreateTeam />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/applystatus" element={<ApplyStatus />} />
          <Route path="/applyform" element={<ApplyForm />} />
        </Route>
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
