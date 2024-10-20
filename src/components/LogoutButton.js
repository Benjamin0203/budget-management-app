//src/components/LogoutButton.js
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('User logged out successfully.');
      // Optionally, redirect the user here.
    } catch (error) {
      console.error('Error logging out:', error);
      setIsLoggingOut(false);
    }
  };


  return (
    <button onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Logging Out...' : 'Log Out'}
    </button>
  );
}

