import React,{useState, useEffect, useRef } from 'react';

import { MdKeyboardArrowDown } from "react-icons/md";
import { BASE_URL } from '../../http/BaseUrl';
import axios from 'axios';

const CustomSelectManager = ({currentStatus, setCurrentStatus}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [statusColor, setStatusColor] = useState('');
    const isFirstLoad = useRef(true); 

    const [listUser, setListUser] = useState([ ])

    const getManager = () => {
        try {
            axios.get(`${BASE_URL}/get-all-managers`)
                .then(response => {
                    console.log('Server response:', response);
                    // setListUser(response.data);
                    setListUser([{ _id: 1, login: 'Всі' }, ...response.data]);
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

    function isLightColor(color) {
        const rgb = hexToRgb(color);
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness > 128;
    }
    
    function hexToRgb(hex) {
        if (!hex) {
            return [0, 0, 0]; 
        }
        hex = hex.replace(/^#/, '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return [r, g, b];
    }

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
                    style={{ 
                        background:`${currentStatus?.color ? currentStatus?.color : '#000'}`,
                        color: `${currentStatus?.color ? isLightColor(currentStatus?.color) ? 'black' : 'white' : '#fff'}`
                    }}
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
                    <p key={item._id} 
                    // style={item?.color ? {background: item?.color} : {background: '#000'}} 
                    style={{
                        background: `${item?.color ? item?.color :  '#000'} `,
                        color: isLightColor(item?.color) ? 'black' : 'white'
                    }}
                    onClick={() => setCurrentStatus(item)}
                    className='select_status_item'>{item?.login}
                    </p>
                ))}
            </div>
            }
        </div>
    );
};

export default CustomSelectManager;