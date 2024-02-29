import React, { useState, useEffect } from 'react';
import ClientSelect from '../Template/ClientSelect';
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from '../../http/BaseUrl';
import { FaPlus } from "react-icons/fa6";
import Preloader from '../Preloader/Preloader';
const Calculator = ({setActiveTab}) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.data);
    const [isOpen, setIsOpen] = useState(false);
    const [currentClient, setCurrentClient] = useState(null)
    const [clientName, setClientName] = useState('');
    const [clientCompany, setClientCompany] = useState('');
    const [clientMail, setClientMail] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [nameOrder, setNameOrder] = useState('');
    const [count, setCount] = useState(null);
    const [productName, setProductName] = useState('');
    const [productCost, setProductCost] = useState(null);
    const [productComment, setProductComment] = useState('');
    const [deliveryName, setDeliveryName] = useState('');
    const [deliveryCost, setDeliveryCost] = useState(null);
    const [deliveryComment, setDeliveryComment] = useState('');
    const [designName, setDesignName] = useState('');
    const [designCost, setDesignCost] = useState(null);
    const [designComment, setDesignComment] = useState('');
    const [selectName, setSelectName] = useState('Без брендування');
    const [selectCost, setSelectCost] = useState(null);
    const [selectComment, setSelectComment] = useState('');
    const [costAmount, setCostAmount] = useState(null)
    const [priceMarkUp, setPriceMarkUp] = useState(null)
    const [pricePerPie, setPricePerPie] = useState(null)
    const [sum, setSum] = useState(null)
    const [sumMargin, setMargin] = useState(null)
    const [priceFackt, setPriceFackt] = useState(null)
    const [rows, setRows] = useState([
    ]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddRow = () => {
        setRows([...rows, {
            title: '',
            sum: null,
            comment: '',
        }]);
    };

    const handleInputChange = (e, rowIndex, field) => {
        const updatedRows = [...rows];
        updatedRows[rowIndex][field] = e.target.value;
        setRows(updatedRows);
    };


    useEffect(() => {
        const rowsCostTotal = rows.reduce((acc, row) => {
            return acc + (Number(row.sum) || 0);
        }, 0);

        setCostAmount(Number(productCost) + Number(deliveryCost) + Number(designCost) + Number(selectCost) + Number(rowsCostTotal))
    },[productCost, deliveryCost, designCost, selectCost, rows])

    useEffect(() => {
        if(costAmount && priceMarkUp !== null && count > 0) {
            const markUpAmount = costAmount * (priceMarkUp / 100); 
            const totalPrice = costAmount + markUpAmount; 
            const pricePerPieceWithMarkup = totalPrice / count; 
            const sumWithMarg = costAmount + markUpAmount
    
            setPricePerPie(pricePerPieceWithMarkup.toFixed(2));
            setSum(sumWithMarg)
            if(priceFackt){
                const sum = (priceFackt-costAmount)
                setMargin(sum.toFixed(2))
            } else {
                const sum = (sumWithMarg-costAmount)
                setMargin(sum.toFixed(2))
            }
        }


    }, [costAmount, priceMarkUp, count, sumMargin, priceFackt]);


    const validateFormData = () => {
        let errorMessage = '';
        if(!clientName && !clientCompany && !clientMail && !clientPhone) errorMessage = 'Всі поля пусті';
        // if (!clientName.trim()) errorMessage = 'Будь ласка, вкажіть ПІБ.';
        // else if (!clientCompany.trim()) errorMessage = 'Будь ласка, вкажіть компанію.';
        // else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(clientMail)) errorMessage = 'Будь ласка, вкажіть коректну пошту.';
        // else if (!/^\+?(\d.*){10,}$/g.test(clientPhone)) errorMessage = 'Будь ласка, вкажіть коректний номер телефона.';
      
        return errorMessage;
      };
    
  
      const handleCreateUser = async () => {
        const errorMessage = validateFormData();
        if (errorMessage) {
          alert(errorMessage); // Показати помилку валідації
          return;
        }
      
        setIsButtonDisabled(true); // Відключити кнопку
        try {
          const response = await axios.post(`${BASE_URL}/create-client`, {
            fullName: clientName,
            company: clientCompany,
            email: clientMail,
            phone: clientPhone,
          });
          alert('Клієнта успішно збережено!'); // Показати повідомлення про успіх
          resetData();
        } catch (error) {
          console.error("Error updating client:", error);
          alert('Виникла помилка при збереженні клієнта.'); // Показати повідомлення про помилку
        } finally {
          setIsButtonDisabled(false); // Включити кнопку
        }
      };

    const resetData = () => {
        setCurrentClient(null)
        setClientName('');
        setClientCompany('');
        setClientMail('');
        setClientPhone('');
    }


    const validateMarkupForm = () => {
        const markupValue = parseFloat(priceMarkUp);
        if (isNaN(markupValue) || markupValue <= 0) {
          alert("Заповніть поле - Націнка");
          return false;
        }
        return true;
      };

    console.log('rows', rows);

    const handleSave = async () => {
        if (!validateMarkupForm()) return; // Зупинити виконання, якщо валідація не пройдена
      setIsSubmitting(true); // Відключити кнопку
        try {

            const dataToSend = {
                clientId: currentClient,
                orderName:nameOrder,
                counts: count,
                productName: {
                    title: productName,
                    sum: productCost,
                    comment: productComment
                },
                delivery: {
                    title: deliveryName,
                    sum: deliveryCost,
                    comment: deliveryComment
                },
                design: {
                    title: designName,
                    sum: designCost,
                    comment: designComment
                },
                branding: {
                    title: selectName,
                    sum: selectCost,
                    comment: selectComment
                },
                aditionalRows: rows.map(row => ({
                    title: row.title,
                    sum: row.sum,
                    comment: row.comment
                })),
                markUp: priceMarkUp,
                priceForOne: pricePerPie,
                salesAmountWithMarkup: sum,
                costPrice: costAmount,
                margin: sumMargin,
                salePrice:priceFackt
            };
    
            const response = await axios.post(`${BASE_URL}/create-calculation`, dataToSend);

            if(response.status === 200){
                alert('Прорахунок збережений')
                window.location.reload()
            }
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error saving data:', error);
            setIsSubmitting(false);
        }
    };

    return (
        <div className='calculator_wrap'>
            <div className='calculator_chose_client_block'>
                <div className='client_block_select'>
                    <button className='btn_choose_client' onClick={() => setIsOpen(true)}>Вибір клієнта</button>
                    {isOpen &&
                        <ClientSelect
                            setIsOpen={setIsOpen}
                            currentClient={currentClient}
                            setCurrentClient={setCurrentClient}
                        />
                    }
                    
                </div>
                <div className='client_block_curent'>
                    <input type="text" placeholder='ПІБ' value={currentClient ? currentClient.fullName : clientName} onChange={(e) => setClientName(e.target.value)}/>
                    <input type="text" placeholder='Компанія' value={currentClient ? currentClient.company : clientCompany} onChange={(e) => setClientCompany(e.target.value)}/>
                    <input type="text" placeholder='Пошта' value={currentClient ? currentClient.email : clientMail} onChange={(e) => setClientMail(e.target.value)}/>
                    <input type="text" placeholder='Номер телефона' value={currentClient ? currentClient.phone : clientPhone} onChange={(e) => setClientPhone(e.target.value)}/>
                    <button onClick={handleCreateUser} disabled={isButtonDisabled}>Зберегти клієнта</button>
                    <button className='btn_resr_data' onClick={resetData}>Скинути дані клієнта</button>
                </div>
            </div>
            <div className='calculator_name_block'>
                <input className='calculator_name_input' type="text" placeholder='Назва прорахунку / замовлення' value={nameOrder} onChange={(e) => setNameOrder(e.target.value)}/>
                <input className='calculator_name_quer' type="number" onWheel={(e) => e.target.blur()} placeholder='Кількість' value={count} onChange={(e) => setCount(e.target.value)}/>
            </div>
            <div className='calculator_main_container'>
                <div className='calculator_container_header'>
                    <h2>Назва</h2>
                    <h2>Витрати</h2>
                    <h2>Коментар</h2>
                </div>
                <div className='calculator_container_body'>
                    <div className='calculator_body_row'>
                        <textarea className='calculator_body_row_item'  placeholder='Назва продукції' value={productName} onChange={(e) => setProductName(e.target.value)} cols="30" rows="10"></textarea>
                        <input className='calculator_body_row_item' type="number" onWheel={(e) => e.target.blur()} placeholder='сума' value={productCost} onChange={(e) => setProductCost(e.target.value)}/>
                        <textarea className='calculator_body_row_item' placeholder='Коментар' value={productComment} onChange={(e) => setProductComment(e.target.value)} cols="30" rows="10"></textarea>
                    </div>
                    <div className='calculator_body_row'>
                        {/* <textarea className='calculator_body_row_item'  placeholder='Селект' value={selectName} onChange={(e) => setSelectName(e.target.value)} cols="30" rows="10"></textarea> */}
                        <select className='calculator_body_row_item'  name="select_desing" id="" placeholder='Брендування' onChange={(e)=> setSelectName(e.target.value)}>
                            <option value="Без брендування">Без брендування</option>
                            <option value="Тамподрук">Тамподрук</option>
                            <option value="УФ друк">УФ друк</option>
                            <option value="Шовкодрук">Шовкодрук</option>
                            <option value="Гравіювання">Гравіювання</option>
                            <option value="ДТФ">ДТФ</option>
                            <option value="Термоперенос">Термоперенос</option>
                            <option value="Тиснення сліпе">Тиснення сліпе</option>
                            <option value="Тиснення фольга">Тиснення фольга</option>
                            <option value="Вишивка">Вишивка</option>
                        </select>
                        <input className='calculator_body_row_item' type="number" onWheel={(e) => e.target.blur()} placeholder='сума' value={selectCost} onChange={(e) => setSelectCost(e.target.value)}/>
                        <textarea className='calculator_body_row_item' placeholder='Коментар' value={selectComment} onChange={(e) => setSelectComment(e.target.value)} cols="30" rows="10"></textarea>
                    </div>
                    <div className='calculator_body_row'>
                        <textarea className='calculator_body_row_item' placeholder='Доставка' value={deliveryName} onChange={(e) => setDeliveryName(e.target.value)} cols="30" rows="10"></textarea>
                        <input className='calculator_body_row_item' type="number" onWheel={(e) => e.target.blur()} placeholder='сума' value={deliveryCost} onChange={(e) => setDeliveryCost(e.target.value)}/>
                        <textarea className='calculator_body_row_item' placeholder='Коментар' value={deliveryComment} onChange={(e) => setDeliveryComment(e.target.value)} cols="30" rows="10"></textarea>
                    </div>
                    <div className='calculator_body_row'>
                        <textarea className='calculator_body_row_item' placeholder='Дизайн' value={designName} onChange={(e) => setDesignName(e.target.value)} cols="30" rows="10"></textarea>
                        <input className='calculator_body_row_item' type="number" onWheel={(e) => e.target.blur()} placeholder='сума' value={designCost} onChange={(e) => setDesignCost(e.target.value)}/>
                        <textarea className='calculator_body_row_item' placeholder='Коментар' value={designComment} onChange={(e) => setDesignComment(e.target.value)} cols="30" rows="10"></textarea>
                    </div>
                    {rows.map((row, rowIndex) => (
                            <div className='calculator_body_row' key={rowIndex}>
                                <textarea
                                    className='calculator_body_row_item'
                                    placeholder='Додаткова опція'
                                    value={row.title}
                                    onChange={(e) => handleInputChange(e, rowIndex, 'title')}
                                    cols="30"
                                    rows="10"
                                ></textarea>
                                <input
                                    className='calculator_body_row_item'
                                    type="number" onWheel={(e) => e.target.blur()}
                                    placeholder='сума'
                                    value={row.sum}
                                    onChange={(e) => handleInputChange(e, rowIndex, 'sum')}
                                />
                                <textarea
                                    className='calculator_body_row_item'
                                    placeholder='Коментар'
                                    value={row.comment}
                                    onChange={(e) => handleInputChange(e, rowIndex, 'comment')}
                                    cols="30"
                                    rows="10"
                                ></textarea>
                            </div>

                ))}
                    <button onClick={handleAddRow} >Додати рядок</button>
                </div>
            </div>
            <div className='calculator_bottom_block'>
                    <div className='calculator_bottom_block_item'>
                        <label style={{opacity:`${priceFackt && 1}`}} htmlFor="price_fact">Ціна продажу факт (грн)</label>
                        <input id='price_fact' type="number" onWheel={(e) => e.target.blur()} placeholder='Ціна продажу факт' value={priceFackt} onChange={(e) => setPriceFackt(e.target.value)} />
                    </div>
                    <div className='calculator_bottom_block_item'>
                        <label style={{opacity:`${costAmount && 1}`}} htmlFor="price_fact">Собівартіть сума (грн)</label>
                        <input id='price_cost' type="number" onWheel={(e) => e.target.blur()} placeholder='Собівартіть сума'  disabled value={costAmount !== 0 ? costAmount : ''} onChange={(e) => setCostAmount(e.target.value)}/>
                    </div>
                    <div className='calculator_bottom_block_item'>
                        <label style={{opacity:`${priceMarkUp && 1}`}} htmlFor="price_fact">Націнка %</label>
                        <input id='price_mark-up' type="number" onWheel={(e) => e.target.blur()} placeholder='Націнка' value={priceMarkUp} onChange={(e) => setPriceMarkUp(e.target.value)} />
                    </div>
                    <div className='calculator_bottom_block_item'>
                        <label style={{opacity:`${priceMarkUp && 1}`}} htmlFor="price_fact">Ціна за штуку з націнкою (грн)</label>
                        <input id='price_per_pie' type="number" onWheel={(e) => e.target.blur()} placeholder='Ціна за штуку з націнкою' disabled value={pricePerPie} onChange={(e) => setPricePerPie(e.target.value)} />  </div>
                    <div className='calculator_bottom_block_item'>
                        <label style={{opacity:`${sum && 1}`}} htmlFor="price_fact">Сума продажу з націнкою (грн)</label>
                        <input id='sum' type="number" onWheel={(e) => e.target.blur()} placeholder='Сума продажу з націнкою' disabled value={sum} onChange={(e) => setSum(e.target.value)} />
                    </div>
                    <div className='calculator_bottom_block_item'>
                        <label style={{opacity:`${priceMarkUp && 1}`}} htmlFor="price_fact">Маржа (грн)</label>
                        <input id='margin' type="number" onWheel={(e) => e.target.blur()} placeholder='Маржа' disabled value={sumMargin} onChange={(e)=> setMargin(e.target.value)} />
                    </div>
            </div>
            <div className='btn_wrap_calc'>
            <button onClick={() => setActiveTab('Прорахунки')}>
                Відмінити
            </button>
            <button disabled={isSubmitting} className="btn_prime" onClick={handleSave}>
          Зберегти
        </button>
            </div>
        </div>
    );
};

export default Calculator;