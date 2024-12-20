import React, { useState } from 'react';
import styles from './styles/AttendanceForm.module.css';

const AttendanceForm = ({ subjects, setSubjects }) => {
  const [notification, setNotification] = useState('');

  const handleAttendance = (index, isPresent) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].total += 1;
    if (isPresent) {
      updatedSubjects[index].attended += 1;
    }
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));

    setNotification(isPresent ? 'Attendance marked as Present!' : 'Attendance marked as Absent!');
    setTimeout(() => setNotification(''), 3000); // Hide notification after 3 seconds
  };

  const handleClearAttendance = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].total = 0;
    updatedSubjects[index].attended = 0;
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));

    setNotification('Attendance cleared!');
    setTimeout(() => setNotification(''), 3000); // Hide notification after 3 seconds
  };

  return (
    <div className={styles.attendanceContainer}>
      <h2 className={styles.title}>Attendance Form</h2>
      <div className={notification ? styles.notification + ' ' + 'show' : styles.notification}>
        {notification}
      </div>
      {subjects.map((subject, index) => {
        const attendance = ((subject.attended / subject.total) * 100 || 0).toFixed(2);
        return (
          <div key={index} className={styles.subjectCard}>
            <h3 className={styles.subjectName}>{subject.name}</h3>
            <p className={styles.subjectStats}>Total Classes: {subject.total}</p>
            <p className={styles.subjectStats}>Classes Attended: {subject.attended}</p>
            <p className={styles.subjectStats}>Absent: {subject.total - subject.attended}</p>
            <p className={styles.subjectStats}>Attendance: {attendance}%</p>
            <button
              className={styles.attendanceButton}
              onClick={() => handleAttendance(index, true)}
            >
              Present
            </button>
            <button
              className={styles.attendanceButton}
              onClick={() => handleAttendance(index, false)}
            >
              Absent
            </button>
            <button
              className={styles.clearButton}
              onClick={() => handleClearAttendance(index)}
            >
              Clear Attendance
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceForm;