/* eslint-disable react/function-component-definition */
import { addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig';
import BasicModal from './Modal';
import styles from './PostNote.module.css';

const PostNote = () => {
  const { currentUser } = getAuth();

  const user = currentUser.uid;

  const saveNote = async (e) => {
    e.preventDefault();
    const title = e.target.inputT.value;
    const textNote = e.target.textA.value;

    try {
      await addDoc(collection(db, 'notes'), {
        title,
        note: textNote,
        date: new Date().toDateString(),
        user,
      });
    } catch (error) {
      console.log(error.message);
    }
    e.target.reset();
  };

  return (
    <section className={styles.postNote}>
      <form className={styles.formSaveN} onSubmit={saveNote}>
        <input className={styles.inputTitle} id="inputT" type="text" placeholder="Titulo de la nota" />
        <textarea className={styles.textArea} name="textA" id="textA" cols="30" rows="10" defaultValue="Escribe tu nota" />
        <button type="button" className={styles.btnSave}>Guardar</button>
      </form>
      <BasicModal />
    </section>
  );
};

export default PostNote;
