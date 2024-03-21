import React, { useState } from "react";
import useSubmitData from '../../hooks/submitData'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import LocalError from "../error/error";

function BookingForm(prop) {
   const navigate = useNavigate();
   const { isLoading, response, submit } = useSubmitData();
   
   const { availableTimes, updateTime} = prop.data

   const formik = useFormik({
      initialValues: {
         date: new Date(),
         time: "",
         guests: "",
         occasion: "Birthday",
      },
      onSubmit: (values) => {
         handleSubmit(values)
      },
      validationSchema: Yup.object({}).shape({
         date: Yup.string().required("Required"),
         time: Yup.string().required("Required"),
         guests: Yup.number()
         .required()
         .test('value must be larger than 0 and smaller then 11', function (f) {
           return f >= 1 && f <= 10;
         }),
         occasion: Yup.string().required(),
      })
   });
   
   function isFormValid(){
      return true;
   }
   function handleSubmit(values) { 
      if (!isFormValid()){ return; }
      updateTime({type: 'selected-date-time', date: values['date'], time:values['time']})
      submit(null,values)
   } 

   function goConfirmedBooking(){
      navigate("/confirmed");
   }
   useEffect(() => {
      if (response != null){
         formik.resetForm()
         goConfirmedBooking()
      }
   },[response])
 
   return (
      <form role="Booking Form" style={{display: 'grid',maxWidth: '200px', gap: '10px', margin:'20px 40px'}}  onSubmit={formik.handleSubmit}>
         <h1>Book Now</h1>
         <label aria-label="Choose date" htmlFor="date">Choose date *</label>
         <DatePicker 
            role="Booking Form Date Picker"
            selected={formik.values.date}
            dateFormat="MMMM d, yyyy"
            className="form-control"
            name="date"
            onChange={(value) => {
               if ( Date.parse(value) != formik.values.date) {
                  formik.setFieldValue('time', "");
               }
               formik.setFieldValue('date', Date.parse(value));
            }}
            onBlur={formik.handleBlur}/>
            <LocalError touched={formik.touched.date} error={formik.touched.date && formik.errors.date ? formik.errors.date : null} />
         <label aria-label="Choose time" htmlFor="time">Choose time *</label>
         <select id="time" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}>
            <option disabled></option>
            <option disabled={formik.values.date == null ? true : !availableTimes.includes(`${(new Date(formik.values.date)).toISOString().split('T')[0]} 17:00`)}>17:00</option>
            <option disabled={formik.values.date == null ? true : !availableTimes.includes(`${(new Date(formik.values.date)).toISOString().split('T')[0]} 18:00`)}>18:00</option>
            <option disabled={formik.values.date == null ? true : !availableTimes.includes(`${(new Date(formik.values.date)).toISOString().split('T')[0]} 19:00`)}>19:00</option>
            <option disabled={formik.values.date == null ? true : !availableTimes.includes(`${(new Date(formik.values.date)).toISOString().split('T')[0]} 20:00`)}>20:00</option>
            <option disabled={formik.values.date == null ? true : !availableTimes.includes(`${(new Date(formik.values.date)).toISOString().split('T')[0]} 21:00`)}>21:00</option>
            <option disabled={formik.values.date == null ? true : !availableTimes.includes(`${(new Date(formik.values.date)).toISOString().split('T')[0]} 22:00`)}>22:00</option>
         </select>
            <LocalError touched={formik.touched.time} error={formik.touched.time && formik.errors.time ? formik.errors.time : null} />
         <label htmlFor="guests">Number of guests</label>
         <input type="number" placeholder="1" id="guests" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.guests}/>
            <LocalError touched={formik.touched.guests} error={formik.touched.guests && formik.errors.guests ? formik.errors.guests : null} />
         <label htmlFor="occasion">Occasion</label>
         <select id="occasion" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.occasion}>
            <option>Birthday</option>
            <option>Anniversary</option>
         </select>
            <LocalError touched={formik.touched.occasion} error={formik.touched.occasion && formik.errors.occasion ? formik.errors.occasion : null} />
         <button type="submit" value="Make Your reservation" role="button" arial-label="Make Your reservation" disabled={isLoading}/>
      </form>
   );
};

export default BookingForm;