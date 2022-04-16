import Header from './header';
import Footer from './footer';
// import 'bootstrap/dist/css/bootstrap.min.css';


export default function Layout ({children}) {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </>
  )
}