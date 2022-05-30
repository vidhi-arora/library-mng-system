import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useContext } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { AuthContext } from '../context/authProvider';
import "../css/customCard.css";

export default function MediaControlCard({ data, returnFn }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);

    const checkDate = (book) => {
        const due_arr = book.dueDate.split('-');

        const dueDate = new Date(due_arr[2], due_arr[1] - 1, due_arr[0]);   //yyyy,mm,dd
        const dateToday = new Date();

        if (dateToday >= dueDate)
            return true;

        return false;
    }

    const params = [
        [`bookName`, `${data.Name}`],
    ];
    const pathname = '/dashboard/viewBooks/bookDetails';

    return (
        // onClick={() => navigate("/dashboard/read/bookDetails", { state: data })}
        <Card sx={{ display: 'flex', cursor: 'pointer' }} className="muicard" >

            <Box sx={{ display: 'flex', flexDirection: 'column' }} className='cardBox'>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" className='clipText'>
                        {data.Name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ marginBottom: 2 }}>
                        {data.author}
                    </Typography>

                    <Typography variant="p" color="text.secondary" component="div">
                        Issue Date:&nbsp; {data.issuedOn}
                    </Typography>
                    <Typography variant="p" color="text.secondary" className={checkDate(data) ? 'return-date-text' : ''} component="div">
                        Due Date:&nbsp; {data.dueDate}
                    </Typography>
                    {/* color="success" */}
                    <Button variant="contained" className="return-btn" onClick={() => returnFn(data)}>Return</Button>
                </CardContent>

                {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box> */}
            </Box>
            <CardMedia
                className='cardMedia'
                component="img"
                sx={{ width: 'auto', height: '16rem', objectFit: 'contain', padding: '0.8rem' }}
                image={data.image}
                alt="..." onClick={async () => {
                    const response = await axios.get(`/searchby/isbn/${data.isbn}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    navigate(`${pathname}?${createSearchParams(params)}`, { state: response.data[0] })
                }}
            />

        </Card>
    );
}
