import React, {useState} from 'react';
import NavigationPalnel from '../NavigationPalnel/NavigationPalnel';
import Calculator from '../Calculator/Calculator';
import Miscalculations from '../Miscalculations/Miscalculations';
import Orders from '../Orders/Orders';
import { useSelector } from 'react-redux';
import AdminProfileSetings from '../AdminProfile/AdminProfileSetings';

const MainPage = () => {
    const user = useSelector((state) => state.auth.data);
    const [activeTab, setActiveTab] = useState('Профіль');
    console.log('activeTab',activeTab);
    return (
        <>
            <NavigationPalnel
            activeTab={activeTab}
            setActiveTab={setActiveTab}/>
            {activeTab == 'Прорахунки' && 
            <Miscalculations/>
            }
            {activeTab == 'Замовлення' && 
            <Orders/>
            }
            {activeTab == 'Калькулятор' && 
            <Calculator/>
            }
            {activeTab == 'Профіль' && 
            <AdminProfileSetings/>
            }
        </>
    );
};

export default MainPage;