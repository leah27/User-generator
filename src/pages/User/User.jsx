import { useLocation } from 'react-router-dom'
import style from './User.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faUser, faLocationDot, faFaceFrown } from '@fortawesome/free-solid-svg-icons'

const User = () => {
    const location = useLocation()
    let user = location.state
    return (
        <>
            {user !== null && window.location.pathname.includes(user.login.username) ? <div className={style.wrapper}>
                <img src={user.picture.large} alt='photo' className={style.photo} />
                <div className={style.info}>
                    <p><span className={style.key}><FontAwesomeIcon icon={faPassport} /> full name: </span>{Object.values(user.name).slice(1).join(' ')}</p>
                    <p><span className={style.key}><FontAwesomeIcon icon={faUser} /> username: </span>{user.login.username}</p>
                    <p><span className={style.key}><FontAwesomeIcon icon={faLocationDot} /> address: </span>{Object.values(user.location.street) + ',' + user.location.city + ' ' + user.location.postcode}</p>
                </div>
            </div> : <div className={style.notFound}>user not found <FontAwesomeIcon icon={faFaceFrown} /></div>}
        </>
    )
}

export default User