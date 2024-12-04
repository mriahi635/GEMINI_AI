// import React from 'react'
import './sidebare.css'
import { assets } from '../../assets/assets'
import { useContext, useState } from 'react'
import { Context } from '../../context/context';
const Sidebar = () => {

    
    const[extended,setextended]=useState(false);
    const{onSent,prevPrompt,setPrompt,newChat}=useContext(Context);


    const loadhistorique=async(prompt)=>{    
            setPrompt(prompt)
            await onSent(prompt)
    }

    return (
        <div className='sidebar'>
            <div className='top'>
                <img src={assets.menu_icon} className="menu" onClick={()=>{
                    setextended(!extended)
                }} />
                <div onClick={()=>newChat()} className='newChat'>
                    <img src={assets.plus_icon} alt="" />
                    {extended && <p>Nouveau Chat</p>}
                </div>
                
                {extended && <div className='histourique'>
                    <p className='historique-title'>Historique</p>
                        {prevPrompt.map((item, index) => {
                            return (
                                <div  onClick={()=>loadhistorique(item)} className='historique-chat' key={index}> 
                                    <img src={assets.message_icon} alt='' />
                                    <p>{item.slice(0,15)}...</p>
                                </div>
                            );
                        })}
                    
                </div>}
            </div>
            <div className='bottom'>
                <div className='bottom-item histourique-chat'>
                    <img src={assets.history_icon} alt="" />
                    {extended &&<p>help</p>}
                </div>
                <div className='bottom-item histourique-chat'>
                    <img src={assets.question_icon} alt="" />
                    {extended &&<p>histourique</p>}
                </div>
                <div className='bottom-item histourique-chat'>
                    <img src={assets.setting_icon} alt="" />
                    {extended &&<p>Parametres</p>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar