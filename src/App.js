import './App.css';
import React, { useState, useReducer, useEffect } from "react";
import { Helmet } from 'react-helmet';

import ConfirmedBooking from './components/ConfirmedBooking/ConfirmedBooking'
import BookingForm from './components/BookingForm/BookingForm';
import useUpdateTimeReducer from './hooks/reducer'
import useFetchData from './hooks/fetchData'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


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
        setIsDataReceived(true)
        updateTime({type: 'initialize-availableTimes', data: data.availableTime})
        
      }
    }, [data])
  

  return (
    <React.Fragment> 
      <Helmet>
        <title>My Page Title</title>
        <meta name="description" content="This is a description of my page" />
        <meta name="keywords" content="react, meta tags, seo" />
        <meta name="author" content="Asher" />
        <meta property="og:title" content="Little Lemon" />
        <meta property="og:description" content="This is the web site of Little Lemon" />
        <meta property="og:image" content="./logo.svg" />
        <meta property="og:url" content="https://example.com/little-lemon" />
        <meta name="twitter:title" content="Little Lemon" />
        <meta name="twitter:description" content="This is the web site of Little Lemon"/>
        <meta name="twitter:image" content="./logo.svg" />
      </Helmet>
      <RouterProvider router={router} />
    </React.Fragment>
   
  );
}

export default App;
