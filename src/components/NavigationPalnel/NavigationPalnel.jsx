import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineSettingsSuggest } from "react-icons/md";

const NavigationPalnel = ({activeTab, setActiveTab}) => {
    const user = useSelector((state) => state.auth.data);
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
            id:4,
            name: "Профіль"
        },
        {
            id: 3,
            name: 'Калькулятор'
        },

    ]);

    

    return (
        <div className='nav_panel_wrap'>
            <div className='nav_panel_container'>
                {/* {tabsArray.map((item) => (
                    <div className={`nav_panel_block ${item.name == activeTab ? `active_tab active_tab_${item.id}` : ''}`}
                    key={item.id}
                    onClick={() => setActiveTab(item.name)}>
                        <p>{item.name}</p>
                    </div>
                ))} */}
                {tabsArray.map((item) => (
                // Перевірка, чи user?.isAdmin дорівнює false, і чи назва вкладки - "Профіль"
                !(user?.isAdmin === false && item.name === "Профіль") && (
                    <div
                        className={`nav_panel_block ${item.name === activeTab ? `active_tab active_tab_${item.id}` : ''}`}
                        key={item.id}
                        onClick={() => setActiveTab(item.name)}
                    >
                        <p>{item.name}</p>
                    </div>
                )
                ))}

            </div>
        </div>
    );
};

export default NavigationPalnel;