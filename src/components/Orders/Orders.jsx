import React, {useState, useEffect, useRef } from 'react';
import TableHeader from '../Table/TableHeader';
import TableItem from '../Table/TableItem';
import { useSelector } from 'react-redux';
import TableHeaderAdmin from '../Table/TableHeaderAdmin';
import TableItemAdmin from '../Table/TableItemAdmin';
import { BASE_URL } from '../../http/BaseUrl';
import axios from 'axios';
import Pagination from '../Template/Pagination';
import SearchQuery from '../Template/SearchQuery';
import TableItemManagerOrder from '../Table/TableItemManagerOrder';

const Orders = () => {
    const user = useSelector((state) => state.auth.data);
    const isFirstLoad = useRef(true); 
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(5);
    const [ordersArray, setOrdersArray] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [optionStatus, setOptionStatus] = useState('Всі')
    const [optionManager, setOptionManager] = useState(
        {login:'Всі'}
    )

    const fetchOrders = async () => {
        
        try {
            if(user.isAdmin){
                const response = await axios.get(`${BASE_URL}/get-all-orders`, {
                    params: {
                        page: currentPage,
                        limit: ordersPerPage,
                        search: searchQuery,
                    },
                });
                console.log('response', response);
                setOrdersArray(response.data.list);
                setTotalOrders(response.data.pagination.pageCount);
            } else {
                const response = await axios.get(`${BASE_URL}/sort-by-manager`, {
                    params: {
                        page: currentPage,
                        limit: ordersPerPage,
                        manager: user._id,
                    },
                });
                console.log('response', response);
                setOrdersArray(response.data?.list);
                setTotalOrders(response.data?.pagination?.pageCount);
            }
            
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {

        fetchOrders();
    }, [currentPage, ordersPerPage, searchQuery]);


    const fetchOrdersStatus = async () => {
        try {
            if(user.isAdmin){
                const response = await axios.get(`${BASE_URL}/sort-by-status`, {
                    params: {
                        page: currentPage,
                        limit: ordersPerPage,
                        status: optionStatus,
                        
                    },
                });
                console.log('response', response);
                setOrdersArray(response.data?.list);
                setTotalOrders(response.data?.pagination?.pageCount);
            }else {
                const response = await axios.get(`${BASE_URL}/sort-by-status-for-manager`, {
                    params: {
                        page: currentPage,
                        limit: ordersPerPage,
                        status: optionStatus,
                        managerId: user._id
                    },
                });
                console.log('response222', response);
                setOrdersArray(response.data?.list);
                setTotalOrders(response.data?.pagination?.pageCount);
            }

        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    const fetchOrdersManager = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/sort-by-manager`, {
                params: {
                    page: currentPage,
                    limit: ordersPerPage,
                    manager: optionManager,
                },
            });
            // console.log('response', response);
            setOrdersArray(response.data?.list);
            setTotalOrders(response.data?.pagination?.pageCount);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };


    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            return;
        }
        if( optionStatus != 'Всі' ) {
            fetchOrdersStatus();
        } else {
            fetchOrders()
        }

        if(optionManager?.login != 'Всі'){
            fetchOrdersManager()
        }
    }, [optionStatus, optionManager]); 

    return (
        <div className='table_wrap'>
            <SearchQuery
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeHolder={'Пошук по номеру'}
                type={'number'}
            />
            {user?.isAdmin ?
            <>
            <TableHeaderAdmin
            setOptionStatus={setOptionStatus}
            optionStatus={optionStatus}
            optionManager={optionManager}
            setOptionManager={setOptionManager}
            />
            {ordersArray.map((item) => (
            <TableItemAdmin data={item} key={item.id}/>
            ))}
            </>
            :
            <>
            <TableHeader
            setOptionStatus={setOptionStatus}
            optionStatus={optionStatus}
            optionManager={optionManager}
            setOptionManager={setOptionManager}
            />
            {ordersArray.map((item) => (
            <TableItemManagerOrder data={item} key={item.id}/>
            ))}
            </>
            }
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                ordersPerPage={ordersPerPage}
                setOrdersPerPage={setOrdersPerPage}
                totalOrders={totalOrders}
            />
        </div>
    );
};

export default Orders;