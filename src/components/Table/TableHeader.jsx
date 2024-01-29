import React from 'react';

const TableHeader = () => {
    return (
        <div className='table_header_wrap'>
            <p className='table_header_item_id header_item'>№</p>
            <p className='table_header_item header_item'>Імя</p>
            <p className='table_header_item header_item'>Продукт</p>
            <p className='table_header_item header_item'>Ціна замовлення</p>
            <p className='table_header_item header_item'>Ціна витрат</p>
            <p className='table_header_item header_item'>Статус</p>
        </div>
    );
};

export default TableHeader;