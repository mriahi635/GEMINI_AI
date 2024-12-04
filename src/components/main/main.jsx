// import React from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { Context } from '../../context/context'
const Main = () => {
    
    const {onSent,loading,setinput,input,result,data,prompt}=useContext(Context)
  return (
    <div className='main'>
        <div className='nav'>
            <p>MRI AI</p>
            <img src={assets.mficon} alt="" />
        </div>
        <hr />

        <div className="main-container">
          {!result
          ?
          <div className="container">
            <p><span>Bonjour, Je suis MRI AI</span></p>
            <p>En quoi puis-je vous assister aujourdhui ?</p>
          </div>
          :
          <div className="result">
            <div className="result-title">
              <img src={assets.user} alt="" />
              <p>{prompt}  ?</p>
            </div>
            <div className="reponse-chat">
              <img src={assets.mficon} alt="" />
              {loading
              ?
              <div className="loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              :
              <p dangerouslySetInnerHTML={{ __html: data }}></p>}
            </div>
            
          </div>
        }
          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e)=>{setinput(e.target.value)}} value={input} type="text" placeholder='recherche' />
              <div>
                <img src={assets.mic_icon} alt="" />
                <img src={assets.gallery_icon} alt="" />
                <img onClick={()=>{onSent(input)}} src={assets.send_icon} alt="" />
              </div>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default Main