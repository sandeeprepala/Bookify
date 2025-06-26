import React from 'react'
import { useLocation } from 'react-router-dom'
const Checkout = () => {
    const {state} = useLocation()
  const selectedSeats = state?.selectedSeats || []
  return (
    <div>
      <h2>Checkout Page</h2>
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
      {/* Proceed with payment or confirmation UI */}
    </div>
  )
}

export default Checkout
