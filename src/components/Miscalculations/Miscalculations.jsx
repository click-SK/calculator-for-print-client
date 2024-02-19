import React, {useState, useEffect} from 'react';
import TableHeader from '../Table/TableHeader';
import TableItem from '../Table/TableItem';
import axios from "axios";
import { BASE_URL } from '../../http/BaseUrl';
import '../../style/Miscalculations.scss'
import Pagination from '../Template/Pagination';
import SearchQuery from '../Template/SearchQuery';

const Miscalculations = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [miscalculationsPerPage, setOrdersPerPage] = useState(50);
    const [totalMiscalculation, setTotalMiscalculatio] = useState(0);
    const [miscalculationsArray, setMiscalculationsArray] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");


    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-calculations`, {
                params: {
                    page: currentPage,
                    limit: miscalculationsPerPage,
                    search: searchQuery,
                },
            })
                .then(response => {
                    setMiscalculationsArray(response.data.list)
                    setTotalMiscalculatio(response.data.pagination.pageCount)
                   
                })
                .catch(error => {
                    console.error('Error getting user data:', error);
                });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }, [miscalculationsPerPage, currentPage, searchQuery]);

    return (
        <div className='table_wrap'>

            <SearchQuery
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeHolder={'Пошук...'}
            type={'text'}
            />
            <TableHeader
            style={'miscal'}
            />
            {miscalculationsArray.map((item) => (
            <TableItem 
            key={item?._id} 
            data={item} 
            selectType={'action'}/>
            ))}
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                ordersPerPage={miscalculationsPerPage}
                setOrdersPerPage={setOrdersPerPage}
                totalOrders={totalMiscalculation}
            />
        </div>
    );
};

export default Miscalculations;