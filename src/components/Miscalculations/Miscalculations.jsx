import React, {useState} from 'react';
import TableHeader from '../Table/TableHeader';
import TableItem from '../Table/TableItem';
import '../../style/Miscalculations.scss'

const Miscalculations = () => {
    const [miscalculationsArray] = useState([
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
    return (
        <div className='table_wrap'>
            <TableHeader/>
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