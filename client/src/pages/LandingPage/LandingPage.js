import { Navbar, Footer } from '../../components';
import Carousel from 'react-bootstrap/Carousel';

import Yellow from '../../assets/images/ead637.jpg';
import Red from '../../assets/images/df2935.jpg';
import Green from '../../assets/images/006d77.jpg';

const CarouselSlider = () => {
    return (
        <Carousel className={"carouselSlider"}>
            <Carousel.Item interval={1000}>
                <img
                    className="d-block w-100"
                    src={Green}
                    alt="First slide"
                />
                <Carousel.Caption className={"carouselCaption"}>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    className="d-block w-100"
                    src={Red}
                    alt="Second slide"
                />
                <Carousel.Caption className={"carouselCaption"}>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Yellow}
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <main id={"landingPage"}>
                <div id={"landingPageLogoContainer"}>
                    <p className={"mainLogo"}>B-Bay</p>
                </div>
                <div id={"landingPageCarouselContainer"}>
                    <CarouselSlider />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default LandingPage;