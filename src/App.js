import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import BookingForm from "./components/BookingForm";
import MyBookings from "./components/MyBookings";
import AdminPanel from "./components/AdminPanel";
import AdminLoginForm from "./components/AdminLoginForm";
import FlightSearchForm from "./components/FightSearchForm";


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [flights, setFlights] = useState([]);
  const [selctedFlight, setFlight] = useState({});
  const [flightAvailability, setFAvailability] = useState([]);
  const [bookings, setBookings] = useState([]);

  const handleUserLogin = (username, password) => {
    const apiUrl = "http://localhost:8080/api/auth/login"; // Replace with your user login API endpoint

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setLoggedInUser(data);
        } else {
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const apiUrl = "http://localhost:8080/api/flight/list";

    if (loggedInUser && isAdminLoggedIn)
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": loggedInUser.token,
        },
        body: JSON.stringify({ isAll: true }),
      })
        .then((response) => response.json())
        .then((data) => setFlights(data))
        .catch((error) => {});
    else if (loggedInUser && !isAdminLoggedIn) {
      handleViewBookings({});
    }
  }, [loggedInUser]);

  const handleAdminLogin = (username, password) => {
    const apiUrl = "http://localhost:8080/api/auth/login";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setIsAdminLoggedIn(true);
          setLoggedInUser(data);
        } else {
        }
      })
      .catch((error) => {});
  };

  const handleSignUp = (username, role, password) => {
    const apiUrl = "http://localhost:8080/api/auth/register";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, role, password }),
    })
      .then((response) => response.json())
      .then((user) => {
        alert(`New user registered : ${user.username}`);
      })
      .catch((error) => {});
  };

  const handleFlightSearch = (flightDetails) => {
    const apiUrl = "http://localhost:8080/api/flight/list";
    setFlight(flightDetails);
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInUser.token,
      },
      body: JSON.stringify(flightDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        // const searchedFlights = data.filter(
        //   (flight) => flight.date === date && flight.time === time
        // );
        setFAvailability(data);
      })
      .catch((error) => {});
  };

  const handleBooking = (flight) => {
    const apiUrl = "http://localhost:8080/api/flight/book";
    const name = prompt("Please enter your name");
    const age = prompt("Please enter your age");
    const gender = prompt("Please enter your gender");
    if (!name || !age || !gender) {
      alert("Fill all required details");
      return null;
    }

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInUser.token,
      },
      body: JSON.stringify({
        flightNo: flight.flightNo,
        source: flight.source,
        destination: flight.destination,
        name,
        age,
        gender,
        time: selctedFlight.time,
        date: selctedFlight.date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedBookings = [data, ...bookings];
        setBookings(updatedBookings);
        setFAvailability([]);
        setFlight({});
      })
      .catch((error) => {});
  };

  const handleAddFlight = (payload) => {
    const apiUrl = "http://localhost:8080/api/flight/add";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInUser.token,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setFlights([...flights, data]);
      })
      .catch((error) => {});
  };

  const handleRemoveFlight = (flight) => {
    const apiUrl = `http://localhost:8080/api/flight/remove/${flight.flightNo}`;
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInUser.token,
      },
    })
      .then(() => {
        const updatedFlights = flights.filter(
          (f) => f.flightNo !== flight.flightNo
        );
        setFlights(updatedFlights);
      })
      .catch((error) => {});
  };

  const handleViewBookings = (data) => {
    const apiUrl = `http://localhost:8080/api/flight/${
      isAdminLoggedIn ? "bookings" : "my-bookings"
    }`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": loggedInUser.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {});
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setIsAdminLoggedIn(false);
    setBookings([]);
  };

  return (
    <div>
      {loggedInUser ? (
        <>
          <div style={{ display:"flex", justifyContent:'space-between' , margin:"22px"}}>
          <h2>Welcome, {loggedInUser.username}!</h2>
          <span style={{  color:'black' , margin:'20px'}} onClick={handleLogout}>Logout</span>
          </div>
          <FlightSearchForm
            handleFlightSearch={handleFlightSearch}
            isAdmin={isAdminLoggedIn}
            handleViewBookings={handleViewBookings}
          />
          {!isAdminLoggedIn ? (
            <BookingForm
              bookings={bookings}
              flightAvailability={flightAvailability}
              handleBooking={handleBooking}
            />
          ) : null}
          <MyBookings bookings={bookings} />
          {isAdminLoggedIn ? (
            <AdminPanel
              flights={flights}
              handleAddFlight={handleAddFlight}
              handleRemoveFlight={handleRemoveFlight}
            />
          ) : null}
        </>
      ) : (
        <>
         
          <LoginForm handleLogin={handleUserLogin} />
          <hr/>
          <AdminLoginForm handleAdminLogin={handleAdminLogin} />
          <hr/>
          <SignUpForm handleSignUp={handleSignUp} />
        </>
      )}
    </div>
  );
};

export default App;
