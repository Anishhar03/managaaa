import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import SubjectSelection from './components/SubjectSelection';
import AttendanceForm from './components/AttendanceForm';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('currentUser'));
      const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
      if (storedUser) {
        setCurrentUser(storedUser);
        setSubjects(storedSubjects);
        setIsFirstTime(storedSubjects.length === 0);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setCurrentUser(null);
      setSubjects([]);
    }
  }, []);

  const handleSignup = (user) => {
    if (!user.username || !user.password) {
      alert('Please provide valid username and password!');
      return;
    }
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setIsFirstTime(true);
  };

  const handleLogin = (user) => {
    if (!user.username || !user.password) {
      alert('Please provide valid username and password!');
      return;
    }
    setCurrentUser(user);
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjects(storedSubjects);
    setIsFirstTime(storedSubjects.length === 0);
  };

  const handleSaveSubjects = async (subjects) => {
    setLoading(true);
    try {
      setSubjects(subjects);
      localStorage.setItem('subjects', JSON.stringify(subjects));
      setIsFirstTime(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSubjects([]);
    setIsFirstTime(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('subjects');
  };

  return (
    <div>
      <h1>Welcome to Attendance Manager</h1>
      {loading && <div>Loading...</div>}
      {!loading && !currentUser && (
        <div>
          {isFirstTime ? (
            <Signup onSignup={handleSignup} />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
      )}
      {currentUser && isFirstTime && (
        <SubjectSelection onSaveSubjects={handleSaveSubjects} />
      )}
      {currentUser && !isFirstTime && subjects.length > 0 && (
        <div>
          <AttendanceForm subjects={subjects} setSubjects={handleSaveSubjects} />
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default App;
