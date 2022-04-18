/* eslint-disable react/prop-types */
import styles from'./PopDelete.module.css'
const PopDelete = ({openPop, onClose}) => {
  if(!openPop) return null;

  return (
    <section className={styles.overlay} id="overlay">
      <div className={styles.popup}>
        <button className={styles.btnClosePopup} id="btnClosePopup" onClick={onClose}>X</button>
        <h3> Nota </h3>
        <form className={styles.formSaveN} /* onSubmit={saveNote} */>
          <input className={styles.inputTitle} id="inputT" type="text" placeholder="Titulo de la nota" />
          <textarea className={styles.textArea} name="textA" id="textA" cols="30" rows="10" defaultValue='Escribe tu nota' />
            <button className={styles.btnSave}>Guardar</button>
        </form>
      </div>
    </section>
  )
}

export default PopDelete;