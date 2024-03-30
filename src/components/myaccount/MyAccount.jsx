import React, { useEffect, useState } from "react";
import "./MyAccount.css";

export default function MyAccount() {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        const detailResponse = await fetch(
          `http://localhost:3000/userDetails/${localStorage.getItem(
            "username"
          )}`
        );
        const detailsData = await detailResponse.json();
        setDetails(detailsData);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    }

    fetchDetails();
  }, []);

  return (
    <div className="account-container">
      <h3>My Account Details</h3>
      <div className="account-details">
        {details && (
          <>
            <p><b>Name</b>: {details.fullName}</p>
            <p><b>Username</b>: {details.username}</p>
            <p><b>Email ID</b>: {details.email}</p>
          </>
        )}
      </div>
    </div>
  );
}
