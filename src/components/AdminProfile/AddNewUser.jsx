import React, { useState, useEffect } from 'react';
import '../../style/popUp.scss';
import axios from "axios";
import { BASE_URL } from '../../http/BaseUrl';

const AddNewUser = ({setIsOpen}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [color, setColor] = useState('')


    const handleCreateUser = async () => {
        try {

            const newUser = {
                login: login,
                password: password,
                color: color,
            };
            const response = await axios.post(`${BASE_URL}/register`, newUser);

            setIsOpen(false);
        } catch (error) {

            console.error('Error creating user:', error);
        }
    };


    return (
        <div className='pop-up_wrap'>
            <div className='pop-up_body_new_user'>
                <div className='pop-up_body_header'>
                    <h2>Додати менеджера</h2>
                    <button onClick={() => setIsOpen(false)}>X</button>
                </div>
                <div className='client_list_wrap'>
                    <div className='client_list_item_view'>
                        <div className='client_list_item_view_item_add'>
                        <p>Login:</p>
                        <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                        </div>
                        <div className='client_list_item_view_item_add'>
                        <p>Password</p>
                        <input type="text"  value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='client_list_item_view_item_add'>
                        <p>Color</p>
                        <input type="color" onChange={(e) => setColor(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <button onClick={handleCreateUser} >Додати менеджера</button>
            </div>
        </div>
    );
};

export default AddNewUser;