import React, { useState, useEffect } from 'react';
import '../../style/popUp.scss';
import axios from "axios";
import { BASE_URL } from '../../http/BaseUrl';
import SearchQuery from './SearchQuery'
import Pagination from './Pagination';

const ClientSelect = ({ setIsOpen, currentClient, setCurrentClient }) => {
    const [clients, setClients] = useState([ ]);
    const [editClientId, setEditClientId] = useState(null);
    const [viewClientId, setViewClientId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [total, setTotal] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    
    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-clients`,{
                params:{
                    page:'1',
                    limit:'10',
                    search: searchQuery
                }
            })
                .then(response => {
                    console.log('Server response:', response);
                    setClients(response.data.list);
                })
                .catch(error => {
                    console.error('Error getting user data:', error);
                });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }, [searchQuery]);

    const handleEditClick = (idx) => {
        setEditClientId(idx);
        setViewClientId(null);
    };

    const handleOpenClick = (idx) => {
        setViewClientId(idx);
        setEditClientId(null);
    };


    const handleSave = async () => {
        const clientToUpdate = clients[editClientId];
        try {
            const response = await axios.patch(`${BASE_URL}/update-client`, {
                id: clientToUpdate._id,
                fullName: clientToUpdate.fullName,
                company: clientToUpdate.company,
                email: clientToUpdate.email,
                phone: clientToUpdate.phone,
            });
    
            console.log('Update response:', response);
            setEditClientId(null); 
        } catch (error) {
            console.error('Error updating client:', error);
        }
    };

    const handleCancel = () => {
        setEditClientId(null);
        setViewClientId(null);
    };
    const handleCurrentClient = (client) => {
        setCurrentClient(client);
        setIsOpen(false);
    };



    return (
        <div className='pop-up_wrap'>
            <div className='pop-up_body'>
                <div className='pop-up_body_header'>
                    <h2>List of partner </h2>
                    <button onClick={() => setIsOpen(false)}>X</button>
                </div>
                <SearchQuery
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeHolder={'Пошук...'}
                type={'text'}
                />
                <div className='client_list_wrap'>
                    {clients.map((item, idx) => (
                        <div key={idx} className='client_list_item_wrap' >
                            {editClientId === idx ? (
                                <div className='client_list_item_edit'>
                                    <input type="text" value={item.fullName} onChange={(e) => {
                                        const updatedClients = clients.map((client, clientIdx) => clientIdx === idx ? { ...client, fullName: e.target.value } : client);
                                        setClients(updatedClients);
                                    }} />
                                    <input type="text" value={item.company} onChange={(e) => {
                                        const updatedClients = clients.map((client, clientIdx) => clientIdx === idx ? { ...client, company: e.target.value } : client);
                                        setClients(updatedClients);
                                    }} />
                                    <input type="text" value={item.email} onChange={(e) => {
                                        const updatedClients = clients.map((client, clientIdx) => clientIdx === idx ? { ...client, email: e.target.value } : client);
                                        setClients(updatedClients);
                                    }} />
                                    <input type="text" value={item.phone} onChange={(e) => {
                                        const updatedClients = clients.map((client, clientIdx) => clientIdx === idx ? { ...client, phone: e.target.value } : client);
                                        setClients(updatedClients);
                                    }} />
                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </div>
                            ) : (
                                <div className='client_list_item' >
                                    <p onClick={ () => handleCurrentClient(item)} >{item.company}</p>
                                    <button onClick={() => handleOpenClick(idx)}>Open</button>
                                    <button onClick={() => handleEditClick(idx)}>Edit</button>
                                </div>
                            )}
                            {viewClientId === idx && (
                                <div className='client_list_item_view'>
                                    <p>ПІБ: {item.fullName}</p>
                                    <p>Company: {item.company}</p>
                                    <p>Email: {item.email}</p>
                                    <p>Phone: {item.phone}</p>
                                    <button onClick={handleCancel}>Close</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                ordersPerPage={perPage}
                setOrdersPerPage={setPerPage}
                totalOrders={total}
                />
            </div>
        </div>
    );
};

export default ClientSelect;
