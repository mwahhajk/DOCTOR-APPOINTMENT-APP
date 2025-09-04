import React, { useState } from 'react'
import axios from "axios";
import {toast} from "react-toastify";

function MessageForm() {
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[email,setEmail]=useState("");
  const[phone,setPhone]=useState("");
  const[message,setMessage]=useState("")

  const handleMessage=async(e)=>{
    e.preventDefault();
    // console.log("Message form submittd");
    // console.log(firstName,lastName,email,phone,message);
    try {
      await axios.post("http://localhost:4000/api/v1/message/create",
        {firstName,lastName,email,phone,message},
        {
        // withCredentials:true,
        headers:
        {"Content-Type":"application/json"}}).
        then((res)=>{
          toast(res.data.message)
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("")
        })
    } catch (error) {
      console.log(error);
      
    }
    
    
  }
  return (
    <div className='container form-component message-form'>
      <h2>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
      <div>
        <input type="text" name="firstName" placeholder='Enter First Name' value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
        <input type="text" name="lastName" placeholder='Enter Last Name' value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>        
      </div>
      <div>
        <input type="email" name="email" placeholder='Enter Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="text" name="phone" placeholder='Enter Phone Number' value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>        
      </div>
      <textarea             
            rows={7}
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}>

      </textarea>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Send</button>
          </div>
        </form>
    </div>
  )
}

export default MessageForm