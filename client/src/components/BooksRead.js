import '../css/issued.css';
import noDataImg from '../images/bookheaders/norecordfound.png';
import HistoryGrid from './HistoryGrid';

export const BooksRead = () => {

    // const books = [{ "_id": { "$oid": "6245cc6cea525e229c4cef5e" }, "image": "https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/mid/9781/7807/9781780722405.jpg", "name": "The 8-week Blood Sugar Diet", "author": "Michael Mosley", "book_depository_stars": { "$numberInt": "4" }, "isbn": { "$numberLong": "9781780722405" }, "category": "Medical", "copies": "5" }]
    const books = null;

    return (
        <>
            <div className="main-container">

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark bookNav">
                    <div className="container-fluid">
                        <h4 style={{ color: 'whitesmoke' }}>History</h4>
                    </div>
                </nav>

                {books ?
                    // <div className='inner-container'>
                    <HistoryGrid />

                    /* <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Issue Date</th>
                            <th scope="col">Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>milk and honey</td>
                            <td>Rupi Kaur</td>
                            <td>14-04-22</td>
                            <td>28-04-22</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>milk and honey</td>
                            <td>Rupi Kaur</td>
                            <td>14-04-22</td>
                            <td>28-04-22</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>milk and honey</td>
                            <td>Rupi Kaur</td>
                            <td>14-04-22</td>
                            <td>28-04-22</td>
                        </tr>
                    </tbody>
                </table>  */
                    // </div>}
                    : <img src={noDataImg} className="no-data" />}

            </div>
        </>
    )
}