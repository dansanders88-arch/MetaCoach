import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients';
import { ClientDetails } from './pages/ClientDetails';
import { ProgramBuilder } from './pages/ProgramBuilder';
import { VODReview } from './pages/VODReview';
import { Settings } from './pages/Settings';
import { TaskSubmission } from './pages/TaskSubmission';
import { BrandSettings } from './types';

// Context for White-Labeling
interface BrandContextType {
  brand: BrandSettings;
  setBrand: (settings: BrandSettings) => void;
}

const defaultBrand: BrandSettings = {
  orgName: 'Team Liquid Coaching',
  primaryColor: '#6366f1', // Indigo 500
  logoUrl: '',
};

const BrandContext = createContext<BrandContextType>({
  brand: defaultBrand,
  setBrand: () => {},
});

export const useBrand = () => useContext(BrandContext);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [brand, setBrand] = useState<BrandSettings>(defaultBrand);
  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/clients/:clientId" element={<ClientDetails />} />
            <Route path="/training" element={<ProgramBuilder />} />
            <Route path="/submission" element={<TaskSubmission />} />
            <Route path="/vods" element={<VODReview />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;