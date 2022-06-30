import * as React from "react";
import {CCarousel, CCarouselCaption, CCarouselItem, CImage} from "@coreui/react";
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Box} from "@mui/material";

const MyLandingPageCarousel = () => {
    const CarouselData = [
        {
            headerText: null,
            subText: 'Sub Text One',
            image: 'https://picsum.photos/300/300',
        },
        {
            headerText: 'Header Text Two',
            subText: null,
            image: 'https://picsum.photos/1200/800',
        },
        {
            headerText: null,
            subText: null,
            image: 'https://picsum.photos/720/720',
        },
        {
            headerText: 'Header Text Four',
            subText: 'Sub Text Four',
            image: 'https://picsum.photos/1920/1080',
        },
        {
            headerText: 'Header Text Five',
            subText: 'Sub Text Five',
            image: 'https://picsum.photos/480/360',
        },
    ];

    return (
        <div style={{ zIndex : '-99' , display: 'inline-block' , height : '90vh'}}>
            <CCarousel controls indicators>
                <CCarouselItem>
                    <CImage className="d-block w-100" src='https://picsum.photos/300/300' alt="slide 1"/>
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src='https://picsum.photos/300/300' alt="slide 2"/>
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
                <CCarouselItem>
                    <CImage className="d-block w-100" src='https://picsum.photos/300/300' alt="slide 3"/>
                    <CCarouselCaption className="d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </CCarouselCaption>
                </CCarouselItem>
            </CCarousel>
        </div>
    );
};

export default MyLandingPageCarousel;