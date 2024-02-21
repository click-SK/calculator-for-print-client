import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidCommentEdit } from "react-icons/bi";
import { MdSell } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import CustomActionSelect from '../Template/CustomActionSelect';
import CustomStatusSelect from '../Template/CustomStatusSelect';
import { useSelector } from 'react-redux';
const TableItem = ({ data, selectType }) => {
    const user = useSelector((state) => state.auth.data);

    return (
        <div className='table_item_wrap'>
            <p className='table_header_item_id table_item'>{data?.id}</p>
            <p className='table_header_item table_item'>{data.orderName}</p>
            <p className='table_header_item table_item'>{data.salePrice}</p>
            <p className='table_header_item table_item'>{data.costPrice}</p>
            <p className='table_header_item table_item'>{data.margin}</p>
            <div className='table_header_item table_item'>
                {selectType == 'action'
                    ?
                    <>
                        <Link to={`/edit/${data._id}`} className='table_item_edit'>
                            <BiSolidCommentEdit  />
                        </Link>
                        <Link to={`/copy-calculation/${data._id}`} className='table_item_copy'>
                            <FaCopy/>
                        </Link>
                        <Link to={`/to-order/${data._id}` } className='table_item_order' >
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