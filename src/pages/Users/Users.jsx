import React, { useState } from "react";
import style from './Users.module.css'
import Pagination from "../../components/Pagination/Pagination";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faLink } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Users = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(10)
    const [hideEmail, setHideEmail] = useState(false)
    const lastUserIndex = currentPage * usersPerPage
    const firstUserIndex = lastUserIndex - usersPerPage
    const currentUsers = data.slice(firstUserIndex, lastUserIndex)
    const [searchTerm, setSearchTerm] = useState('')
    const columns = ['', 'firstName', 'lastName', 'city', 'email']
    const handleChange = event => {
        event.persist()
        setSearchTerm(event.target.value) 
    }
    const searchResult = (users) => {
        return users.filter(user =>
           user.name.first.toLowerCase().includes(searchTerm) ||
           user.location.city.toLowerCase().includes(searchTerm)
        )
    }
    return (
        <>
            <input placeholder="Search" type="text" autoComplete="off" value={searchTerm} onChange={handleChange} className={style.search} />
            <table cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>{columns.map((heading, index) => <th key={index}>
                        {heading.replace(/(?=[A-Z])/, ' ')}
                        {heading === 'email' ? <FontAwesomeIcon icon={!hideEmail ? faEye : faEyeSlash} style={{ cursor: 'pointer', paddingLeft: '7px' }} onClick={() => { setHideEmail(!hideEmail) }} />
                        : heading === '' ? <FontAwesomeIcon icon={faLink} /> : ''}
                    </th>)}
                    </tr>
                </thead>
                <tbody>
                    {searchResult(currentUsers).map((user, index) => 
                        <tr key={index}>
                            <td><Link to={`/user/:${user.login.username}`} state={user}><img src={user.picture.medium} alt='photo' className={style.photo} /></Link></td>
                            <td>{user.name.first}</td>
                            <td>{user.name.last}</td>
                            <td>{user.location.city}</td>
                            <td>{!hideEmail ? user.email : user.email.replace(/./gi, "x")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} dataPerPage={usersPerPage} totalData={data.length} paginate={(pageNumber) => setCurrentPage(pageNumber)} />
        </>
    )
}

export default Users