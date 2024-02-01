import React from 'react';
import CustomActionSelect from '../Template/CustomActionSelect';
import CustomStatusSelect from '../Template/CustomStatusSelect';

const TableItemMiscalculations = ({ data, selectType }) => {
    return (
        <div className='table_item_wrap'>
            <p className='table_header_item_id table_item'>{data.id}</p>
            <p className='table_header_item table_item'>{data.orderName}</p>
            <p className='table_header_item table_item'>{data.productName}</p>
            <p className='table_header_item table_item'>{data.orderPrice}</p>
            <p className='table_header_item table_item'>{data.costsPrice}</p>
            <div className='table_header_item table_item'>
                {selectType == 'action'
                    ?
                    <CustomActionSelect/>
                    :
                    <CustomStatusSelect/>
                }
            </div>
        </div>
    );
};

export default TableItemMiscalculations;