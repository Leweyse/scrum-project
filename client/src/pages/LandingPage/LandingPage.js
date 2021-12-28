import { Navbar, Footer, Carousel } from '../../components';

const LandingPage = () => {
    return (
        <>
            <Navbar />
            <main id={"landingPage"}>
                <div id={"landingPageLogoContainer"}>
                    <p className={"mainLogo"}>G-Bay</p>
                </div>
                <Carousel/>
            </main>
            <Footer />
        </>
    )
}

export default LandingPage;