import './App.css';
import React, { useState, useReducer, useEffect } from "react";

import ConfirmedBooking from './components/ConfirmedBooking/ConfirmedBooking'
import BookingForm from './components/BookingForm/BookingForm';
import useUpdateTimeReducer from './hooks/reducer'
import useFetchData from './hooks/fetchData'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const [isDataReceived, setIsDataReceived] = useState(false)

  const { updateTimeState, updateTime } = useUpdateTimeReducer([]);
  const router = createBrowserRouter([
      {
        path: "/",
        element: <BookingForm data={{
          availableTimes: updateTimeState.availableTimes,
          updateTime
        }}/>,
      },
      {
        path: "/confirmed",
        element: <ConfirmedBooking/>,
      },
    ]);

    const [data, isLoading] = useFetchData(
      'https://raw.githubusercontent.com/kamkam831831/test-api-work/master/data.json'
    );

    useEffect(() => {

      if (data && !isDataReceived){
        console.log('data received :' + isDataReceived)
        console.log(data)
        setIsDataReceived(true)
        updateTime({type: 'initialize-availableTimes', data: data.availableTime})
        
      }
    }, [data])
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
