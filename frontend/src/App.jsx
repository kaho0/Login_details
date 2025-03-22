// import React, { useState, useEffect } from "react";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   GithubAuthProvider,
//   signOut,
// } from "firebase/auth";
// import { app, auth } from "./firebase.init.js"; // Adjust the import path to your Firebase config file
// import "./App.css"; // Import the CSS file
// import { FaGoogle, FaGithub } from "react-icons/fa";
// const App = () => {
//   const [user, setUser] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [company, setCompany] = useState("");
//   const [isAgency, setIsAgency] = useState(false);
//   const [description, setDescription] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup

//   // Firebase Auth State Listener
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//         fetchUserProfile(user.uid);
//         setIsLoggedIn(true);
//       } else {
//         setUser(null);
//         setProfile(null);
//         setIsLoggedIn(false);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   // Fetch User Profile from Backend
//   const fetchUserProfile = async (uid) => {
//     try {
//       const response = await fetch(`http://localhost:5000/user/${uid}`);
//       const data = await response.json();
//       setProfile(data);
//     } catch (err) {
//       console.error("Error fetching user profile:", err);
//     }
//   };

//   // Update User Profile
//   const updateProfile = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/user/update", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
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
//       setProfile(data.user);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//     }
//   };

//   // Email/Password Login
//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error("Error logging in:", err.message);
//       alert(err.message);
//     }
//   };

//   // Email/Password Signup
//   const handleSignup = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error("Error signing up:", err.message);
//       alert(err.message);
//     }
//   };

//   // Google Login
//   const handleGoogleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//     } catch (err) {
//       console.error("Error logging in with Google:", err.message);
//       alert(err.message);
//     }
//   };

//   // GitHub Login
//   const handleGitHubLogin = async () => {
//     const provider = new GithubAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//     } catch (err) {
//       console.error("Error logging in with GitHub:", err.message);
//       alert(err.message);
//     }
//   };

//   // Logout
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//     } catch (err) {
//       console.error("Error logging out:", err.message);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Welcome to the App</h1>

//       {!isLoggedIn ? (
//         <div className="auth-container">
//           <h2>{isSignup ? "Sign Up" : "Login"}</h2>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="input-field"
//           />
//           {isSignup ? (
//             <button onClick={handleSignup} className="auth-button">
//               Sign Up
//             </button>
//           ) : (
//             <button onClick={handleLogin} className="auth-button">
//               Login
//             </button>
//           )}
//           <button onClick={handleGoogleLogin} className="auth-button google">
//             <FaGoogle style={{ marginRight: "10px" }} />
//             Login with Google
//           </button>
//           <button onClick={handleGitHubLogin} className="auth-button github">
//             <FaGithub style={{ marginRight: "10px" }} />
//             Login with GitHub
//           </button>
//           <p>
//             {isSignup ? "Already have an account? " : "Don't have an account? "}
//             <span
//               onClick={() => setIsSignup(!isSignup)}
//               className="toggle-auth"
//             >
//               {isSignup ? "Login" : "Sign Up"}
//             </span>
//           </p>
//         </div>
//       ) : (
//         <div className="account-settings">
//           <h2>Account Settings</h2>
//           <p>Welcome, {user?.email}</p>
//           <button onClick={handleLogout} className="logout-button">
//             Logout
//           </button>

//           <h3>Update Profile</h3>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="text"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="text"
//             placeholder="Company"
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             className="input-field"
//           />
//           <label className="checkbox-label">
//             <input
//               type="checkbox"
//               checked={isAgency}
//               onChange={(e) => setIsAgency(e.target.checked)}
//             />
//             Is Agency
//           </label>
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="input-field"
//           />
//           <button onClick={updateProfile} className="update-button">
//             Update Profile
//           </button>

//           <h3>Profile Details</h3>
//           {profile ? (
//             <div className="profile-details">
//               <p>Name: {profile.name}</p>
//               <p>Phone: {profile.phone}</p>
//               <p>Company: {profile.company}</p>
//               <p>Is Agency: {profile.isAgency ? "Yes" : "No"}</p>
//               <p>Description: {profile.description}</p>
//             </div>
//           ) : (
//             <p>Loading profile...</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { app, auth } from "./firebase.init.js"; // Adjust the import path to your Firebase config file
import "./App.css"; // Import the CSS file
import {
  FaGoogle,
  FaGithub,
  FaUser,
  FaPhone,
  FaBuilding,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

const App = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isAgency, setIsAgency] = useState(false);
  const [description, setDescription] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup
  const [isEditing, setIsEditing] = useState(false); // Toggle between viewing and editing profile

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserProfile(user.uid);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setProfile(null);
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch User Profile from Backend
  const fetchUserProfile = async (uid) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${uid}`);
      const data = await response.json();
      setProfile(data);
      // Update form fields with existing data
      setName(data.name || "");
      setPhone(data.phone || "");
      setCompany(data.company || "");
      setIsAgency(data.isAgency || false);
      setDescription(data.description || "");
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  // Update User Profile
  const updateProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name,
          phone,
          company,
          isAgency,
          description,
          email: user.email,
        }),
      });
      const data = await response.json();
      setProfile(data.user);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  // Email/Password Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Error logging in:", err.message);
      alert(err.message);
    }
  };

  // Email/Password Signup
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error("Error signing up:", err.message);
      alert(err.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Error logging in with Google:", err.message);
      alert(err.message);
    }
  };

  // GitHub Login
  const handleGitHubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Error logging in with GitHub:", err.message);
      alert(err.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div className="app">
      <h1>Welcome to the App</h1>

      {!isLoggedIn ? (
        <div className="auth-container">
          <h2>{isSignup ? "Sign Up" : "Login"}</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          {isSignup ? (
            <button onClick={handleSignup} className="auth-button">
              Sign Up
            </button>
          ) : (
            <button onClick={handleLogin} className="auth-button">
              Login
            </button>
          )}
          <button onClick={handleGoogleLogin} className="auth-button google">
            <FaGoogle style={{ marginRight: "10px" }} />
            Login with Google
          </button>
          <button onClick={handleGitHubLogin} className="auth-button github">
            <FaGithub style={{ marginRight: "10px" }} />
            Login with GitHub
          </button>
          <p>
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <span
              onClick={() => setIsSignup(!isSignup)}
              className="toggle-auth"
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      ) : (
        <div className="profile-container">
          {/* Profile Card - Shows at the top */}
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {profile?.name
                  ? profile.name.charAt(0).toUpperCase()
                  : user?.email.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <h2>{profile?.name || "Complete Your Profile"}</h2>
                <p className="profile-email">{user?.email}</p>
              </div>
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt /> Logout
              </button>
            </div>

            {profile && !isEditing && (
              <div className="profile-details-card">
                <div className="profile-detail-row">
                  <div className="profile-detail-item">
                    <FaUser className="profile-icon" />
                    <div>
                      <p className="detail-label">Name</p>
                      <p className="detail-value">
                        {profile.name || "Not set"}
                      </p>
                    </div>
                  </div>
                  <div className="profile-detail-item">
                    <FaPhone className="profile-icon" />
                    <div>
                      <p className="detail-label">Phone</p>
                      <p className="detail-value">
                        {profile.phone || "Not set"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="profile-detail-row">
                  <div className="profile-detail-item">
                    <FaBuilding className="profile-icon" />
                    <div>
                      <p className="detail-label">Company</p>
                      <p className="detail-value">
                        {profile.company || "Not set"}
                      </p>
                    </div>
                  </div>
                  <div className="profile-detail-item">
                    <div>
                      <p className="detail-label">Agency Status</p>
                      <p className="detail-value">
                        {profile.isAgency ? "Agency" : "Individual"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="profile-description">
                  <p className="detail-label">Description</p>
                  <p className="detail-value">
                    {profile.description || "No description provided."}
                  </p>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="edit-profile-button"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Account Settings Section */}
          <div className="account-settings">
            <h2>Account Settings</h2>

            {isEditing && (
              <div className="profile-edit-form">
                <h3>Update Your Profile</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="input-field"
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isAgency}
                    onChange={(e) => setIsAgency(e.target.checked)}
                  />
                  Is Agency
                </label>
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field description-field"
                />
                <div className="form-buttons">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                  <button onClick={updateProfile} className="update-button">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
