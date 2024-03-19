import { render, screen, renderHook, act } from '@testing-library/react';
import BookingForm from './BookingForm';
import useUpdateTimeReducer from '../../hooks/reducer'
import {
   BrowserRouter
} from "react-router-dom";

test('Renders the BookingForm heading', () => {
   const { result } = renderHook(() => useUpdateTimeReducer([]));
   render(<BrowserRouter>
      <BookingForm data={{
      availableTimes: result.current.updateTimeState.availableTimes,
      updateTime: result.current.updateTime,
    }}/>
    </BrowserRouter>);
   const headingElement = screen.getByText("Book Now");
   expect(headingElement).toBeInTheDocument();
})

test('test initializeTimes function', () => {
   const { result } = renderHook(() => useUpdateTimeReducer());
   expect(result.current.updateTimeState).toStrictEqual({ availableTimes: []});
})

test('test initialize function', () => {
   const { result } = renderHook(() => useUpdateTimeReducer());
   act(() => { result.current.updateTime({
      type:'initialize-availableTimes', 
      data:[{
         "date":"2024-03-19",
         "time":"17:00"
      },{
         "date":"2024-03-19",
         "time":"18:00"
      }]}) 
   })
   expect(result.current.updateTimeState).toStrictEqual({ availableTimes: ['2024-03-19 17:00', '2024-03-19 18:00']});
})