import ChartPanel from "./components/ChartPanel";
import PredictionPanel from "./components/PredictionPanel";

import "./styles/home.css";

function HomePage() {
    return (
        <div className="home-layout">

            <main className="home-main">

                <ChartPanel />

                <PredictionPanel />

            </main>

            <footer className="home-footer">

                <span>
                    Open Quant
                </span>

                <span>
                    Market Intelligence Platform
                </span>

            </footer>

        </div>
    );
}

export default HomePage;