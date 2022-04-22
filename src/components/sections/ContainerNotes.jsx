/* eslint-disable react/function-component-definition */
import { useState, useEffect } from 'react';
import {
  collection, orderBy, query, onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import Note from './Note';
import styles from './ContainerNotes.module.css';

const ContainerNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const q = query(
        collection(db, 'notes'),
        orderBy('date', 'asc'),
      );
      onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setNotes(docs);
        console.log(docs);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className={styles.containerNotes}>
      {
        notes.map((elem) => (
          <Note
            key={elem.id}
            id={elem.id}
            title={elem.title}
            text={elem.note}
            date={elem.date}
          />
        ))
      }
    </section>
  );
};

export default ContainerNotes;
