import { useAuth } from "../../context/authContext";

const Home = () => {

const { user } = useAuth()
console.log(user);

  return (
  <section className="home">
    <div>
      <form>
        <textarea name="textA" id="textA" cols="30" rows="10" defaultValue='Hola' />
          <button>Guardar</button>
      </form>
    </div>
  </section>
  )
}


export default Home;