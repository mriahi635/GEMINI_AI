import  { createContext, useState } from "react";
import PropTypes from "prop-types";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setinput] = useState('');
    const [prompt, setPrompt] = useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [result, setResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');


    const newChat =()=>{
        setLoading(false)
        setResult(false)
    }
    const text =(index,nextword)=>{
        setTimeout(() => {
            setData(prev=>prev+nextword)
        },25*index);
    }
    const onSent = async (prompt) => {
        try {
            setData('')
            setLoading(true)
            let response  ; 
            if(prompt!==undefined){
                response=await runChat(prompt)
                setPrompt(prompt)
                
            }else{
                setPrevPrompt(prev=>[...prev,input])
                setPrompt(input)
                response= await runChat(input)
            }
            setPrevPrompt(prev=>[...prev,input])
            setResult(true)
            setPrompt(input)
            
            let resultArray = response.split("**");
            let newarray = ''; 
            
            for (let i = 0; i < resultArray.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newarray += resultArray[i]; 
                } else {
                    newarray += "<b>" + resultArray[i] + "</b>";
                }
            }
            let newarray2 = newarray.split("*").join("</br>"); 
            
            let newr=newarray2.split(" ");
                for(let i=0;i<newr.length;i++){
                    const nextword=newr[i];
                    text(i,nextword+" ")
                }
            setLoading(false);
            setinput(""); 
            
            
            
        } catch (error) {
            alert('Error sending prompt:', error); 
        }
    };
    

    const contextValue = {
        input,
        data,
        setData,
        setinput,
        loading,
        setLoading,
        prompt,
        setPrompt,
        prevPrompt,
        setPrevPrompt,
        result,
        setResult,
        onSent, 
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};


ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ContextProvider;
