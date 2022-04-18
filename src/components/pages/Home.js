import styles from "./Home.module.css"
import Header from "../sections/Header";
import PostNote from "../sections/PostNote";
import ContainerNotes from "../sections/ContainerNotes";

const Home = () => {

  return (
    <section className={styles.home}>
    <Header />
    <PostNote />
    <ContainerNotes />
  </section>
  )
}

export default Home;