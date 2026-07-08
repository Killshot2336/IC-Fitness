import { useState, useEffect, useCallback } from 'react';
import { TierProvider } from './context/TierContext';
import DevTierSidebar from './components/DevTierSidebar';
import ClassSchedule from './components/ClassSchedule';
import CheckoutModal from './components/CheckoutModal';
import MemberPortal from './components/MemberPortal';
import { createPortal } from 'react-dom';

function TierDemoApp() {
  const [checkout, setCheckout] = useState({ open: false, plan: '', price: '' });
  const [portalOpen, setPortalOpen] = useState(false);

  const openCheckout = useCallback((plan, price) => {
    setCheckout({ open: true, plan, price });
  }, []);

  const closeCheckout = useCallback(() => {
    setCheckout({ open: false, plan: '', price: '' });
  }, []);

  const openPortal = useCallback(() => setPortalOpen(true), []);
  const closePortal = useCallback(() => setPortalOpen(false), []);

  useEffect(() => {
    window.ICFitnessDemo = { openCheckout, openPortal };
    return () => {
      delete window.ICFitnessDemo;
    };
  }, [openCheckout, openPortal]);

  useEffect(() => {
    const onJoinClick = (e) => {
      const btn = e.target.closest('.join-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      openCheckout(btn.dataset.plan || 'Membership', btn.dataset.price || '0');
    };

    const onShopClick = (e) => {
      const btn = e.target.closest('.shop-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      openCheckout(btn.dataset.item || 'Item', btn.dataset.price || '0');
    };

    document.addEventListener('click', onJoinClick);
    document.addEventListener('click', onShopClick);
    return () => {
      document.removeEventListener('click', onJoinClick);
      document.removeEventListener('click', onShopClick);
    };
  }, [openCheckout]);

  useEffect(() => {
    const loginBtn = document.getElementById('loginBtn');
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    const footerTracker = document.getElementById('footerTracker');

    const handleLogin = (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById('mobileMenu')?.classList.remove('active');
      document.getElementById('mobileOverlay')?.classList.remove('active');
      openPortal();
    };

    loginBtn?.addEventListener('click', handleLogin);
    mobileLoginBtn?.addEventListener('click', handleLogin);
    footerTracker?.addEventListener('click', handleLogin);

    return () => {
      loginBtn?.removeEventListener('click', handleLogin);
      mobileLoginBtn?.removeEventListener('click', handleLogin);
      footerTracker?.removeEventListener('click', handleLogin);
    };
  }, [openPortal]);

  const scheduleMount = document.getElementById('react-schedule-root');
  const sidebarMount = document.getElementById('react-sidebar-root');

  return (
    <>
      {sidebarMount && createPortal(<DevTierSidebar />, sidebarMount)}
      {scheduleMount && createPortal(<ClassSchedule />, scheduleMount)}
      <CheckoutModal
        isOpen={checkout.open}
        plan={checkout.plan}
        price={checkout.price}
        onClose={closeCheckout}
      />
      <MemberPortal isOpen={portalOpen} onClose={closePortal} />
    </>
  );
}

export default function App() {
  return (
    <TierProvider>
      <TierDemoApp />
    </TierProvider>
  );
}
