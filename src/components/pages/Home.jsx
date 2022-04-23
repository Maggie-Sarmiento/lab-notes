/* eslint-disable react/function-component-definition */
import Header from '../sections/Header';
import ContainerNotes from '../sections/ContainerNotes';
import BasicModal from '../sections/Modal';
import styles from './Home.module.css';

const Home = () => (
  <section className={styles.home}>
    <Header />
    <BasicModal type={'create'} />
    <ContainerNotes />
  </section>
);

export default Home;
