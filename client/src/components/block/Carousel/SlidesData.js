import SlideElement from "../SlideElement/SlideElement";

export const SlidesData = [
    {
        div: (
            <>
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText carouselBuySlideElement"}
                    content={"Buy"}
                />
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText carouselSellSlideElement"}
                    content={"Sell"}
                />
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText carouselBidSlideElement"}
                    content={"Bid"}
                />
            </>
        )
    },
    {
        div: (
            <>
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText"}
                    content={"Misc"}
                />
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText"}
                    content={"Misc"}
                />
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText"}
                    content={"Misc"}
                />
            </>
        )
    }
]