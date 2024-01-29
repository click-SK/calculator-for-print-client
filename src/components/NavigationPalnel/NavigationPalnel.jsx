import React, { useState } from 'react';

const NavigationPalnel = ({activeTab, setActiveTab}) => {
    const [tabsArray] = useState([
        {
            id: 1,
            name: 'Прорахунки'
        },
        {
            id: 2,
            name: 'Замовлення'
        },
        {
            id: 3,
            name: 'Калькулятор'
        },
    ]);

    return (
        <div className='nav_panel_wrap'>
            <div className='nav_panel_container'>
                {tabsArray.map((item) => (
                    <div className={`nav_panel_block ${item.name == activeTab ? 'active_tab' : ''}`}
                    key={item.id}
                    onClick={() => setActiveTab(item.name)}>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NavigationPalnel;