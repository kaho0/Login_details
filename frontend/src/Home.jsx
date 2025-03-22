// import React, { useState, useEffect } from "react";
// import { getAuth } from "firebase/auth";
// import app from "./firebase.init.js";
// import "./Home.css";

// const Home = () => {
//   const [userName, setUserName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [userData, setUserData] = useState(null); // State to store user data from backend

//   const auth = getAuth(app);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const currentUser = auth.currentUser;

//         if (!currentUser) {
//           setLoading(false);
//           return;
//         }

//         // Fetch user data from backend
//         const response = await fetch(
//           `http://localhost:5000/user/${currentUser.uid}`
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }

//         const data = await response.json();
//         setUserData(data); // Store user data in state
//         setUserName(data.name || currentUser.displayName || "User");
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to load user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [auth]);

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="home-container">
//       <div className="welcome-card">
//         <h1 className="welcome-title">
//           {auth.currentUser ? (
//             <>Welcome, {userName}!</>
//           ) : (
//             <>Welcome to Our App</>
//           )}
//         </h1>

//         <div className="home-content">
//           {auth.currentUser ? (
//             <div>
//               <p>Thank you for completing your profile.</p>
//               <p>You can now explore all the features of our application.</p>

//               {/* Display user data from backend */}
//               {userData && (
//                 <div className="user-details">
//                   <h2>Your Profile</h2>
//                   <p>
//                     <strong>Name:</strong> {userData.name}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {userData.email}
//                   </p>
//                   <p>
//                     <strong>Phone:</strong> {userData.phone}
//                   </p>
//                   <p>
//                     <strong>Company:</strong> {userData.company}
//                   </p>
//                   <p>
//                     <strong>Description:</strong> {userData.description}
//                   </p>
//                   <p>
//                     <strong>Agency:</strong> {userData.isAgency ? "Yes" : "No"}
//                   </p>
//                 </div>
//               )}

//               {/* Add your app features, dashboard, or navigation here */}
//               <div className="feature-buttons">
//                 <button className="feature-button">Dashboard</button>
//                 <button className="feature-button">My Projects</button>
//                 <button className="feature-button">Settings</button>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <p>Please sign in to access your account.</p>
//               <div className="auth-buttons">
//                 <button
//                   onClick={() => (window.location.href = "/login")}
//                   className="auth-button primary-button"
//                 >
//                   Log In
//                 </button>
//                 <button
//                   onClick={() => (window.location.href = "/signup")}
//                   className="auth-button secondary-button"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
