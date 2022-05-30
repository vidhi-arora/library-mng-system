import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';
import '../css/issued.css';
import noDataImg from '../images/bookheaders/norecordfound.png';
import MediaControlCard from './MUIcard';

export const IssuedBooks = () => {

    // const { addToast } = useToasts();
    const navigate = useNavigate();
    // const books = [{ "_id": { "$oid": "6245cc6cea525e229c4cef5e" }, "image": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/7807/9781780722405.jpg", "name": "The 8-week Blood Sugar Diet", "author": "Michael Mosley", "book_depository_stars": { "$numberInt": "4" }, "isbn": { "$numberLong": "9781780722405" }, "category": "Medical", "copies": "5" }]
    // const books = null;

    //returns the current date
    const getDate = () => {
        const d = new Date();
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const date = `${day}-${month}-${year}`;
        return date;
    }
    const { getIssueBooks, setIssue, issue, deleteIssue } = useContext(AuthContext);

    useEffect(async () => {
        await getIssueBooks();
    }, [])

    const returnbtn = async (book) => {

        await deleteIssue(book.isbn);
        // addToast('Book returned successfully', { appearance: 'success' });
        toast.success("Book returned successfully");

        var list = [...issue];
        var index = issue.indexOf(book);

        console.log(`clicked on ${book.Name}`);

        if (index !== -1) {
            list.splice(index, 1);
            setIssue(list);
        }
        //  await returnBooks(book);
    }

    // const issueList = issue.map((book) =>
    //     <MediaControlCard data={book} returnFn={returnbtn} key={book._id} />
    // )

    return (
        <>
            <div className="main-container">

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark bookNav">
                    <div className="container-fluid">
                        <h4 style={{ color: 'whitesmoke' }}>Issued Books</h4>
                    </div>
                </nav>

                {issue.length !== 0 ?

                    <Box sx={{ flexGrow: 0 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <>
                                {issue.map((book, index) => (
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <MediaControlCard data={book} returnFn={returnbtn} />
                                    </Grid>
                                ))}
                            </>
                        </Grid>
                    </Box>
                    : <img src={noDataImg} />}

            </div>

        </>
    )
}