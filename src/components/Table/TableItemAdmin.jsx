import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BiSolidCommentEdit } from "react-icons/bi";
import { MdSell } from "react-icons/md";
import CustomActionSelect from '../Template/CustomActionSelect';
import CustomStatusSelect from '../Template/CustomStatusSelect';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../http/BaseUrl';


const TableItemAdmin = ({ data, selectType }) => {
    const user = useSelector((state) => state.auth.data);
    const [currentStatus, setCurrentStatus] = useState(data?.status)


    const hendlerUpdateStatus = (newStatus) => {
        axios.patch(`${BASE_URL}/update-order-status`, { id: data._id, status: newStatus })
            .then(response => {
                setCurrentStatus(response.data.status);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    }

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
        <div className='table_item_wrap'>
            <p className='table_item edit_icon'>
                        <Link to={`/edit-order/${data._id}`} className='table_item_edit'>
                            <BiSolidCommentEdit />
                        </Link>
                </p>
            <p className='table_header_item_id table_item'>
                {data?.id}
                </p>
            <div className='table_header_item_id table_item table_item_manage_wrap ' > <p className='table_item_manager' style={{
        backgroundColor: data?.managerId?.color,
        color: isLightColor(data?.managerId?.color) ? 'black' : 'white'
    }}>{data?.managerId?.login} </p></div>
            <p className='table_header_item table_item'>{data.productName.title}</p>
            <p className='table_header_item table_item'>{data.salePrice}</p>
            <p className='table_header_item table_item'>{data.costPrice}</p>
            <p className='table_header_item table_item'>{data.margin}</p>
            <div className='table_header_item table_item'>
                    <CustomStatusSelect
                    currentStatus={currentStatus}
                    setCurrentStatus={setCurrentStatus}
                    hendlerUpdateStatus={hendlerUpdateStatus}
                    />
            </div>
        </div>
    );
};

export default TableItemAdmin;