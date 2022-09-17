import { useState,useEffect,useCallback } from "react";
// import useBackground from "./backgroundHook";

function useFetchData(url,func,initialState,dependencies){
    const [res,setRes] = useState(initialState)

    if(!url){throw new Error("Hook fetchData requires url to fetch")}
    
    const fetchData = async ()=>{
        try{
            const response = await fetch(url,{mode:'cors'})
            const resJson = await response.json()
            if(response.status===200){
                const tempData = func(resJson);
                console.log('outside fetch data day9')
                setRes(tempData);
            }
            else{
                throw new Error("error occured in the app.\n error status:",response.code)
            }
        }
        catch(err){
            setRes("")
        }
        return {res,setRes}
    }

    useEffect(()=>{
        console.log(res)
    },[res])

    useEffect(()=>{
        fetchData()
    },[...dependencies])


    return {res,setRes}

}

export default useFetchData;