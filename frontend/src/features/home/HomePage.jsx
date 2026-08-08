import Navbar from "./components/Navbar";
import ChartPanel from "./components/ChartPanel";
import PredictionPanel from "./components/PredictionPanel";
import Footer from "./components/Footer";

import "./styles/home.css";


function HomePage() {
    return (
        <div className="home-layout">

            <Navbar />

            <main className="home-main">

                <ChartPanel />

                <PredictionPanel />

            </main>

            <Footer />

        </div>
    );
}


export default HomePage;