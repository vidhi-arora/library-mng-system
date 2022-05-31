import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomCard } from '../components/card';
import '../css/customCard.css';
import noDataImg from '../images/bookheaders/norecordfound.png';

export const BooksPanel = (props) => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 2,
        },
        tablet: {
            breakpoint: { max: 1024, min: 596 },
            items: 3,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 596, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    // console.log(props.data);
    const bookList = props.data.map((book, index) => <CustomCard details={book} key={index} />)

    return (

        <>
            {/* MUI category card */}
            <Card sx={{ maxWidth: 180, maxHeight: 55, marginTop: 2, marginBottom: 0 }}>
                <CardMedia
                    component="img"
                    height="12"
                    // sx={{ margin: 0, padding: 0 }}
                    // image="/static/images/cards/contemplative-reptile.jpg"
                    // alt="green iguana"
                    image={props.panelBanner}
                />
                <CardContent>
                    <Typography variant="p" component="div" sx={{ margin: 0, padding: 0 }}>
                        {props.title}
                    </Typography>
                </CardContent>
            </Card>

            {/* carousel */}
            {props.data.length === 0 ? <img src={noDataImg} /> :
                <div className='panel-container'>
                    <div className='row'>

                        <Carousel responsive={responsive}
                            draggable={true}
                            swipeable={false}
                            autoPlay={false}
                            autoPlaySpeed={100000}
                            // infinite={true}
                            partialVisible={false}
                            centerMode={false}
                        >
                            {bookList}

                        </Carousel>

                    </div>
                    <hr />
                </div>}
            {/*carousel-container*/}
        </>
    )
}