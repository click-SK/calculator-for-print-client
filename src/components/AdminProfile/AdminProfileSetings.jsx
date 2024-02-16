import React, {useEffect, useState} from 'react';
import SelectedUserInfo from './SelectedUserInfo';
import AddNewUser from './AddNewUser';
import axios from "axios";
import { BASE_URL } from '../../http/BaseUrl';
import '../../style/adminProfile.scss'
import { IoIosArrowForward } from "react-icons/io";




const AdminProfileSetings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenNewUser, setIsOpenNewUser] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [listUser, setListUser] = useState([])


    useEffect(() => {
        try {
            axios.get(`${BASE_URL}/get-all-managers`)
                .then(response => {
                    // console.log('Server response:', response);
                    setListUser(response.data);
                })
                .catch(error => {
                    console.error('Error getting user data:', error);
                });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }, [isOpenNewUser]);

    const hendlerOpenUser = (user) =>{
        setCurrentUser(user)
        setIsOpen(true)
    }

    return (
        <div className='admin_profile_wrap'>
            <button onClick={() => setIsOpenNewUser(true)} >Додати нового менеджера</button>
            <div className='admin_profile_list_user'>
                {listUser && 
                 listUser.map((user, idx) => (
                    <div style={{border:`1px solid ${user.color}`}} key={idx} className='admin_profile_user_one'>
                        <h2 >{user.login}</h2>
                        <button onClick={() => hendlerOpenUser(user)}> <IoIosArrowForward /> </button>
                    </div>

                ))}
            </div>
                {isOpen &&
                    <SelectedUserInfo
                        setIsOpen={setIsOpen}
                        currentClient={currentUser}
                        setCurrentClient={setCurrentUser}
                    />
                }
                {isOpenNewUser &&
                    <AddNewUser
                        setIsOpen={setIsOpenNewUser}
                    />
                }
        </div>
    );
};

export default AdminProfileSetings;