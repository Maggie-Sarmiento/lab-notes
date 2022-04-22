/* eslint-disable react/prop-types */
import styles from "./Note.module.css"
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebaseConfig"
import PopDelete from "./PopDelete";
import BasicModal from "./Modal";

const Note = ({id, title, text, date}) => {
  const [openPop, setOpenPop] = useState(false);

  const deleteNote = async () => {
    try {
      const result = window.confirm('Seguro que deseas borrar esta nota?');
      if (result) {
        await deleteDoc(doc(db, 'notes', id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={styles.note}>
      <div className={styles.bodyNote}>
        <div className={styles.foot}>
            <h4>{title}</h4>
          <div className={styles.btnsContainer}>
            <BasicModal  type={'edit'} id={id} title={title} text={text} />
            <button className={`${styles.btn} ${styles.btnDelete}`} onClick={deleteNote}>🗑</button>
            {/* <button className={`${styles.btn} ${styles.btnEdit}`} onClick={() => setOpenPop(true)}>🖉</button> */}
          </div>
        </div>
        <p>{text}</p>
        <h6>{date}</h6>
      </div>
    </section>
  )
}

export default Note;