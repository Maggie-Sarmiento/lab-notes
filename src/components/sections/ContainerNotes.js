import styles from "./ContainerNotes.module.css"
import Note from "./Note"
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext"
import { collection, orderBy, query, onSnapshot} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const ContainerNotes = () => {
/*   const { currentUser } = useAuth(); */
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "notes"),
        orderBy("date", "asc"),
      );
      onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({id: doc.id, ...doc.data()});
        });
        setNotes(docs);
        console.log(docs);
      })
    } catch (error) {
        console.log(error)
    }

  }, []);

  return (
    <section className={styles.containerNotes}>
        {
          notes.map((elem) => <Note key={elem.id} id={elem.id} title={elem.title} text={elem.note} date={elem.date} />)
        }
    </section>
  )
}

export default ContainerNotes;