import React, { useState } from "react";

const FlightSearchForm = ({
  handleFlightSearch,
  isAdmin,
  handleViewBookings,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [flightNo, setFlight] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { flightNo, time, date, source, destination };
    isAdmin ? handleViewBookings(payload) : handleFlightSearch(payload);
  };

  return (
    <div className="wrapper" style={{ background:"#f1f1f1"}}>
    <form onSubmit={handleSubmit}>
    <div style={{ width: "500px" , margin:"22px"  }}>
      {!isAdmin ? (
        <>
          <input
            type="text"
            placeholder="Source"
            onChange={(e) => setSource(e.target.value)}
            name="source"
            required
          />
          <input
            type="text"
            placeholder="Destination"
            name="destination"
            onChange={(e) => setDestination(e.target.value)}
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </>
      ) : (
        <input
          type="text"
          placeholder="Flight Number"
          name="flightNo"
          onChange={(e) => setFlight(e.target.value)}
          required
        />
      )}
      <input
        type="time"
        placeholder="Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">
        {isAdmin ? "View Bookings" : "Search Flights"}
      </button>
      </div>
    </form>
    </div>
  );
};

export default FlightSearchForm;
