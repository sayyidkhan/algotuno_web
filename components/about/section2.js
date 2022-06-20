import React from 'react';
import {Container, Box, Flex, Heading, Text} from 'theme-ui';
import icon1 from '../../public/images/why-choose-1.svg';
import icon2 from '../../public/images/why-choose-2.svg';
import icon3 from '../../public/images/why-choose-3.svg';
import icon4 from '../../public/images/why-choose-4.svg';
import Image from 'next/image'


const image_url = 'images/bg_img/bg_2.jpg';

const WHY_CHOOSE_DATA = {
    blockTitle: {
        title: 'What do we offer',
        text: '',
    },
    posts: [
        {
            icon: icon1,
            title: 'Bleeding edge AI tech',
            text:
                'We use state of the art machine learning algorithm to perform market prediction and curate each alogrithm respective to the stock which we are forecasting.',
        },
        {
            icon: icon2,
            title: 'Blazing fast AI predictions',
            text:
                'We compute the prediction the day before right after the market close with the closing price, so that you dont have to wait for the computation to happen to obtain forecasting results.',
        },
        {
            icon: icon3,
            title: 'High accuracy predictions',
            text:
                'We strive to build machine learning models which can predict with at least 60% percent accuracy in the market direction so that you can predict where the market is heading towards.',
        },
        {
            icon: icon4,
            title: 'Simple User Experience',
            text:
                'We keep our user experience on our platform easy so that our users will not have issues on how to navigate through the web-app to obtain market predictions.',
        },
    ],
};

const WhyChoose = () => {
    const {blockTitle, posts} = WHY_CHOOSE_DATA;
    return (
        <Box as="section" id="services" sx={styles.section} style={styles.bg_image}>
            {/* //@ts-ignore */}
            <Container sx={styles.container}>
                <Box sx={styles.blockTitle}>

                    <Heading as="h2">{blockTitle.title}</Heading>
                    <Text as="p">{blockTitle.text}</Text>
                </Box>
                <Flex sx={styles.row}>
                    {posts.map(({icon, text, title}, index) => (
                        <Box key={`why-choose-post-key-${index}`} sx={styles.post}>
                            <Box sx={styles.imageWrap}>
                                <Image src={icon} alt="icon image"/>
                            </Box>

                            <Heading as="h3">{title}</Heading>
                            <Text as="p">{text}</Text>
                        </Box>

                    ))}
                </Flex>
            </Container>
        </Box>
    );
};

export default WhyChoose;


const styles = {
    section: {
        paddingTop: "2em",
        paddingBottom: "3em",
    },
    bg_image: {
        opacity: "0.6",
        background: "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
    },
    container: {
        position: "relative",

    },
    blockTitle: {
        textAlign: 'center',
        marginBottom: "3em",
        h2: {
            fontSize: ['26px', null, '30px', '36px'],
            lineHeight: [1.35],
            color: 'heading',
            fontWeight: 'body',
        },
        p: {
            fontSize: ['15px', null, '16px'],
            lineHeight: 1.85,
            color: 'white',
        },
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0,
    },
    post: {
        mb: ['32px', null, null, null, 0],
        flex: ['0 0 100%', null, '0 0 50%', null, '0 0 25%'],
        textAlign: 'center',
        h3: {
            fontSize: ['18px', null, null, null, null, '20px'],
            lineHeight: 1.45,
            letterSpacing: '-0.5px',
            fontWeight: '500',
            color: '#02073E',
            mt: ['18px', '20px', null, null, '25px', '30px', null, '40px'],
            mb: ['10px', '15px', null, null, null, '20px'],
        },
        p: {
            maxWidth: '266px',
            mx: 'auto',
            color: '#02073E',
            fontSize: ['14px', '15px'],
            lineHeight: 2,
            px: [null, null, null, null, '5px', 0],
        },
    },
    imageWrap: {
        display: 'flex',
        minHeight: ['auto', '100px'],
        alignItems: 'center',
        justifyContent: 'center',
        img: {
            width: ['80px', null, null, null, 'auto'],
        },
    },
};
