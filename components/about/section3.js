import Image from 'next/image';
import { Box, Container, Flex, Heading, Text } from 'theme-ui';
import graph from '../../public/images/graph-3.jpg';
const SECTION3_DATA = {
  image: graph,
  title: 'Better than a coin flip predictive analytics based on historical  5-years price transactions',
  text:
    'Algotuno proprietary AI technology have studied different market conditions to help our users to make a more informed decision when investing the market.\
    With us, you can once more time the market to buy the low, knowing the market is at its lowest point and sell it at its high when its highest point.',
  
};

const Investment = () => {
  const { image, title, text } = SECTION3_DATA;
 
  return (
    <Box as="section" sx={styles.section}>
      <Container sx={styles.container}>
        <Flex sx={styles.flex}>
          <Box sx={styles.image}>
            <Image
              src={image}
              alt="Investment Chart"
              width={617}
              height={400}
            />
          </Box>
          
          <Box sx={styles.content}>
            <Heading as="h2">{title}</Heading>
            <Text as="p">{text}</Text>
            {/* <Link sx={styles.button} href={button.link}>
              {button.label}
            </Link> */}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Investment;

const styles = {
  section: {
    paddingBottom: "8em",
  },
  container: {
    position: 'relative',
  },
  flex: {
    display: 'flex',
    gap: 0,
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: ['column-reverse', null, null, 'row'],
  },
  image: {
    width: [
      '100%',
      null,
      null,
      'calc(100% - 395px)',
      'calc(100% - 475px)',
      null,
      'calc(100% - 600px)',
    ],
    mt: ['30px'],
    textAlign: ['center', null, null, 'left'],
    img: {
      mx: ['auto', null, null, null, '0'],
      display: 'flex',
    },
  },
  content: {
    textAlign: ['center', null, null, 'left'],
    flex: ['0 0 100%', null, null, null, '0 0 50%'],
    pl: ['0', null, null, '40px', '50px'],
    mx: [null, null, null, 'auto', '0'],
    maxWidth: [null, null, null, '395px', '475px', null, '600px'],
    h2: {
      paddingTop: "1em",
      fontSize: ['24px', '28px', '32px', null, '36px', '40px', '44px', '48px'],
      lineHeight: [1.4, null, null, 1.46],
      color: 'heading',
      letterSpacing: '-1px',
      fontWeight: 'body',
    },
    p: {
      color: 'text',
      fontSize: ['15px', null, '16px'],
      lineHeight: [1.9, null, 2.5],
      maxWidth: '600px',
      mt: ['12px', null, null, null, '20px', null, '25px'],
      mx: ['auto', null, null, null, '0'],
    },
  },
  button: {
    backgroundColor: '#EEF1F4',
    borderRadius: '5px',
    fontSize: ['13px', '14px', '15px'],
    padding: ['14px 20px 13px', '14px 25px 13px', '17px 25px 15px'],
    fontWeight: 700,
    lineHeight: 1,
    display: 'inline-flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    color: 'rgba(2,7,62,.7)',
    transition: 'all 300ms ease',
    '&:hover': {
      backgroundColor: '#161718',
      color: '#ffffff',
    },
  },
};
