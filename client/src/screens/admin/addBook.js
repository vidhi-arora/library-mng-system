import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/authProvider';
import addBookImg from '../../images/bookheaders/addBook.jpg';

export const AddBook = () => {

    const location = useLocation();
    const [book, setBook] = useState({ name: '', author: '', isbn: '', category: '', book_depository_stars: '', image: '', pages: '', publisher: '' });

    const { addbook, setRequestStatus } = useContext(AuthContext);
    // const { addToast } = useToasts();


    useEffect(() => {

        console.log(location);
        if (location.state !== null) {
            setBook({ name: location.state.name, author: location.state.author });
            // flag = 1;
            // console.log(location);
        }

    }, [])

    const submitHandler = (props) => {
        props.preventDefault();
        console.log(book);
        // console.log(location);

        addbook(book);

        if (location.state !== null) {
            setRequestStatus(location.state._id, "Approved");
            console.log("approved");
        }

        // addToast('Book added successfully', { appearance: 'success' });
        toast.success('Book added successfully');

        //delete book from requested books db
        // deletereq(book);
        setBook({});
    }

    return (
        <>
            <div className="main-container">

                <div class="container px-4 py-5 mx-auto">
                    <div class="cardd card0">

                        <div class="d-flex flex-lg-row flex-column-reverse">
                            <div class="cardd card1">

                                <div className='row justify-content-center my-auto mx-auto'>
                                    <h2 className='header addbook'>Add a Book</h2>
                                </div>
                                <div class="row justify-content-center my-auto">
                                    <div class="col-lg-11">

                                        <form className="requestForm addbook" onSubmit={submitHandler}>
                                            <div className="field addbook">
                                                <input type="text" id="bookName"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => setBook({ ...book, name: e.target.value })}
                                                    value={book.name}
                                                    required />
                                                <label>Name of Book</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text"
                                                    id="authorName"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => setBook({ ...book, author: e.target.value })}
                                                    value={book.author}
                                                    required />
                                                <label>Author Name</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="pagesName"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => setBook({ ...book, pages: e.target.value })}
                                                    value={book.pages}
                                                    required />
                                                <label>Pages</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="publisherName"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => setBook({ ...book, publisher: e.target.value })}
                                                    value={book.publisher}
                                                    required />
                                                <label>Publisher</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="isbn"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                                                    value={book.isbn}
                                                    required />
                                                <label>ISBN</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="category"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => setBook({ ...book, category: e.target.value })}
                                                    value={book.category}
                                                    required />
                                                <label>Category</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="bookImage"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => setBook({ ...book, image: e.target.value })}
                                                    value={book.image}
                                                    required />
                                                <label>Image</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="rating"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => setBook({ ...book, book_depository_stars: e.target.value })}
                                                    value={book.book_depository_stars}
                                                    required />
                                                <label>Rating</label>
                                            </div>

                                            <div className="field">
                                                <input type="submit" value="Submit" />
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div class="cardd card2 addbook"> <img id="image" src={addBookImg} /> </div>
                        </div>
                        {/* https://images.pexels.com/photos/4245018/pexels-photo-4245018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}
                    </div>
                </div>

            </div>
        </>
    )
}