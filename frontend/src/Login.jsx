// import React, { useState, useEffect } from "react";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   GithubAuthProvider,
//   signInWithPopup,
//   signOut,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import {
//   FaGoogle,
//   FaGithub,
//   FaUser,
//   FaEnvelope,
//   FaLock,
//   FaPhone,
//   FaBuilding,
// } from "react-icons/fa";
// import { auth, db } from "./firebase.init.js";
// import "./styles.css";

// const AuthApp = () => {
//   const [currentPage, setCurrentPage] = useState("welcome");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Form states
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [company, setCompany] = useState("");
//   const [isAgency, setIsAgency] = useState(false);
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");

//   const googleProvider = new GoogleAuthProvider();
//   const githubProvider = new GithubAuthProvider();
//   const navigate = useNavigate();

//   // Fetch user data from backend
//   const fetchUserDataFromBackend = async (uid) => {
//     try {
//       const response = await fetch(`http://localhost:5000/user/${uid}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       throw error;
//     }
//   };

//   // Check authentication state on load
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       setLoading(false);
//       if (currentUser) {
//         setUser(currentUser);

//         try {
//           // Fetch user data from Firestore
//           const userDoc = await getDoc(doc(db, "users", currentUser.uid));
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             setName(userData.name || currentUser.displayName || "");
//             setPhone(userData.phone || "");
//             setCompany(userData.company || "");
//             setIsAgency(userData.isAgency || false);
//             setDescription(userData.description || "");
//           } else {
//             setName(currentUser.displayName || "");
//           }

//           // Fetch user data from backend
//           const backendUserData = await fetchUserDataFromBackend(
//             currentUser.uid
//           );
//           console.log("Backend user data:", backendUserData);
//           // Update state with backend data if needed
//         } catch (err) {
//           console.error("Error fetching user data:", err);
//         }

//         setCurrentPage("account");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // Registration handler
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       // Store additional user data in Firestore
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         name,
//         phone,
//         company,
//         isAgency,
//         email,
//         createdAt: new Date(),
//       });

//       setCurrentPage("login");
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   // Handle Google Sign In
//   const handleGoogleSignIn = () => {
//     signInWithPopup(auth, googleProvider)
//       .then((result) => {
//         const loggedInUser = result.user;
//         setUser(loggedInUser);
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   };

//   // Handle GitHub Sign In
//   const handleGithubSignIn = () => {
//     signInWithPopup(auth, githubProvider)
//       .then((result) => {
//         const loggedInUser = result.user;
//         setUser(loggedInUser);
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   };

//   // Login handler
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   // Logout handler
//   const handleSignOut = () => {
//     signOut(auth)
//       .then(() => {
//         setUser(null);
//         setCurrentPage("welcome");
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   };

//   // Update user profile
//   const handleUpdateProfile = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!user) return;

//     try {
//       // Send updated profile data to backend
//       const response = await fetch("http://localhost:5000/user/update", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           uid: user.uid,
//           name,
//           phone,
//           company,
//           isAgency,
//           description,
//           email: user.email,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setError(data.message);

//         // Fetch the updated profile data from the backend
//         const updatedUserData = await fetchUserDataFromBackend(user.uid);
//         console.log("Updated user data:", updatedUserData);

//         // Update state with the latest data
//         setName(updatedUserData.name || "");
//         setPhone(updatedUserData.phone || "");
//         setCompany(updatedUserData.company || "");
//         setIsAgency(updatedUserData.isAgency || false);
//         setDescription(updatedUserData.description || "");

//         // Redirect to home page
//         navigate("/home");
//       } else {
//         setError(data.error || "Error updating profile");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-container">
//       {/* Welcome Page */}
//       {currentPage === "welcome" && (
//         <div className="auth-card welcome-card">
//           <h1 className="auth-title">Welcome</h1>
//           <p className="auth-subtitle">Sign in to access your account</p>

//           <div className="auth-buttons">
//             <button
//               className="auth-button primary-button"
//               onClick={() => setCurrentPage("login")}
//             >
//               Login
//             </button>
//             <button
//               className="auth-button secondary-button"
//               onClick={() => setCurrentPage("register")}
//             >
//               Create Account
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Login Page */}
//       {currentPage === "login" && (
//         <div className="auth-card login-card">
//           <h1 className="auth-title">Login</h1>
//           <p className="auth-subtitle">Welcome back!</p>

//           {error && <div className="auth-error">{error}</div>}

//           <form onSubmit={handleLogin} className="auth-form">
//             <div className="form-group">
//               <label htmlFor="email">
//                 <FaEnvelope /> Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">
//                 <FaLock /> Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 placeholder="Enter your password"
//               />
//             </div>

//             <button type="submit" className="auth-button primary-button">
//               Login
//             </button>
//           </form>

//           <div className="auth-divider">
//             <span>Or login with</span>
//           </div>

//           <div className="social-buttons">
//             <button
//               onClick={handleGoogleSignIn}
//               className="social-button google-button"
//             >
//               <FaGoogle /> Google
//             </button>
//             <button
//               onClick={handleGithubSignIn}
//               className="social-button github-button"
//             >
//               <FaGithub /> GitHub
//             </button>
//           </div>

//           <p className="auth-switch">
//             Don't have an account?
//             <button
//               className="text-button"
//               onClick={() => setCurrentPage("register")}
//             >
//               Create Account
//             </button>
//           </p>
//         </div>
//       )}

//       {/* Registration Page */}
//       {currentPage === "register" && (
//         <div className="auth-card register-card">
//           <h1 className="auth-title">Create Account</h1>
//           <p className="auth-subtitle">Join our platform</p>

//           {error && <div className="auth-error">{error}</div>}

//           <form onSubmit={handleRegister} className="auth-form">
//             <div className="form-group">
//               <label htmlFor="name">
//                 <FaUser /> Full Name*
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//                 placeholder="Enter your full name"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="phone">
//                 <FaPhone /> Phone Number*
//               </label>
//               <input
//                 type="tel"
//                 id="phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//                 required
//                 placeholder="Enter your phone number"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="email">
//                 <FaEnvelope /> Email Address*
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="password">
//                 <FaLock /> Password*
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 placeholder="Create a password"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="company">
//                 <FaBuilding /> Company Name (Optional)
//               </label>
//               <input
//                 type="text"
//                 id="company"
//                 value={company}
//                 onChange={(e) => setCompany(e.target.value)}
//                 placeholder="Enter your company name"
//               />
//             </div>

//             <div className="form-group checkbox-group">
//               <input
//                 type="checkbox"
//                 id="isAgency"
//                 checked={isAgency}
//                 onChange={(e) => setIsAgency(e.target.checked)}
//               />
//               <label htmlFor="isAgency">I am an agency</label>
//             </div>

//             <button type="submit" className="auth-button primary-button">
//               Create Account
//             </button>
//           </form>

//           <p className="auth-switch">
//             Already have an account?
//             <button
//               className="text-button"
//               onClick={() => setCurrentPage("login")}
//             >
//               Login
//             </button>
//           </p>
//         </div>
//       )}

//       {/* Account Settings Page */}
//       {currentPage === "account" && user && (
//         <div className="auth-card account-card">
//           <h1 className="auth-title">Account Settings</h1>

//           <div className="profile-header">
//             {user.photoURL ? (
//               <img
//                 src={user.photoURL}
//                 alt="Profile"
//                 className="profile-image"
//               />
//             ) : (
//               <div className="profile-image-placeholder">
//                 {name ? name.charAt(0).toUpperCase() : "U"}
//               </div>
//             )}
//             <div className="profile-info">
//               <h2>{name || user.displayName || "User"}</h2>
//               <p>{user.email}</p>
//             </div>
//           </div>

//           {error && <div className="auth-message">{error}</div>}

//           <form onSubmit={handleUpdateProfile} className="auth-form">
//             <div className="form-group">
//               <label htmlFor="description">About Me</label>
//               <textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Tell us about yourself"
//                 rows="4"
//                 disabled={profileSaved} // Disable if profile is saved
//               />
//             </div>

//             <div className="profile-section">
//               <h3>Personal Information</h3>

//               <div className="form-group">
//                 <label htmlFor="profile-name">
//                   <FaUser /> Name
//                 </label>
//                 <input
//                   type="text"
//                   id="profile-name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Your name"
//                   disabled={profileSaved} // Disable if profile is saved
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="profile-phone">
//                   <FaPhone /> Phone
//                 </label>
//                 <input
//                   type="tel"
//                   id="profile-phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="Your phone number"
//                   disabled={profileSaved} // Disable if profile is saved
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="profile-company">
//                   <FaBuilding /> Company
//                 </label>
//                 <input
//                   type="text"
//                   id="profile-company"
//                   value={company}
//                   onChange={(e) => setCompany(e.target.value)}
//                   placeholder="Your company"
//                   disabled={profileSaved} // Disable if profile is saved
//                 />
//               </div>

//               <div className="form-group checkbox-group">
//                 <input
//                   type="checkbox"
//                   id="profile-agency"
//                   checked={isAgency}
//                   onChange={(e) => setIsAgency(e.target.checked)}
//                   disabled={profileSaved} // Disable if profile is saved
//                 />
//                 <label htmlFor="profile-agency">I am an agency</label>
//               </div>
//             </div>

//             <div className="form-actions">
//               {!profileSaved && (
//                 <button type="submit" className="auth-button primary-button">
//                   Save Changes
//                 </button>
//               )}
//               <button
//                 type="button"
//                 className="auth-button secondary-button"
//                 onClick={handleSignOut}
//               >
//                 Log Out
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AuthApp;
