import React, {useState} from 'react';
import TableHeader from '../Table/TableHeader';
import TableItem from '../Table/TableItem';
import TableHeaderMiscalculations from '../Table/TableHeaderMiscalculations'
import TableItemTableHeaderMiscalculations from '../Table/TableItemMiscalculations'
const Orders = () => {
    const [ordersArray] = useState([
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
    return (
        <div className='table_wrap'>
            <TableHeader/>
            {ordersArray.map((item) => (
            <TableItem data={item} key={item.id}/>
            ))}
        </div>
    );
};

export default Orders;