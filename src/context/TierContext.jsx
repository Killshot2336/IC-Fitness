import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  getDefaultModules,
  calculateInvestment,
  PLATFORM_MODULES,
} from '../platformConfig';

const PlatformContext = createContext(null);

export function TierProvider({ children }) {
  const [modules, setModules] = useState(getDefaultModules);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberName, setMemberName] = useState('');

  const isModuleEnabled = useCallback(
    (moduleId) => Boolean(modules[moduleId]),
    [modules]
  );

  /** @deprecated use isModuleEnabled — kept for FeatureGate compatibility */
  const isFeatureUnlocked = isModuleEnabled;

  const toggleModule = useCallback((moduleId) => {
    if (PLATFORM_MODULES[moduleId]?.required) return;
    setModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  }, []);

  const investment = useMemo(() => calculateInvestment(modules), [modules]);

  const login = useCallback((name) => {
    setMemberName(name || 'Member');
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setMemberName('');
  }, []);

  return (
    <PlatformContext.Provider
      value={{
        modules,
        setModules,
        toggleModule,
        isModuleEnabled,
        isFeatureUnlocked,
        investment,
        isLoggedIn,
        memberName,
        login,
        logout,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function useTier() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('useTier must be used within TierProvider');
  return ctx;
}
