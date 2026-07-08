import { createContext, useContext, useState, useCallback } from 'react';
import { tierMeetsRequirement } from '../tierConfig';

const TierContext = createContext(null);

export function TierProvider({ children }) {
  const [selectedTier, setSelectedTier] = useState('basic');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberName, setMemberName] = useState('');

  const isFeatureUnlocked = useCallback(
    (featureKey) => tierMeetsRequirement(selectedTier, featureKey),
    [selectedTier]
  );

  const login = useCallback((name) => {
    setMemberName(name || 'Member');
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setMemberName('');
  }, []);

  return (
    <TierContext.Provider
      value={{
        selectedTier,
        setSelectedTier,
        isFeatureUnlocked,
        isLoggedIn,
        memberName,
        login,
        logout,
      }}
    >
      {children}
    </TierContext.Provider>
  );
}

export function useTier() {
  const ctx = useContext(TierContext);
  if (!ctx) throw new Error('useTier must be used within TierProvider');
  return ctx;
}
