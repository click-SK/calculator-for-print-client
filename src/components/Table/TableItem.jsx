import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidCommentEdit } from "react-icons/bi";
import { MdSell } from "react-icons/md";
import CustomActionSelect from '../Template/CustomActionSelect';
import CustomStatusSelect from '../Template/CustomStatusSelect';
import { useSelector } from 'react-redux';
const TableItem = ({ data, selectType }) => {
    const user = useSelector((state) => state.auth.data);

    return (
        <div className='table_item_wrap'>
            <p className='table_header_item_id table_item'>{data?.id}</p>
            <p className='table_header_item table_item'>{data.productName.title}</p>
            <p className='table_header_item table_item'>{data.salePrice}</p>
            <p className='table_header_item table_item'>{data.costPrice}</p>
            <p className='table_header_item table_item'>{data.margin}</p>
            <div className='table_header_item table_item'>
                {selectType == 'action'
                    ?
                    <>
                        <Link to={`/edit/${data._id}`}>
                            <BiSolidCommentEdit />
                        </Link>
                        <Link to={`/to-order/${data._id}`}>
                            <MdSell />
                        </Link>
                        
                    </>
                    :
                    <CustomStatusSelect/>
                }
            </div>
        </div>
    );
};

export default TableItem;