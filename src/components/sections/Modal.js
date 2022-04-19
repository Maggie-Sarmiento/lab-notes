/* eslint-disable react/prop-types */
import styles from './Modal.module.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { db } from "../../firebase/firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const styleT = {
  marginBottom: 1,
};

export default function BasicModal({type}) {
  const [open, setOpen] = React.useState(false);
  const [tittleError, setTitleError] = React.useState('');
  const [textError, setTextError] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { currentUser } = getAuth()
  let user = currentUser.uid

  const saveNote = async(e) => {
    console.log('Entre al saveNote');
    e.preventDefault()
    const title = e.target.inputT.value
    const textNote = e.target.textA.value

    if (title.length === 0 || textNote.length === 0) {
      e.preventDefault()
      title.length === 0 ? setTitleError('Titulo Requerido') : false
      textNote.length === 0 ? setTextError('Texto Requerido') : false
      return
    }


    try {
      await addDoc(collection(db, "notes"), {
        title,
        note: textNote,
        date: new Date().toDateString(),
        user
      })
      handleClose()
      setTitleError('')
      setTextError('')
    } catch (error) {
      console.log(error.message);
    }
    e.target.reset()
  }

  return (
    <div className={styles.containerModal}>
      <Button onClick={handleOpen} className={styles.btn}>{ type === 'create' ? 'Crear nota' : '🖉' }</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={saveNote}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Escribe tu nota
            </Typography>
            <TextField id="inputT" label="Titulo" variant="standard" sx={styleT} error={tittleError.length === 0 ? false : true } helperText={tittleError} />
            <TextField
              id="textA"
              label=""
              multiline
              rows={6}
              defaultValue="Hacer calculo de la derivada que dejo la Yuca"
              error={textError.length === 0 ? false : true } helperText={textError}
            />
            <Button type="submit">Guardar</Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
}