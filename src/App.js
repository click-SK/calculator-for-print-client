import { useEffect } from 'react';
import './style/App.scss';
import "./style/style-null.css";
import './style/Authorization.scss';
import './style/NavigationPanel.scss';
import './style/Miscalculations.scss';
import './style/Table.scss';
import './style/CustomSelect.scss';
import './style/Calculator.scss';
import Login from './components/Authorization/Login';
import FirstRequest from './components/FirstRequest';
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import MainPage from './components/MainPage/MainPage';
import Page404 from './components/Page404';
import { useNavigate } from 'react-router-dom';
function App() {
  const user = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  useEffect(() => {
    if(user?.login) {
      navigate("/admin-panel");
    }
  },[user])

  console.log('user',user);
  return (
    <div className="App">
      <FirstRequest/>
      <Routes>
      <Route path="*" element={<Page404 />} />
        {!user && <Route path="/" element={<Login/>} />}
        {user?.login && (
          <Route path="/admin-panel" element={<MainPage />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
