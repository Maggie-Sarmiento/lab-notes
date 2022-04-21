import styles from "./Home.module.css"
import Header from "../sections/Header";
import ContainerNotes from "../sections/ContainerNotes";
import BasicModal from "../sections/Modal";

const Home = () => {

  return (
    <section className={styles.home}>
    <Header />
    <BasicModal type={'create'} />
    <ContainerNotes />
  </section>
  )
}

export default Home;