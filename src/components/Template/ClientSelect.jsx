import React, { useState } from 'react';
import '../../style/popUp.scss';

const ClientSelect = ({ setIsOpen, currentClient, setCurrentClient }) => {
    const [clients, setClients] = useState([
        {
            pib: 'Kush Olex O.',
            company: 'Nexus',
            mail: 'ale@g.com',
            phone: '03773991023'
        },
        {
            pib: 'ROS',
            company: 'LAb',
            mail: 'ros@g.com',
            phone: '77 777 777 7'
        },
    ]);
    const [editClientId, setEditClientId] = useState(null);
    const [viewClientId, setViewClientId] = useState(null);

    const handleEditClick = (idx) => {
        setEditClientId(idx);
        setViewClientId(null);
    };

    const handleOpenClick = (idx) => {
        setViewClientId(idx);
        setEditClientId(null);
    };

    const handleSave = () => {
        setEditClientId(null);
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
                <div className='client_list_wrap'>
                    {clients.map((item, idx) => (
                        <div key={idx} className='client_list_item_wrap' onClick={ () => handleCurrentClient(item)}>
                            {editClientId === idx ? (
                                <div className='client_list_item_edit'>
                                    <input type="text" value={item.pib} onChange={(e) => {
                                        const updatedClients = clients.map((client, clientIdx) => clientIdx === idx ? { ...client, pib: e.target.value } : client);
                                        setClients(updatedClients);
                                    }} />
                                    <input type="text" value={item.company} onChange={(e) => {
                                        const updatedClients = clients.map((client, clientIdx) => clientIdx === idx ? { ...client, company: e.target.value } : client);
                                        setClients(updatedClients);
                                    }} />
                                    <input type="text" value={item.mail} onChange={(e) => {
                                        const updatedClients = clients.map((client, clientIdx) => clientIdx === idx ? { ...client, mail: e.target.value } : client);
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
                                <div className='client_list_item'>
                                    <p>{item.pib}</p>
                                    <button onClick={() => handleOpenClick(idx)}>Open</button>
                                    <button onClick={() => handleEditClick(idx)}>Edit</button>
                                </div>
                            )}
                            {viewClientId === idx && (
                                <div className='client_list_item_view'>
                                    <p>PІБ: {item.pib}</p>
                                    <p>Company: {item.company}</p>
                                    <p>Email: {item.mail}</p>
                                    <p>Phone: {item.phone}</p>
                                    <button onClick={handleCancel}>Close</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientSelect;
