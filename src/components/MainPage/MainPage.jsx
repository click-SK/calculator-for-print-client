import React, {useState} from 'react';
import NavigationPalnel from '../NavigationPalnel/NavigationPalnel';
import Calculator from '../Calculator/Calculator';
import Miscalculations from '../Miscalculations/Miscalculations';
import Orders from '../Orders/Orders';
const MainPage = () => {
    const [activeTab, setActiveTab] = useState('Замовлення');
    console.log('activeTab',activeTab);
    return (
        <div>
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
        </div>
    );
};

export default MainPage;