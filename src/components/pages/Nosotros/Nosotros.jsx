/* eslint-disable react/function-component-definition */
import Header from '../../sections/Header/Header';
import styles from './Nosotros.module.css';

const Nosotros = () => (
  <>
    <Header />
    <section className={styles.nosotros}>
      <h2 className={styles.h2Nosotros}>Sobre nosotros</h2>
      <img src="https://svgshare.com/i/gSx.svg" alt="img-nosotros" className={styles.imgNosotros} />
      <p className={styles.pNosotros}>
        Somos una applicación dedicada al uso de notas Lorem Ipsum is simply dummy text of
        {' '}
        <br />
        the printing and typesetting industry. Lorem Ipsum has been the industry`&apos;`s
        standard dummy
        {' '}
        <br />
        text ever since the 1500s, when an unknown printer took a galley of type and scrambled it
        {' '}
        <br />
        to make a type specimen book. It has survived not only five centuries, but also the leap
        {' '}
        <br />
        into electronic typesetting, remaining essentially unchanged. It was popularised in the
        {' '}
        <br />
        1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
        {' '}
        <br />
        with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

      </p>
    </section>
  </>
);

export default Nosotros;
