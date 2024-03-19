import React, { useState } from "react";
import useSubmitData from '../../hooks/submitData'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function BookingForm(prop) {
   const navigate = useNavigate();
   const { isLoading, response, submit } = useSubmitData();
   
   const { availableTimes, updateTime} = prop.data
   const [formInfo, setFormInfo] = useState({
      "res-date": '',
      "res-time": '',
      "guests": '',
      "occasion": 'Birthday',
   }); 

   function handleChange(e) { 
      setFormInfo({
         ...formInfo, [e.target.id]:e.target.value
      }); 
   } 
   function isFormValid(){
      return true;
   }
   function handleSubmit(e) { 
      e.preventDefault()
      if (!isFormValid()){ return; }
      updateTime({type: 'selected-date-time', date: formInfo['res-date'], time:formInfo['res-time']})
      submit(null,formInfo)
   } 

   function goConfirmedBooking(){
      navigate("/confirmed");
   }
   useEffect(() => {
      if (response != null){
         resetForm()
         goConfirmedBooking()
      }
   },[response])
 
   function resetForm(){
      setFormInfo({
         "res-date": '',
         "res-time": '',
         "guests": '',
         "occasion": 'Birthday'})
   }

   return (
      <form style={{display: 'grid',maxWidth: '200px', gap: '20px', margin:'20px'}} onSubmit={handleSubmit}>
         <h1>Book Now</h1>
         <label htmlFor="res-date">Choose date</label>
         <input type="date" id="res-date" onChange={handleChange} value={formInfo["res-date"]}/>
         <label htmlFor="res-time">Choose time</label>
         <select id="res-time" onChange={handleChange} value={formInfo["res-time"]}>
            <option disabled></option>
            <option disabled={formInfo["res-date"] == null ? true : !availableTimes.includes(`${formInfo["res-date"]} 17:00`)}>17:00</option>
            <option disabled={formInfo["res-date"] == null ? true : !availableTimes.includes(`${formInfo["res-date"]} 18:00`)}>18:00</option>
            <option disabled={formInfo["res-date"] == null ? true : !availableTimes.includes(`${formInfo["res-date"]} 19:00`)}>19:00</option>
            <option disabled={formInfo["res-date"] == null ? true : !availableTimes.includes(`${formInfo["res-date"]} 20:00`)}>20:00</option>
            <option disabled={formInfo["res-date"] == null ? true : !availableTimes.includes(`${formInfo["res-date"]} 21:00`)}>21:00</option>
            <option disabled={formInfo["res-date"] == null ? true : !availableTimes.includes(`${formInfo["res-date"]} 22:00`)}>22:00</option>
         </select>
         <label htmlFor="guests">Number of guests</label>
         <input type="number" placeholder="1" min="1" max="10" id="guests" onChange={handleChange} value={formInfo["guests"]}/>
         <label htmlFor="occasion">Occasion</label>
         <select id="occasion"  onChange={handleChange} value={formInfo["occasion"]}>
            <option>Birthday</option>
            <option>Anniversary</option>
         </select>
         <input type="submit" value="Make Your reservation" disabled={isLoading}/>
      </form>
   );
};

export default BookingForm;