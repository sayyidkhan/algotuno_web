import React from 'react';
import { Container, Box, Flex, Heading, Text, Image as Img, ThemeUICSSObject,ThemeUIStyleObject  } from 'theme-ui';
import icon1 from '../images/why-choose-1.svg';
import icon2 from '../images/why-choose-2.svg';
import icon3 from '../images/why-choose-3.svg';
import icon4 from '../images/why-choose-4.svg';
//const makeTheme = <T extends Theme>(t: T) => t

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
        'Lorem ipsum dolor sit amet with consectetur adipisicing elit the help eiusmod tempor.',
    },
    {
      icon: icon2,
      title: 'Blazing fast AI predictions',
      text:
        'Lorem ipsum dolor sit amet with consectetur adipisicing elit the help eiusmod tempor.',
    },
    {
      icon: icon3,
      title: 'High accuracy predictions',
      text:
        'Lorem ipsum dolor sit amet with consectetur adipisicing elit the help eiusmod tempor.',
    },
    {
      icon: icon4,
      title: 'Secure Transaction',
      text:
        'Lorem ipsum dolor sit amet with consectetur adipisicing elit the help eiusmod tempor.',
    },
  ],
};

const WhyChoose = () => {
  const { blockTitle, posts } = WHY_CHOOSE_DATA;
  return (
    <Box as="section" id="services" sx={styles.section}>
      {/* //@ts-ignore */}
      <Container sx={styles.container}>
        <Box sx={styles.blockTitle}>
          <Heading as="h2">{blockTitle.title}</Heading>
          <Text as="p">{blockTitle.text}</Text>
        </Box>
        <Flex sx={styles.row}>
          {posts.map(({ icon, text, title }, index) => (
            <Box key={`why-choose-post-key-${index}`} sx={styles.post}>
              <Box sx={styles.imageWrap}>
                {/* <Img src={icon} alt="icon image" /> */}
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


const styles ={
  section: {
    pb: ['20px', '30px', null, '50px', '85px', null, '105px', '125px', '140px'],
  },
  container: {
    position: "relative",
  },
  blockTitle: {
    textAlign: 'center',
    mb: ['35px', null, null, '55px', null, '60px', '85px', '95px', '110px'],
    h2: {
      fontSize: ['26px', null, '30px', '36px'],
      lineHeight: [1.35],
      color: 'heading',
      mb: [2, null, '13px'],
      fontWeight: 'body',
    },
    p: {
      fontSize: ['15px', null, '16px'],
      lineHeight: 1.85,
      color: 'text_secondary',
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
    minHeight: ['auto', '83px'],
    alignItems: 'center',
    justifyContent: 'center',
    img: {
      width: ['75px', null, null, null, 'auto'],
    },
  },
};
