import React, {useState, useEffect} from 'react';
import TableHeader from '../Table/TableHeader';
import TableItem from '../Table/TableItem';
import { useSelector } from 'react-redux';
import TableHeaderAdmin from '../Table/TableHeaderAdmin';
import TableItemAdmin from '../Table/TableItemAdmin';
import { BASE_URL } from '../../http/BaseUrl';
import axios from 'axios';

const Orders = () => {
    const user = useSelector((state) => state.auth.data);
    const [ordersArray, setOrdersArray] = useState([
        {
            id: 1,
            manager:'alex',
            orderName: '300 чашок для школи',
            productName: '300 чашок',
            orderPrice: 3000,
            costsPrice: 2700,
        },
        {
            id: 2,
            manager:'ros',
            orderName: '300 футболок для школи',
            productName: '300 футболок',
            orderPrice: 6000,
            costsPrice: 5000,
        },
    ]);

    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-orders`)
                .then(response => {
                    console.log('Server response:', response);
                    setOrdersArray(response.data)
                })
                .catch(error => {
                    console.error('Error getting user data:', error);
                });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }, []);
    return (
        <div className='table_wrap'>
            {user?.isAdmin ?
            <>
            <TableHeaderAdmin/>
            {ordersArray.map((item) => (
            <TableItemAdmin data={item} key={item.id}/>
            ))}
            </>
            :
            <>
            <TableHeader/>
            {ordersArray.map((item) => (
            <TableItem data={item} key={item.id}/>
            ))}
            </>
            }

        </div>
    );
};

export default Orders;