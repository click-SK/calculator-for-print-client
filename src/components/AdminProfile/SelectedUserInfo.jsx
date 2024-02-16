import React, { useState } from 'react';
import '../../style/popUp.scss';

const SelectedUserInfo = ({ setIsOpen, currentClient, setCurrentClient }) => {
    const [clients, setClients] = useState([
        {
            pib: 'Kush Olex O.',
            company: 'Nexus',
            mail: 'ale@g.com',
            phone: '03773991023'
        },
        {
            pib: 'ROS',
            company: 'LAb',
            mail: 'ros@g.com',
            phone: '77 777 777 7'
        },
    ]);

    return (
        <div className='pop-up_wrap'>
            <div className='pop-up_body_user_one'>
                <div className='pop-up_body_header'>
                    <h2>Name </h2>
                    <button onClick={() => setIsOpen(false)}>X</button>
                </div>
                <div className='client_list_wrap'>
                                <div style={{gap:'20px'}} className='client_list_item_view'>
                                    <p>Логін : {currentClient.login}</p>
                                    <p>Пароль: {currentClient.password}</p>
                                    <p style={{display:'flex', alignItems:'center', gap:'10px'}}>Колір: <span style={{background:`${currentClient.color}`}}></span> </p>
                                </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedUserInfo;
