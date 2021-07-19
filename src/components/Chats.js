import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);


    console.log(user)

    const handleLogout = async () =>{
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url)=>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: "image/jpg"})
    }

    useEffect(()=>{
        if(!user){
            history.push("/");
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers:{
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secrect": user.uid
            }
        }).then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL).then((avatar)=>{
                formdata.append('avatar', avatar, avatar.name)

                axios.post('https://api.chatengine.io/users', formdata, 
                    {headers: { "private-key": "4ccdf7a6-6efc-438a-9296-d2886c3cae2a"}}
                ).then(()=> setLoading(false))
                .catch((err)=> console.log(err))
            })
        })
    }, [user, history])

    if(!user || loading) return "Loading"

    return(
        <div className="chats-page">
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine 
                height = "calc(100vh -66px)"
                projectID="bfa59e4f-57ed-466e-a43f-4c6ef6dd2065"
                userName={user.email}
                userSecret={user.uid}

            />
        </div>
    );
}

export default Chats;