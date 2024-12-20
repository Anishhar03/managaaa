import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import SubjectSelection from './components/SubjectSelection';
import AttendanceForm from './components/AttendanceForm';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false); // Will manage the flow

  const [subjects, setSubjects] = useState([]);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    if (storedUser) {
      setCurrentUser(storedUser);
      setSubjects(storedSubjects);
      setIsFirstTime(storedSubjects.length === 0); // If subjects are not set, ask for subject details
    }
  }, []);

  // Handle signup (Save user and move to subject entry)
  const handleSignup = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsFirstTime(true); // Direct to subject selection
  };

  // Handle login (Retrieve subjects if available)
  const handleLogin = (user) => {
    setCurrentUser(user);
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjects(storedSubjects);
    setIsFirstTime(storedSubjects.length === 0); // Direct to subject entry if no subjects saved
  };

  // Save subjects after subject entry
  const handleSaveSubjects = (subjects) => {
    setSubjects(subjects);
    localStorage.setItem('subjects', JSON.stringify(subjects));
    setIsFirstTime(false); // Move to attendance form
  };

  // Logout (Clear user data)
  const handleLogout = () => {
    setCurrentUser(null);
    setSubjects([]);
    setIsFirstTime(false); // Show login/signup
    localStorage.removeItem('currentUser');
    localStorage.removeItem('subjects');
  };

  return (
    <div>
      {/* If no user or first time with no subjects, show Login/Signup */}
      {!currentUser && (
        <div>
          <h1>Welcome to Attendance Manager</h1>
          {isFirstTime ? (
            <Signup onSignup={handleSignup} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
      )}

      {/* If user is logged in and no subjects, show Subject Selection */}
      {currentUser && isFirstTime && (
        <SubjectSelection onSaveSubjects={handleSaveSubjects} />
      )}

      {/* If subjects are saved, show the Attendance Form */}
      {currentUser && !isFirstTime && subjects.length > 0 && (
        <div>
          <AttendanceForm subjects={subjects} setSubjects={handleSaveSubjects} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
