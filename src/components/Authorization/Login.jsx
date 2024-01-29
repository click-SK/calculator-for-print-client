import React, {useState} from "react";
import RegisterSvgTest from "./RegisterSvgTest";
import { useDispatch } from "react-redux";
import { fetchAuth } from "../../store/auth";
const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleLogin = async () => {
      const data = await dispatch(
        fetchAuth({
          login,
          password,
        })
      );

      console.log('data',data);
  
      if (data.payload.login) {
        window.localStorage.setItem("S-F-P-token", data.payload.login);
        window.location.reload();
      }else {
        alert(data.payload.message);
      }
    };
  return (
    <div className="auth_wrap">
        <div className="auth_form_block">
        <div className="auth_image_wrap">
          <RegisterSvgTest/>
        </div>
      <div className="auth_form_container">
        <div className="auth_input_block">
          <input 
          className="auth_input" 
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}/>
        </div>
        <div className="auth_input_block">
          <input 
          className="auth_input" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="auth_form_button_block">
          <button className="auth_form_button" onClick={handleLogin}>Вхід</button>
        </div>
      </div>
        </div>
    </div>
  );
};

export default Login;
