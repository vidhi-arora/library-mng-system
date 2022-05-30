import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/authProvider';
import '../css/issued.css';
import '../css/requestBook.css';
import '../css/viewBooks.css';
import requestBookImg from '../images/bookheaders/requestBook.jpg';

export const RequestBook = () => {

    const { requestbook } = useContext(AuthContext)
    // const { addToast } = useToasts();

    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');

    const submitRequest = async (props) => {
        // props.preventDefault();
        // if (bookName == '' || author == '')
        // addToast('Please fill all the details', { appearance: 'warning' });
        // toast.error("Please fill all the details");
        // else {
        requestbook(bookName, author)
        // addToast('Book requested successfully', { appearance: 'success' });
        toast.success("Book requested successfully");
        // }
    }

    return (
        <>
            <div className="main-container">

                {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark bookNav">
                    <div className="container-fluid">
                        <h5 style={{ color: 'whitesmoke' }}>Request Book</h5>
                    </div>
                </nav> */}

                <div class="container px-4 py-5 mx-auto">
                    <div class="cardd card0">

                        <div class="d-flex flex-lg-row flex-column-reverse">
                            <div class="cardd card1">
                                {/* <div class="row d-flex px-lg-4 px-3 pt-3">
                                    <h6 id="logo"><strong>hotjar</strong></h6>
                                </div> */}
                                <div className='row justify-content-center my-auto mx-auto'>
                                    <h2 className='header'>Request a Book</h2>
                                </div>
                                <div class="row justify-content-center my-auto">
                                    <div class="col-lg-8">
                                        {/* <div className="wrapper"> */}

                                        <form className="requestForm" onSubmit={submitRequest}>
                                            <div className="field">
                                                <input type="text" id="bookName"
                                                    aria-describedby="passwordHelpInline"
                                                    onChange={(e) => setBookName(e.target.value)} required />
                                                <label>Name of Book</label>
                                            </div>
                                            <div className="field">
                                                <input type="text"
                                                    id="authorName"
                                                    aria-describedby="passwordHelpInline"
                                                    onChange={(e) => setAuthor(e.target.value)} required />
                                                <label>Author Name</label>
                                            </div>
                                            {/* <div className="content">
                                                    <div className="checkbox">
                                                        <input type="checkbox" id="remember-me" />
                                                        <label for="remember-me">Remember me</label>
                                                    </div>
                                                    <div className="pass-link"><a href="#">Forgot password?</a></div>
                                                </div> */}
                                            <div className="field">
                                                <input type="submit" value="Submit" />
                                            </div>
                                            {/* <div className="signup-link">Not a member? <Link to="/signup">Signup now</Link></div> */}
                                        </form>
                                        {/* </div> */}

                                        {/* <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Name of Book</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Author Name</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="" />
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="" />
                                        </div> */}
                                        {/* <h3 class="mb-3">Get your free Hotjar account now.</h3> <small class="text-muted">Try Hotjar BUSINESS free for 15 days<br />Downgrade to Basic (Free Forever) anytime.</small>
                                        <div class="form-group mt-5"><label class="form-control-placeholder" for="name">Full Name</label>  <input className="temp" type="text" id="name" class="form-control" required /> </div>
                                        <div class="form-group mt-4"><label class="form-control-placeholder" for="mail">Email</label><input className="temp" type="email" id="mail" class="form-control" required /> </div> */}
                                    </div>
                                </div>
                            </div>
                            <div class="cardd card2"> <img id="image" src={requestBookImg} /> </div>
                        </div>
                        {/* https://images.pexels.com/photos/4245018/pexels-photo-4245018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1 */}
                    </div>
                </div>

            </div>
        </>
    )
}