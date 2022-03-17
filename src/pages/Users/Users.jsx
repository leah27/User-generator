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
    const [searchTerm, setSearchTerm] = useState('')
    const columns = ['', 'name.first', 'name.last', 'location.city', 'email']
    const handleChange = event => {
        event.persist()
        setSearchTerm(event.target.value)
        setCurrentPage(1)
    }
    const searchResult = (users) => {
        return users.filter(user =>
            user.name.first.toLowerCase().includes(searchTerm) ||
            user.location.city.toLowerCase().includes(searchTerm)
        )
    }
    const currentUsers = searchResult(data).slice(firstUserIndex, lastUserIndex) 
    return (
        <>
            <input placeholder="Search" type="text" autoComplete="off" value={searchTerm} onChange={handleChange} className={style.search} />
            <table cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>{columns.map((heading, index) => <th key={index}>
                        {heading === 'location.city' ? heading.split('.')[1] : heading.replace('.', ' ').split(' ').reverse().join(' ')}
                        {heading === 'email' ? <FontAwesomeIcon icon={!hideEmail ? faEye : faEyeSlash} style={{ cursor: 'pointer', paddingLeft: '7px' }} onClick={() => { setHideEmail(!hideEmail) }} />
                            : heading === '' ? <FontAwesomeIcon icon={faLink} /> : ''}
                    </th>)}
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user =>
                        <tr key={user.login.uuid}>
                            {columns.map((column, index) => <td key={index}>
                                {column === '' ? <Link to={`/user/:${user.login.username}`} state={user}>
                                    <img src={user.picture.medium} alt='photo' className={style.photo} /></Link>
                                    : (column === 'email' && hideEmail) ? user.email.replace(/./gi, "x")
                                        : column.split('.').reduce((o, i) => o[i], user)}
                            </td>)}
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} dataPerPage={usersPerPage} totalData={searchTerm === '' ? data.length : searchResult(data).length} paginate={(pageNumber) => setCurrentPage(pageNumber)} />
        </>
    )
}

export default Users