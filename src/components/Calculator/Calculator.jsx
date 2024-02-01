import React, { useState } from 'react';
import ClientSelect from '../Template/ClientSelect';

const Calculator = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentClient, setCurrentClient] = useState(null)
    const [clientName, setClientName] = useState('');
    const [clientCompany, setClientCompany] = useState('');
    const [clientMail, setClientMail] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [nameOrder, setNameOrder] = useState('');
    const [count, setCount] = useState(0);

    // Додані нові стани та функції для інших інпутів
    const [productName, setProductName] = useState('');
    const [productCost, setProductCost] = useState('');
    const [productComment, setProductComment] = useState('');
    const [deliveryComment, setDeliveryComment] = useState('');
    const [designComment, setDesignComment] = useState('');

    return (
        <div className='calculator_wrap'>
            <div className='calculator_chose_client_block'>
                <div className='client_block_select'>
                    <p onClick={() => setIsOpen(true)}>Client</p>
                    {isOpen &&
                        <ClientSelect
                            setIsOpen={setIsOpen}
                            currentClient={currentClient}
                            setCurrentClient={setCurrentClient}
                        />
                    }
                    <p>+</p>
                </div>
                <div className='client_block_curent'>
                    <input type="text" placeholder='ПІБ' value={currentClient ? currentClient.pib : clientName} onChange={(e) => setClientName(e.target.value)}/>
                    <input type="text" placeholder='Компанія' value={clientCompany} onChange={(e) => setClientCompany(e.target.value)}/>
                    <input type="text" placeholder='Пошта' value={clientMail} onChange={(e) => setClientMail(e.target.value)}/>
                    <input type="text" placeholder='Номер телефона' value={clientPhone} onChange={(e) => setClientPhone(e.target.value)}/>
                </div>
            </div>
            <div className='calculator_name_block'>
                <input type="text" placeholder='Назва прорахунку / замовлення' value={nameOrder} onChange={(e) => setNameOrder(e.target.value)}/>
                <input type="number" placeholder='Кількість' value={count} onChange={(e) => setCount(e.target.value)}/>
            </div>
            <div className='calculator_main_container'>
                <div className='calculator_container_header'>
                    <h2>Назва</h2>
                    <h2>Витрати</h2>
                    <h2>Коментар</h2>
                </div>
                <div className='calculator_container_body'>
                    <div className='calculator_body_row'>
                        <textarea placeholder='Назва продукції' value={productName} onChange={(e) => setProductName(e.target.value)} cols="30" rows="10"></textarea>
                        <input type="number" placeholder='сума' value={productCost} onChange={(e) => setProductCost(e.target.value)}/>
                        <textarea placeholder='Коментар' value={productComment} onChange={(e) => setProductComment(e.target.value)} cols="30" rows="10"></textarea>
                    </div>
                    <div className='calculator_body_row'>
                        <textarea placeholder='Доставка' value={deliveryComment} onChange={(e) => setDeliveryComment(e.target.value)} cols="30" rows="10"></textarea>
                        <input type="number" placeholder='сума' value={productCost} onChange={(e) => setProductCost(e.target.value)}/>
                        <textarea placeholder='Коментар' value={productComment} onChange={(e) => setProductComment(e.target.value)} cols="30" rows="10"></textarea>
                    </div>
                    <div className='calculator_body_row'>
                        <textarea placeholder='Дизайн' value={designComment} onChange={(e) => setDesignComment(e.target.value)} cols="30" rows="10"></textarea>
                        <input type="number" placeholder='сума' value={productCost} onChange={(e) => setProductCost(e.target.value)}/>
                        <textarea placeholder='Коментар' value={productComment} onChange={(e) => setProductComment(e.target.value)} cols="30" rows="10"></textarea>
                    </div>
                    <div>Додати рядок</div>
                </div>
            </div>
            <div className='calculator_bottom_block'>
                <div className='calculator_bottom_block_first'>

                </div>
                <div className='calculator_bottom_block_second'>

                </div>
            </div>
        </div>
    );
};

export default Calculator;