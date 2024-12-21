import React, { useState } from "react";
import styles from "./styles/SubjectSelection.module.css";

const SubjectSelection = ({ onSaveSubjects }) => {
  const [subjectCount, setSubjectCount] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [minAttendance, setMinAttendance] = useState("");

  const handleAddSubject = () => {
    if (subjectName && minAttendance && !isNaN(minAttendance)) {
      const newSubject = {
        name: subjectName,
        total: 0,
        attended: 0,
        minAttendance: Number(minAttendance),
      };
      setSubjects([...subjects, newSubject]);
      setSubjectName("");
      setMinAttendance("");
    } else {
      alert("Please provide valid subject name and minimum attendance percentage.");
    }
  };

  const handleSaveSubjects = () => {
    if (subjects.length === subjectCount) {
      onSaveSubjects(subjects);
    } else {
      alert(`You need to add ${subjectCount - subjects.length} more subject(s).`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Subject Selection</h2>
      <div className={styles.inputContainer}>
        <input
          type="number"
          value={subjectCount}
          onChange={(e) => setSubjectCount(Number(e.target.value))}
          placeholder="Number of subjects"
          className={styles.inputField}
          min="1"
        />
        <div className={styles.subjectInputs}>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Enter subject name"
            className={styles.subjectField}
          />
          <input
            type="number"
            value={minAttendance}
            onChange={(e) => setMinAttendance(e.target.value)}
            placeholder="Min attendance (%)"
            className={styles.subjectField}
            min="1"
            max="100"
          />
          <button onClick={handleAddSubject} className={styles.addSubjectButton}>
            Add Subject
          </button>
        </div>
      </div>
      <div className={styles.previewContainer}>
        <h3 className={styles.previewTitle}>Subjects Preview</h3>
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <div key={index} className={styles.subjectPreview}>
              <span>{subject.name}</span> - <span>{subject.minAttendance}%</span>
            </div>
          ))
        ) : (
          <p className={styles.noSubjects}>No subjects added yet.</p>
        )}
      </div>
      <button
        onClick={handleSaveSubjects}
        className={`${styles.addButton} ${subjects.length === subjectCount ? styles.activeButton : ""}`}
        disabled={subjects.length !== subjectCount}
      >
        Save Subjects
      </button>
    </div>
  );
};

export default SubjectSelection;
