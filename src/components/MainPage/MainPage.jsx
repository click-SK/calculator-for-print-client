import React, {useState} from 'react';
import NavigationPalnel from '../NavigationPalnel/NavigationPalnel';
import Calculator from '../Calculator/Calculator';
import Miscalculations from '../Miscalculations/Miscalculations';
import Orders from '../Orders/Orders';
import { useSelector } from 'react-redux';
import AdminProfileSetings from '../AdminProfile/AdminProfileSetings';
import { FaPlus } from "react-icons/fa6";


const MainPage = () => {
    const user = useSelector((state) => state.auth.data);
    const [activeTab, setActiveTab] = useState('Прорахунки');
    console.log('activeTab',activeTab);
    return (
        <>
            <NavigationPalnel
            activeTab={activeTab}
            setActiveTab={setActiveTab}/>
            {activeTab == 'Прорахунки' && 
            <>
            <Miscalculations/>
            <button className='plus_order' onClick={() => setActiveTab('Калькулятор')}> <FaPlus /></button>
            </>

            }
            {activeTab == 'Замовлення' && 
            <> 
            <Orders/>
            <button className='plus_order' onClick={() => setActiveTab('Калькулятор')}> <FaPlus /></button>
            </>
            }
            {activeTab == 'Калькулятор' && 
            <Calculator
            setActiveTab={setActiveTab}
            />
            }
            {activeTab == 'Профіль' && 
            <AdminProfileSetings/>
            }
        </>
    );
};

export default MainPage;