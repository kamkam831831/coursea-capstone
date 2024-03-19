import { render, screen, renderHook, act } from '@testing-library/react';
import BookingForm from './BookingForm';
import useUpdateTimeReducer from '../../hooks/reducer'

test('Renders the BookingForm heading', () => {
   const { result } = renderHook(() => useUpdateTimeReducer());
   render(<BookingForm data={{
      unavailableTimes: result.current.updateTimeState.selectedDateTime,
      updateTime: result.current.updateTime,
    }}/>);
   const headingElement = screen.getByText("Book Now");
   expect(headingElement).toBeInTheDocument();
})

test('test initializeTimes function', () => {
   const { result } = renderHook(() => useUpdateTimeReducer());
   expect(result.current.updateTimeState).toStrictEqual({ selectedDateTime: []});
})

test('test updateTimes function', () => {
   const { result } = renderHook(() => useUpdateTimeReducer());
   act(() => { result.current.updateTime({type:'selected-date-time', date:'2024-01-01',time:'17:00'}) })
   act(() => { result.current.updateTime({type:'selected-date-time', date:'2024-01-02',time:'17:00'}) })
   expect(result.current.updateTimeState).toStrictEqual({ selectedDateTime: ['2024-01-01 17:00', '2024-01-02 17:00']});
})