import React from 'react';
import { useSelector } from 'react-redux';

const TableHeader = ({style}) => {
    const user = useSelector((state) => state.auth.data);
    return (
        <div className='table_header_wrap'>
            <p className='table_header_item_id header_item'>№</p>
            {/* {user?.isAdmin &&
            <p className='table_header_item header_item'>Менеджер</p>
            } */}
            <p className='table_header_item header_item'>Імя</p>
            <p className='table_header_item header_item'>Продукт</p>
            <p className='table_header_item header_item'>Ціна замовлення</p>
            <p className='table_header_item header_item'>Ціна витрат</p>
            {style === 'miscal' ?
            <p className='table_header_item header_item'>Дія</p>
            :
            <p className='table_header_item header_item'>Статус</p>
            }
        </div>
    );
};

export default TableHeader;