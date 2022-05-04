import { Link } from "react-router-dom";
const date = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
        <p>Copyright &copy; {date}</p>
        <Link to='/about'>About</Link>
    </footer>
  )
}

export default Footer