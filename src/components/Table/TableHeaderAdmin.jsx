import React from 'react';
import { useSelector } from 'react-redux';
// import CustomStatusSelect from '../Template/CustomStatusSelect';
import CustomStatusSelect from '../Template/CustomStatusSelect';
import CustomSelectManager from '../Template/CustomSelectManager';

const TableHeaderAdmin = ({style, optionStatus, setOptionStatus, setOptionManager,optionManager}) => {
    const user = useSelector((state) => state.auth.data);

    const hendlerUpdateStatus = (newStatus) => {
        setOptionStatus(newStatus)
    }

    return (
        <div className='table_header_wrap'>
            <p className='table_header_item_id header_item'>№</p>
            {/* <p className='table_header_item header_item'>Менеджер</p> */}
            <div className='table_header_item header_item_status'>
                <p className='header_item'>Менеджер</p>
                <CustomSelectManager
                    currentStatus={optionManager}
                    setCurrentStatus={setOptionManager}
                />
            </div>
            <p className='table_header_item header_item'>Продукт</p>
            <p className='table_header_item header_item'>Ціна факт</p>
            <p className='table_header_item header_item'>Ціна Витрат</p>
            <p className='table_header_item header_item'>Маржа</p>
            {style === 'miscal' ?
            <p className='table_header_item header_item'>Дія</p>
            :
            <div className='table_header_item header_item_status'>
                <p className='header_item'>Статус</p>
                <CustomStatusSelect
                    currentStatus={optionStatus}
                    setCurrentStatus={setOptionStatus}
                    hendlerUpdateStatus={hendlerUpdateStatus}
                    style={'header'}
                />
            </div>
            }
        </div>
    )
};

export default TableHeaderAdmin;