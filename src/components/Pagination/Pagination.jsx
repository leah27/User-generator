import style from './Pagination.module.css'

const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <ul className={style.navigation}>
                {pageNumbers.map(number => <li key={number}>
                    <button onClick={() => paginate(number)} className={`${style.button} ${number == currentPage ? style.active : ''}`}>{number}</button>
                </li>)}
            </ul>
        </div>
    )
}

export default Pagination