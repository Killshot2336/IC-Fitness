import { useState, useEffect, useCallback } from 'react';
import { TierProvider } from './context/TierContext';
import VoidlineConfigSidebar from './components/VoidlineConfigSidebar';
import ClassSchedule from './components/ClassSchedule';
import CheckoutModal from './components/CheckoutModal';
import MemberPortal from './components/MemberPortal';
import { createPortal } from 'react-dom';

function TierDemoApp() {
  const [checkout, setCheckout] = useState({
    open: false,
    plan: '',
    price: '',
    recurring: true,
    module: 'baseSite',
  });
  const [portalOpen, setPortalOpen] = useState(false);

  const openCheckout = useCallback((plan, price, recurring = true, module = 'baseSite') => {
    setCheckout({ open: true, plan, price, recurring, module });
  }, []);

  const closeCheckout = useCallback(() => {
    setCheckout({ open: false, plan: '', price: '', recurring: true, module: 'baseSite' });
  }, []);

  const openPortal = useCallback(() => setPortalOpen(true), []);
  const closePortal = useCallback(() => setPortalOpen(false), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== 'Escape') return;
      if (checkout.open) closeCheckout();
      if (portalOpen) closePortal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [checkout.open, portalOpen, closeCheckout, closePortal]);

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
      openCheckout(btn.dataset.plan || 'Membership', btn.dataset.price || '0', true, 'baseSite');
    };

    const onShopClick = (e) => {
      const btn = e.target.closest('.shop-btn');
      if (!btn) return;
      e.preventDefault();
      e.stopPropagation();
      openCheckout(btn.dataset.item || 'Item', btn.dataset.price || '0', false, 'ecommerce');
    };

    document.addEventListener('click', onJoinClick);
    document.addEventListener('click', onShopClick);

    const onClassReserveClick = (e) => {
      const btn = e.target.closest('.class-card .reserve-btn');
      if (!btn) return;
      e.preventDefault();
      document.getElementById('react-schedule-mount')?.scrollIntoView({ behavior: 'smooth' });
    };

    document.addEventListener('click', onClassReserveClick);
    return () => {
      document.removeEventListener('click', onJoinClick);
      document.removeEventListener('click', onShopClick);
      document.removeEventListener('click', onClassReserveClick);
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
      {sidebarMount && createPortal(<VoidlineConfigSidebar />, sidebarMount)}
      {scheduleMount && createPortal(<ClassSchedule />, scheduleMount)}
      <CheckoutModal
        isOpen={checkout.open}
        plan={checkout.plan}
        price={checkout.price}
        recurring={checkout.recurring}
        requiredModule={checkout.module}
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
