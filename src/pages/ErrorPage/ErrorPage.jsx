import style from './ErrorPage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons'

const ErrorPage = () => {
    return (
        <div className={style.notFound}>404, page not found <FontAwesomeIcon icon={faFaceFrown} /></div>
    )
}

export default ErrorPage