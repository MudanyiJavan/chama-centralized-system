
import Header from "./Header";
import Maincontent from "./body";
import Footer from "./Footer";

export default function Landing_Page(){
    return(
      <body  className="bg-blue-500">        
        <Header/>
        <Maincontent/>
        <Footer/>       
      </body>
       
    )
}