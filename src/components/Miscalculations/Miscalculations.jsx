import React, {useState, useEffect} from 'react';
import TableHeader from '../Table/TableHeader';
import TableItem from '../Table/TableItem';
import axios from "axios";
import { BASE_URL } from '../../http/BaseUrl';
import '../../style/Miscalculations.scss'

const Miscalculations = () => {
    const [miscalculationsArray, setMiscalculationsArray] = useState([
        {
            id: 1,
            orderName: '100 чашок для школи',
            productName: '100 чашок',
            orderPrice: 3000,
            costsPrice: 2700,
        },
        {
            id: 2,
            orderName: '100 футболок для школи',
            productName: '100 футболок',
            orderPrice: 6000,
            costsPrice: 5000,
        },
    ]);


    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-calculations`)
                .then(response => {
                    console.log('Server response:', response);
                    setMiscalculationsArray(response.data)
                })
                .catch(error => {
                    console.error('Error getting user data:', error);
                });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }, []);

    console.log('miscalculationsArray1', miscalculationsArray);

    return (
        <div className='table_wrap'>
            <TableHeader
            style={'miscal'}
            />
            {miscalculationsArray.map((item) => (
            <TableItem 
            key={item.id} 
            data={item} 
            selectType={'action'}/>
            ))}
        </div>
    );
};

export default Miscalculations;