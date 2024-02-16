import React,{useState, useEffect, useRef } from 'react';

import { MdKeyboardArrowDown } from "react-icons/md";
import { BASE_URL } from '../../http/BaseUrl';
import axios from 'axios';

const CustomSelectManager = ({currentStatus, setCurrentStatus}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [statusColor, setStatusColor] = useState('');
    const isFirstLoad = useRef(true); 

    const [listUser, setListUser] = useState([])

    const getManager = () => {
        try {
            axios.get(`${BASE_URL}/get-all-managers`)
                .then(response => {
                    console.log('Server response:', response);
                    setListUser(response.data);
                })
                .catch(error => {
                    console.error('Error getting user data:', error);
                });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }

    useEffect(() => {
        getManager()
    }, [currentStatus]); 


    console.log('currentStatus', listUser);

    return (
        <div className='select_container' onClick={() => setIsOpen(!isOpen)}>
            {currentStatus?.login === 'Всі' ? 
            <p
            style={{ background: 'black' }}
            className='select_current_status_item'
            >
            {currentStatus?.login}
            </p>
            :
                <p
                    style={{ background: currentStatus?.color }}
                    className='select_current_status_item'
                >
                    {currentStatus?.login}
                </p>
             }
            {/* <p>{currentStatus}</p> */}
            <MdKeyboardArrowDown className={`select_arrow_icon ${isOpen ? 'select_arrow_icon_active' : ''}`}/>
            {isOpen &&
            <div className='select_item_container'>
                {listUser.map((item) => (
                    <p key={item._id} style={item?.color ? {background: item?.color} : {background: '#000'}} onClick={() => setCurrentStatus(item)}
                    className='select_status_item'>{item?.login}
                    </p>
                ))}
            </div>
            }
        </div>
    );
};

export default CustomSelectManager;