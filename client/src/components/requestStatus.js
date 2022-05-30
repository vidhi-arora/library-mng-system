import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authProvider";
import noDataImg from "../images/bookheaders/norecordfound.png";
import reqStatusImg from "../images/bookheaders/Reading list-pana.png";

export const RequestStatus = () => {

    const { userRequests, getUserRequests } = useContext(AuthContext);

    useEffect(async () => {
        await getUserRequests();
    })

    const reqList = userRequests.map((request, index) =>
        <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{request.name}</td>
            <td>{request.author}</td>
            <td>{request.requestedOn}</td>
            <td className={request.status === "Approved" ? 'text-success' : request.status === "Pending" ? 'text-secondary' : 'text-danger'}>{request.status === "Rejected" ? "Book not available" : request.status}</td>
        </tr >
    )

    return (
        <>

            <div className="main-container">
                <a href="https://storyset.com/data"></a>
                {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark bookNav">
                    <div className="container-fluid">
                        <h4 style={{ color: 'whitesmoke' }}>Request Status</h4>
                    </div>
                </nav> */}
                <div className='row justify-content-center mx-auto mb-3 '>
                    <h2 className='reqHeader'>Request Status</h2>
                </div>

                <div className="row requestBookRow">
                    <div className="col-md-6" style={{ borderRadius: 8, objectFit: 'contain' }}>
                        <img src={reqStatusImg} className="reqStatusImg" />
                    </div>
                    <div className="col-md-6">
                        {reqList.length === 0 ? <img src={noDataImg} className="no-data" /> :
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Book Name</th>
                                        <th scope="col">Author</th>
                                        <th scope="col">Requested On</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="reqtable">
                                    {reqList}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}