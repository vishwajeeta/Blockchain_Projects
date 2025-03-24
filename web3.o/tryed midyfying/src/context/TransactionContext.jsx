import React, {useEffect,useState } from 'react';
import {ethers} from 'ethers';
import {address,abi} from '../utils/GenomicDataDID.json'
export const TransactionContext=React.createContext();

const { ethereum }=window;

const getEthereumContract=()=>{
    const provider= new ethers.providers.Web3Provider(ethereum);
    const signer= provider.getSigner();
    const transactionContract =new ethers.Contract(address, abi, signer);
    return transactionContract;
}

export const TransactionProvider =({children})=>{
    const [currentAccount,setCurrentAccount]=useState('')
    const [storeGenomicData,setstoreGenomicData]=useState({dataHash:'',ipfsLink:'',ownerDID:''});
    //trying
    const [registerDID,setRegisterDID]=useState({registerDID:''});

    const [isLoading,setIsLoding]=useState(false);
    const [recordCount,setRecordCount] = useState(localStorage.getItem('recordCount'));//it will store the recordCount

    const handleChange=(e,name)=>{
        setstoreGenomicData((prevState)=>({...prevState,[name]:e.target.value}));
    }

    const checkIfWalletIsConnected = async()=>{
        try{
        if(!ethereum) return alert("please install metamask");
        const accounts=await ethereum.request({method:'eth_accounts'});
        if(accounts.length){
            setCurrentAccount(accounts[0]);
            
        }
        else{
            console.log("no account found");
        }
        }catch(error){
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }
    
    const connectWallet = async ()=>{
        try{
            if(!ethereum) return alert("please install metamask");
            const accounts=await ethereum.request({ method:'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
        }catch(error){
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }
    //trying1
    const registerDIDfunction=async()=>{
        try{
            if(!ethereum) return alert("please install metamask");
            //get the data from the form..
            const {did}=registerDID;
            const transactionContract = getEthereumContract(); // this variable can be used to call all transaction related functions
            // const parsedAmount=ethers.utils.parseEther(amount);
            // await ethereum.request({
            //     method:'eth_sendTransaction',
            //     params:[{
            //         from:currentAccount,
            //         to:addressTo,
            //         gas:'0x5208', //21000 GWEI
            //         value:parsedAmount._hex,
            //     }]
            // });

            // we are calling smart contract function
            const transactionHash= await transactionContract.registerDID(did); //it will take some time
            setIsLoding(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoding(false);
            console.log(`Success - ${transactionHash.hash}`);
            // const recordCount = await transactionContract.recordCount();

            // setRecordCount(recordCount.toNumber());
        }catch(error){
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    const sendTransaction = async ()=>{
        try{
            if(!ethereum) return alert("please install metamask");
            //get the data from the form..
            const {dataHash,ipfsLink,ownerDID}=storeGenomicData;
            const transactionContract = getEthereumContract(); // this variable can be used to call all transaction related functions
            // const parsedAmount=ethers.utils.parseEther(amount);
            // await ethereum.request({
            //     method:'eth_sendTransaction',
            //     params:[{
            //         from:currentAccount,
            //         to:addressTo,
            //         gas:'0x5208', //21000 GWEI
            //         value:parsedAmount._hex,
            //     }]
            // });

            // we are calling smart contract function
            const transactionHash= await transactionContract.storeGenomicData(dataHash,ipfsLink,ownerDID); //it will take some time
            setIsLoding(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoding(false);
            console.log(`Success - ${transactionHash.hash}`);
            const recordCount = await transactionContract.recordCount();

            setRecordCount(recordCount.toNumber());
        }catch(error){
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }
    useEffect(()=>{
checkIfWalletIsConnected();
    },[]);
return(
    <TransactionContext.Provider value={{ connectWallet, currentAccount,storeGenomicData,setstoreGenomicData,handleChange ,sendTransaction,registerDID,setRegisterDID,registerDIDfunction}}>
        {children}
    </TransactionContext.Provider>
)
}