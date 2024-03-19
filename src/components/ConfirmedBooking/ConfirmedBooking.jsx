import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function ConfirmedBooking() {
    const navigate = useNavigate();
    function back(){
        navigate("/");
    }   
   return (
       <div className="dialog_confirmed">
           <div>The booking has been confirmed.</div>
         <input type="button" value="Back" onClick={back}/>
       </div>
   );
};

export default ConfirmedBooking;