import React from "react";

const MyBookings = ({ bookings }) => {
  return (
    <div style={{ margin:"22px"}}>
      <h3>My Bookings:</h3>
      {bookings.map((booking, index) => (
        <>
          <div key={index} style ={{ border: "1px solid #ccc" , borderRadius:"10px", margin:"22px 0", padding:"22px", color:"#333"}}>
            <p>Flight Number: {booking.flightNo}</p>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
            <p>Name: {booking.name}</p>
            <p>Username: {booking.username}</p>
          </div>
          
        </>
      ))}
    </div>
  );
};

export default MyBookings;
