import { createSearchParams, useNavigate } from 'react-router-dom';
import '../css/customCard.css';

export const CustomCard = ({ details }) => {

    const navigate = useNavigate();
    const params = [
        [`bookName`, `${details.name}`],
    ];
    const pathname = '/dashboard/viewBooks/bookDetails';

    return (
        <>
            <div className="card custom" onClick={() => {
                navigate(`${pathname}?${createSearchParams(params)}`, { state: details });
            }}>
                <img src={details.image} className="card-img-top" style={{ height: '11rem' }} />
                <div className="card-body custom-body">
                    <p className="card-title clipText" style={{ fontWeight: 'bold' }}>{details.name}</p>
                    <p className="card-text custom-text" style={{ color: '#616161' }}>{details.author}</p>
                </div>
            </div>
            {/* <button type="button" className='btn btn-outline-secondary btn-sm issue-btn' value='submit'>Issue Book</button> */}
        </>
    )
}