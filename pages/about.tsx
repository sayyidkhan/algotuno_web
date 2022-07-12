import Link from 'next/link'

import { ThemeProvider } from 'theme-ui';
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Banner from '../components/about/section1'
import WhyChoose from '../components/about/section2'
import Investment from '../components/about/section3';
import ContactSupport from '../components/about/section4';
import theme from '../styles/theme';

const AboutPage = () => (
  
  //@ts-ignore
  <ThemeProvider theme={theme}>
  <Layout>
    <Head>
      <title>About Us</title>
    </Head>
    <Banner />
    <WhyChoose/>
    <Investment/>
    <ContactSupport/>
  </Layout>
  </ThemeProvider>
)

export default AboutPage
