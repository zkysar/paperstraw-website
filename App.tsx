import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ForVenues from './pages/ForVenues';
import StagePlotsPage from './pages/StagePlots';
import StagePlotPage from './pages/StagePlot';
import Card from './pages/Card';
import Summer from './pages/Summer';
import Whiteboard from './pages/Whiteboard';
import QrCodes from './pages/QrCodes';
import ScrollToTop from './components/ScrollToTop';
import PostHogPageviews from './components/PostHogPageviews';
import Layout from './components/Layout';
import { AudioProvider } from './context/AudioContext';

const App: React.FC = () => {
    return (
        <AudioProvider>
            <HashRouter>
                <PostHogPageviews />
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
                    <Route path="/card" element={<Card />} />
                    <Route path="/summer" element={<Summer />} />
                    <Route path="/wb" element={<Whiteboard />} />
                    <Route path="/qr-codes" element={<QrCodes />} />
                </Routes>
            </HashRouter>
        </AudioProvider>
    );
};

export default App;