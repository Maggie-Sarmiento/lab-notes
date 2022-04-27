import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import styles from './Note.module.css';

// eslint-disable-next-line react/prop-types
export default function AlertDialog({ id }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteNote = async () => {
    try {
      console.log(id);
      await deleteDoc(doc(db, 'notes', id));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button type="button" className={`${styles.btn} ${styles.btnDelete}`} onClick={handleClickOpen}>🗑</button>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Estas seguro de borrar esta nota?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No podras deshacer los cambios
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteNote}>Aceptar</Button>
          <Button onClick={handleClose} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
