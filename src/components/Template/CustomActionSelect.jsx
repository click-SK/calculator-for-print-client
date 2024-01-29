import React, {useState} from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
const CustomActionSelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [actionArray] = useState([
        {
            id: 1,
            name: 'Перерахувати'
        },
        {
            id: 2,
            name: 'Редагувати'
        },
        {
            id: 3,
            name: 'В замовлення'
        },
    ]);
    return (
        <div className='select_container' onClick={() => setIsOpen(!isOpen)}>
            <p>Виберіть дію</p>
            <MdKeyboardArrowDown className={`select_arrow_icon ${isOpen ? 'select_arrow_icon_active' : ''}`}/>
            {isOpen &&
            <div className='select_item_container'>
            {actionArray.map((item) => (
                <p>{item.name}</p>
            ))}
            </div>
            }
        </div>
    );
};

export default CustomActionSelect;