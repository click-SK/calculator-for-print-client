import React, {useState} from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
const CustomStatusSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [actionArray] = useState([
        {
            id: 1,
            name: 'Новий',
            color: '#55adff'
        },
        {
            id: 2,
            name: 'У виробництві',
            color: '#81ff55'
        },
        {
            id: 3,
            name: 'На відправку',
            color: '#f9d100'
        },
        {
            id: 4,
            name: 'Продаж',
            color: '#f93c00'
        },
    ]);
    return (
        <div className='select_container' onClick={() => setIsOpen(!isOpen)}>
            <p>Виберіть статус</p>
            <MdKeyboardArrowDown className={`select_arrow_icon ${isOpen ? 'select_arrow_icon_active' : ''}`}/>
            {isOpen &&
            <div className='select_item_container'>
            {actionArray.map((item) => (
                <p style={{background: item.color}}
                className='select_status_item'>{item.name}</p>
            ))}
            </div>
            }
        </div>
    );
};

export default CustomStatusSelect;