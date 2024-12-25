import { useEffect } from 'react';

const useKeyboardNav = () => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          // Scroll to next section
          window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
          });
          break;
        case 'ArrowUp':
          // Scroll to previous section
          window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
          });
          break;
        case 'Home':
          // Scroll to top
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          break;
        case 'End':
          // Scroll to bottom
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          });
          break;
        case 'Escape':
          // Close modals or menus if open
          document.dispatchEvent(new CustomEvent('closeModals'));
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return null;
};

export default useKeyboardNav;