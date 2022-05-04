import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Button from './Button';


const Header = ({title,onToggle,toggleAdd}) => {
  const location = useLocation()

  return (
    <header className='header'>
        <h1>{title}</h1>
        {location.pathname==='/' && <Button color={toggleAdd?'red':'blue'} 
        text={toggleAdd?'Close':'Add'} 
        onClick={onToggle}/>}
    </header>
  )
}

Header.defaultProps = {
    title:'Task Tracker',
}

Header.propTypes ={
    title:PropTypes.string.isRequired,
}

export default Header