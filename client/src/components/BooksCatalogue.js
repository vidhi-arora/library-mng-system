import * as React from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';
import '../css/viewBooks.css';
import classicsBn from '../images/bookheaders/classics.jpg';
import fantasyBn from '../images/bookheaders/fantasy.png';
import fictionBn from '../images/bookheaders/fiction.jpg';
import horrorBn from '../images/bookheaders/horror.jpg';
import mysteryBn from '../images/bookheaders/mystery.png';
import youngAdultBn from '../images/bookheaders/youngAdult.jpg';
import { BooksPanel } from './booksPanel';

export default function BooksCatalogue() {

    // const { addToast } = useToasts();
    const [option, setOption] = React.useState('name');
    const [value, setValue] = React.useState('Search By');
    const [searchValue, setSearchValue] = React.useState('');
    const { searchbook } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const { getBooks, token, role, classics, fiction, fantasy, horror, youngAdult, mystery } = React.useContext(AuthContext);

    //to set search params
    const params = [
        [`${option}`, `${searchValue}`],
    ];
    const pathname = '/dashboard/viewBooks/search';
    // const obj = { option: `${option}`, value: `${value}`, searchValue: `${searchValue}` };  //obj for useLocation

    const searchHandler = (e) => {
        e.preventDefault();
        // if (option === 'Search By') {
        //     addToast('Please select a search option', { appearance: 'error' });
        //     return true;
        // }

        searchbook(option, searchValue);
        navigate(`${pathname}?${createSearchParams(params)}`);
    }

    // console.log(role);

    React.useEffect(async () => {

        await getBooks('Fiction');
        await getBooks('Classics');
        await getBooks('Fantasy');
        await getBooks('Horror');
        await getBooks('Mystery');
        await getBooks('Young Adult');
        // await getRequestedBooks();

        // getFine();
        // console.log(token + " " + role);
        // return () => {
        console.log("Books loaded");
        // }

    }, [])

    return (
        <>
            <div className="main-container">

                {/* NAVBAR */}
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        {/* <a className="navbar-brand" href="#">Navbar</a> */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {value}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="#" onClick={(e) => {
                                            setValue('Title')
                                            setOption('name')
                                        }}>Title</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={(e) => {
                                            setValue('Author')
                                            setOption('author')
                                        }}>Author</a></li>
                                        {/* <li><a className="dropdown-item" href="#" onClick={() => setOption('Category')}>Category</a></li> */}
                                    </ul>
                                </li>
                            </ul>
                            <form className="d-flex" onSubmit={searchHandler}>
                                <input className="form-control me-2" onChange={(e) => setSearchValue(e.target.value)} type="search" placeholder="Search books" aria-label="Search" />
                                <button className="btn btn-outline-primary" type="submit">Search</button>
                            </form>
                        </div> {/*collapsible div */}

                    </div>
                </nav>


                {/* inner-container */}

                <div className="inner-container">

                    <BooksPanel data={youngAdult} title="YoungAdult" panelBanner={youngAdultBn}
                    />
                    <BooksPanel data={fiction} title="Fiction" panelBanner={fictionBn}
                    />
                    <BooksPanel data={mystery} title="Mystery" panelBanner={mysteryBn}
                    />
                    <BooksPanel data={classics} title="Classics" panelBanner={classicsBn}
                    />
                    <BooksPanel data={horror} title="Horror" panelBanner={horrorBn}
                    />
                    <BooksPanel data={fantasy} title="Fantasy" panelBanner={fantasyBn}
                    />
                </div>

            </div > {/*main-container*/}

        </>
    );
}
