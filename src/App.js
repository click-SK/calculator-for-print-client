import { useEffect } from 'react';
import './style/App.scss';
import "./style/style-null.css";
import './style/Authorization.scss';
import './style/NavigationPanel.scss';
import './style/Miscalculations.scss';
import './style/Table.scss';
import './style/CustomSelect.scss';
import './style/Calculator.scss';
import './style/Pagination.scss';
import './style/SearchQuery.scss';
import './style/preloader.scss';
import Login from './components/Authorization/Login';
import FirstRequest from './components/FirstRequest';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch  } from 'react-redux';
import MainPage from './components/MainPage/MainPage';
import Page404 from './components/Page404';
import EditMiscalculation from './components/Calculator/EditMiscalculation';
import AddToOrderCalculation from './components/Calculator/AddToOrderCalculation';
import EditOrder from './components/Calculator/EditOrder';
import CopiMiscalculation from './components/Calculator/CopiMiscalculation';
import { logout } from './store/auth';
// import { useNavigate } from 'react-router-dom';

function App() {
  const user = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(user?.isAdmin) {
      navigate("/admin-panel");
    } else if (user && user?.isAdmin == false ) {
      navigate("/manager-panel");
    } 
    // else if (!user) {
    //   navigate("/");
    // }
  },[user])

  const handleLogout = () => {
    window.localStorage.removeItem('S-F-P-token'); 
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="App">
      <FirstRequest/>
      <Routes>
      <Route path="*" element={<Page404 />} />
        {!user && <Route path="/" element={<Login/>} />}

        {user?.isAdmin ? 
          <Route path="/admin-panel" element={<MainPage />} />
          :
          <Route path="/manager-panel" element={<MainPage />} />
        }
        {user && (
          <Route path="/edit/:id" element={<EditMiscalculation />} />
        )}
        {user && (
          <Route path="/to-order/:id" element={<AddToOrderCalculation />} />
        )}
        {user && (
          <Route path="/edit-order/:id" element={<EditOrder />} />
        )}
        {user && (
          <Route path="/copy-calculation/:id" element={<CopiMiscalculation />} />
        )}
      </Routes>
      {user && 
      <div className='log_out_btn_wrap'>
        <button onClick={handleLogout}>Вийти</button>
      </div>
      }
    </div>
  );
}

export default App;
