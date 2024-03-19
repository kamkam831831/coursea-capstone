import { render, screen, renderHook, act } from '@testing-library/react';
import ConfirmedBooking from './ConfirmedBooking';
import {
   BrowserRouter
} from "react-router-dom";

test('Renders the ConfirmedBooking heading', () => {
   render(<BrowserRouter>
      <ConfirmedBooking />
    </BrowserRouter>);
   const headingElement = screen.getByText("The booking has been confirmed.");
   expect(headingElement).toBeInTheDocument();
})
