import style from './Index.module.css'
import { Link } from "react-router-dom";

const Index = ({data}) => {
    let randomUser = data[Math.floor(Math.random() * data.length)];
    return (
        <div className={style.wrapper}>
            <div className={style.button}>
                <Link to={"/users"}>Users list</Link>
            </div>
            <div className={style.button}>
                <Link to={`/user/:` + randomUser.login.username} state={randomUser}>Randomize user</Link>
            </div>
        </div>
    )
}

export default Index