/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {
  addDoc, collection, updateDoc, doc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase/firebaseConfig';
import styles from './Modal.module.css';

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

export default function BasicModal({ type, id, title, text }) {
  const [open, setOpen] = useState(false);
  const [tittleError, setTitleError] = useState('');
  const [textError, setTextError] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { currentUser } = getAuth();
  const user = currentUser.uid;

  const [userN, setuserN] = useState({
    id: '',
    title: '',
    text: '',
  });

  useEffect(() => {
    if (type === 'edit') {
      setuserN(
        {
          ...userN,
          title,
          text,
          id,
        },
      );
    }
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setuserN({ ...userN, [name]: value });
  };

  const saveNote = async (e) => {
    e.preventDefault();
    console.log(userN);
    const { title } = userN;
    const textNote = userN.text;

    if (title.length === 0 || textNote.length === 0) {
      e.preventDefault();
      title.length === 0 ? setTitleError('Titulo Requerido') : false;
      textNote.length === 0 ? setTextError('Texto Requerido') : false;
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), {
        title,
        note: textNote,
        date: new Date().toDateString(),
        user,
      });
      handleClose();
      setTitleError('');
      setTextError('');
    } catch (error) {
      console.log(error.message);
    }
    e.target.reset();
  };

  const updateNote = async (e) => {
    e.preventDefault();
    console.log('editando');
    const { id } = userN;
    const { title } = userN;
    const textNote = userN.text;
    handleClose();
    try {
      await updateDoc(doc(db, 'notes', id), {
        title,
        note: textNote,
        date: new Date().toDateString(),
        user,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles.containerModal}>
      <Button onClick={handleOpen}>{ type === 'create' ? 'Crear nota' : '🖉' }</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={type === 'create' ? saveNote : updateNote}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Escribe tu nota
            </Typography>
            <TextField
              name="title"
              label="Titulo"
              variant="standard"
              sx={styleT}
              error={tittleError.length !== 0}
              helperText={tittleError}
              onChange={handleChange}
              value={userN.title}
            />
            <TextField
              name="text"
              label=""
              multiline
              rows={6}
              value={userN.text}
              error={textError.length !== 0}
              helperText={textError}
              onChange={handleChange}
            />
            <Button type="submit">{ type === 'create' ? 'Guardar' : 'Guardar' }</Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
}
