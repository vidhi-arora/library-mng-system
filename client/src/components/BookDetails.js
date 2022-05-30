import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/authProvider';
import '../css/bookDetails.css';

export const BookDetails = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const { issue, issueBooks, token, role, deleteBook, getIssueBooks } = useContext(AuthContext);
    const [btnValue, setBtnValue] = useState("Issue Book");
    // const { addToast } = useToasts();

    useEffect(async () => {

        await getIssueBooks();

        // console.log(location.state.isbn);
        const response = await axios.get(`/searchby/isbn/${location.state.isbn}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data);


        let flag = 0;
        issue.every((book) => {
            if (book.isbn == location.state.isbn) {
                flag = 1;     //book is already issued
                return false;
            }
            return true;
        })
        console.log("flag = " + flag);

        if (response.data[0].copies < 1) {
            console.log('btn value changed');
            setBtnValue('Not available');
        }
        else if (flag === 1) {
            setBtnValue('Issued');
        }
        else if (issue.length === 5) {
            setBtnValue('Max out');
            toast.error('Issue limit reached', { duration: 5000 });
        }

    }, [])


    const issueFunc = () => {

        if (btnValue === 'Issued') {
            // addToast('Book is already issued', { appearance: 'error' });
            toast.error("Book is already issued");
        }
        else if (btnValue === 'Max out') {
            // addToast('Book is already issued', { appearance: 'error' });
            toast.error("Exceeding issue limit");
        }

        else {
            issueBooks(location.state);
            setBtnValue('Issued');
            // addToast('Book issued', { appearance: 'success' });
            toast.success("Book issued");
            // setBtnValue('Not available');
            // setBtnColor('btn--change');
        }

    }

    const deleteFunc = async (isbn) => {
        const resData = await deleteBook(isbn);
        console.log(resData);

        navigate('/dashboard/viewBooks');
        if (resData === 'Book deleted successfully')
            // addToast(resData, { appearance: 'success' });
            toast.success(resData);
        else
            // addToast(resData, { appearance: 'error' });     //in case book is currently issued
            toast.error(resData);

    }

    return (
        <>

            <div className="main-container">

                <div className="card mb-3 bookCard" style={{ maxWidth: 750 }}>
                    <div className="row g-0 cardRow">
                        <div className="col-md-6 cardImage">
                            <img src={location.state.image} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-6">
                            <div className="card-body cardBody">
                                <h3 className="card-title cardTitle">{location.state.name}</h3>
                                <p className="card-text text-muted cardText">By {location.state.author}</p>
                                <div className='bookDetails'>
                                    {/* <p><span className='titles'>Format: </span>Paperback</p> */}
                                    <p><span className='titles'>Language: </span>English</p>
                                    <p><span className='titles'>Pages: </span>{location.state.pages}</p>
                                    <p><span className='titles'>Publisher: </span>{location.state.publisher}</p>
                                    <p><span className='titles'>ISBN: </span>{location.state.isbn}</p>
                                    <p><span className='titles'>Rating: </span>{location.state.book_depository_stars}</p>
                                    <p><span className='titles'>Category: </span>{location.state.category}</p>
                                    <p><span className='titles'>Available Copies: </span><span className='copy'>{location.state.copies}</span></p>
                                </div>
                                {/* <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p> */}
                                {role === 'user' ? <>
                                    <button type="button" onClick={issueFunc} className={"btn btn-block issue-btn " + (btnValue === 'Not available' ? "btn-secondary disabled" : btnValue === 'Issued' ? 'issued' : btnValue === 'Max out' ? 'btn-secondary disabled' : "btn-dark")}>{btnValue}</button></>
                                    : <>
                                        <button type="button" onClick={() => deleteFunc(location.state.isbn)} className="btn delete-btn btn-dark ms-4 me-3">Delete</button>
                                        <button type="button" onClick={() => navigate('/dashboard/viewBooks/updateBook', { state: location.state })} className="btn delete-btn btn-dark">Update</button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* </div> */}
            </div>
        </>
    )
}