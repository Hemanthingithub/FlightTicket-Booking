import React from "react";

const BookingForm = ({ flightAvailability, handleBooking }) => {
  return (
    <div style={{margin:"0 22px" }}>
      <h3>Flight Details:</h3>
      {flightAvailability.length
        ? flightAvailability.map((flight) => (
            <div key={`FL_AV_${flightAvailability._id}`} style={{width: "500px"}}>
              <p>Flight Number: {flight.flightNo}</p>
              <p>Date: {new Date(flight.date).toString()}</p>
              <p>Time: {flight.time}</p>
              <p>Available: {flight.capacity}</p>
              <button onClick={() => handleBooking(flight)}>Book Flight</button>
            </div>
          ))
        : null}
    </div>
  );
};

export default BookingForm;
