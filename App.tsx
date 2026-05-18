import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ForVenues from './pages/ForVenues';
import StagePlotsPage from './pages/StagePlots';
import StagePlotPage from './pages/StagePlot';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import { AudioProvider } from './context/AudioContext';

const App: React.FC = () => {
    return (
        <AudioProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={
                        <Layout variant="home">
                            <Home />
                        </Layout>
                    } />
                    <Route path="/for-venues" element={
                        <Layout variant="for-venues">
                            <ForVenues />
                        </Layout>
                    } />
                    <Route path="/stage-plots" element={
                        <>
                            <ScrollToTop />
                            <StagePlotsPage />
                        </>
                    } />
                    <Route path="/stage-plots/:slug" element={
                        <>
                            <ScrollToTop />
                            <StagePlotPage />
                        </>
                    } />
                </Routes>
            </HashRouter>
        </AudioProvider>
    );
};

export default App;