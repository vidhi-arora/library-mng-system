import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authProvider';

export const UpdateBook = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [book, setBook] = useState({ _id: location.state._id });     //book obj to be updated
    const [tempbook, setTempBook] = useState({});
    // { name: '', author: '', isbn: '', copies: 1, category: '', book_depository_stars: '', image: '', pages: '', publisher: '' }
    const { updateBook } = useContext(AuthContext);
    // const { addToast } = useToasts();

    useEffect(() => {
        if (location.state !== null)
            setTempBook({
                name: location.state.name, author: location.state.author, copies: location.state.copies, isbn: location.state.isbn, image: location.state.image, pages: location.state.pages, publisher: location.state.publisher, category: location.state.category, book_depository_stars: location.state.book_depository_stars
            });
        // , author: location.state.author, copies: 1, isbn: location.state.isbn, image: location.state.image, pages: location.state.pages, publisher: location.state.publisher, category: location.state.category, book_depository_stars: location.state.book_depository_stars
    }, [])

    const submitHandler = (props) => {
        // props.preventDefault();
        console.log(book);

        updateBook(book);
        navigate('/dashboard/viewBooks');
        // addToast('Book details updated', { appearance: 'success' });
        toast.success("Book details updated");
    }

    return (
        <>
            <div className="main-container">

                <div class="container px-4 py-5 mx-auto">
                    <div class="cardd card0">

                        <div class="d-flex flex-lg-row flex-column-reverse">
                            <div class="cardd card1">

                                <div className='row justify-content-center my-auto mx-auto'>
                                    <h2 className='header'>Update Book Details</h2>
                                </div>
                                <div class="row justify-content-center my-auto">
                                    <div class="col-lg-11">

                                        <form className="requestForm addbook" onSubmit={submitHandler}>
                                            <div className="field addbook">
                                                <input type="text" id="bookName"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, name: e.target.value })
                                                        setBook({ ...book, name: e.target.value })
                                                    }}
                                                    value={tempbook.name}
                                                    required />
                                                <label>Name of Book</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text"
                                                    id="authorName"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, author: e.target.value })
                                                        setBook({ ...book, author: e.target.value })
                                                    }}
                                                    value={tempbook.author}
                                                    required />
                                                <label>Author Name</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="pagesName"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, pages: e.target.value })
                                                        setBook({ ...book, pages: e.target.value })
                                                    }}       //ONLY THE VALUES CHANGED IN THE FORM WILL BE ADDED TO THE UPDATED BOOK OBJECT
                                                    value={tempbook.pages}
                                                    required />
                                                <label>Pages</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="publisherName"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, publisher: e.target.value })
                                                        setBook({ ...book, publisher: e.target.value })
                                                    }}
                                                    value={tempbook.publisher}
                                                    required />
                                                <label>Publisher</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="isbn"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, isbn: e.target.value })
                                                        setBook({ ...book, isbn: e.target.value })
                                                    }}
                                                    value={tempbook.isbn}
                                                    required />
                                                <label>ISBN</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="category"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, category: e.target.value })
                                                        setBook({ ...book, category: e.target.value })
                                                    }}
                                                    value={tempbook.category}
                                                    required />
                                                <label>Category</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="number" id="bookcopies"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, copies: e.target.value })
                                                        setBook({ ...book, copies: e.target.value })
                                                    }}
                                                    value={tempbook.copies}
                                                    required />
                                                <label>Available Copies</label>
                                            </div>
                                            <div className="field addbook">
                                                <input type="text" id="rating"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, book_depository_stars: e.target.value })
                                                        setBook({ ...book, book_depository_stars: e.target.value })
                                                    }}
                                                    value={tempbook.book_depository_stars}
                                                    required />
                                                <label>Rating</label>
                                            </div>
                                            <div className="field addbook updateBook">
                                                <input type="text" id="bookImage"
                                                    aria-describedby="passwordHelpInline"
                                                    autoComplete='off'
                                                    onChange={(e) => {
                                                        setTempBook({ ...tempbook, image: e.target.value })
                                                        setBook({ ...book, image: e.target.value })
                                                    }}
                                                    value={tempbook.image}
                                                    required />
                                                <label>Image</label>
                                            </div>

                                            <div className="field">
                                                <input type="submit" value="Submit" />
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div class="cardd card2 addbook updateBookImage"> <img id="image" src={location.state.image} /> </div>
                        </div>
                        {/* https://images.pexels.com/photos/4245018/pexels-photo-4245018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}
                    </div>
                </div>

            </div>
        </>
    )
}