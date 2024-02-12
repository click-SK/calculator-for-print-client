import React, {useState, useEffect} from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
const CustomStatusSelect = ({currentStatus, setCurrentStatus,hendlerUpdateStatus}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [statusColor, setStatusColor] = useState('');
    const [actionArray] = useState([
        {
            id: 1,
            name: 'Новий',
            color: '#0083fb'
        },
        {
            id: 2,
            name: 'У виробництві',
            color: '#39dd00'
        },
        {
            id: 3,
            name: 'На відправку',
            color: '#e29e00'
        },
        {
            id: 4,
            name: 'Продаж',
            color: '#f93c00'
        },
    ]);

    useEffect(() => {
        const foundStatus = actionArray.find(item => item.name === currentStatus);
        if (foundStatus) {
            setStatusColor(foundStatus.color);
        }
    }, [currentStatus]);



    return (
        <div className='select_container' onClick={() => setIsOpen(!isOpen)}>
            {/* <p>Виберіть статус</p> */}
            {/* {actionArray.map((item) => {
            if (item?.name === currentStatus) {
            return (
                <p
                    key={item.id}
                    style={{ background: item.color }}
                    className='select_current_status_item'
                >
                    {item.name}
                </p>
                );
            }
            return null;
})}
 */}
 {statusColor && (
                <p
                    style={{ background: statusColor }}
                    className='select_current_status_item'
                >
                    {currentStatus}
                </p>
            )}
            {/* <p>{currentStatus}</p> */}
            <MdKeyboardArrowDown className={`select_arrow_icon ${isOpen ? 'select_arrow_icon_active' : ''}`}/>
            {isOpen &&
            <div className='select_item_container'>
            {actionArray.map((item) => (
                <p style={{background: item.color}} onClick={() => hendlerUpdateStatus(item.name)}
                className='select_status_item'>{item.name}
                </p>
            ))}
            </div>
            }
        </div>
    );
};

export default CustomStatusSelect;