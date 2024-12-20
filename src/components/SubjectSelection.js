import React, { useState } from 'react';
import styles from './styles/SubjectSelection.module.css';

const SubjectSelection = ({ onSaveSubjects }) => {
  const [subjectCount, setSubjectCount] = useState(0);
  const [subjects, setSubjects] = useState([]);

  const handleAddSubjects = () => {
    const subjectList = [];
    for (let i = 0; i < subjectCount; i++) {
      const subjectName = prompt('Enter subject name');
      const lowestAttendance = prompt('Enter minimum attendance percentage required');
      if (subjectName && lowestAttendance) {
        subjectList.push({
          name: subjectName,
          total: 0,
          attended: 0,
          minAttendance: lowestAttendance
        });
      } else {
        alert('Both subject name and attendance are required!');
        i--; // retry the input
      }
    }
    if (subjectList.length > 0) {
      setSubjects(subjectList);
      onSaveSubjects(subjectList); // Save subjects data
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Enter Number of Subjects</h2>
      <input
        type="number"
        value={subjectCount}
        onChange={(e) => setSubjectCount(Number(e.target.value))}
        placeholder="Number of subjects"
        className={styles.inputField}
        min="1"
      />
      <button onClick={handleAddSubjects} className={styles.addButton}>
        Add Subjects
      </button>
    </div>
  );
};

export default SubjectSelection;
