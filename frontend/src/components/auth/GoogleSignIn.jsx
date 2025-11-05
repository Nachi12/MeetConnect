// import { useState } from 'react';
// import { signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '@/config/firebase';
// import { Button } from '@/components/ui/button';
// import { FaGoogle } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '@/store/slices/authSlice';

// const GoogleSignIn = () => {
//   const [loading, setLoading] = useState(false); // Tracks sign-in process state
//   const navigate = useNavigate(); // Navigation hook
//   const dispatch = useDispatch(); // Redux dispatcher

//   // Handle Google Sign-In process
//   const handleGoogleSignIn = async () => {
//     setLoading(true);
//     try {
//       // Trigger Google authentication popup
//       const result = await signInWithPopup(auth, googleProvider);
//       const user = result.user;
//       const idToken = await user.getIdToken();

//       // Send user info and token to backend for verification
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: user.email,
//           name: user.displayName,
//           googleId: user.uid,
//           profilePicture: user.photoURL,
//           idToken
//         })
//       });

//       // If backend returns success, update Redux and navigate
//       if (response.ok) {
//         const data = await response.json();
//         dispatch(setCredentials({ user: data.user, token: data.token }));
//         toast.success('Successfully signed in with Google!');
//         navigate('/dashboard');
//       } else {
//         throw new Error('Failed to authenticate with backend');
//       }
//     } catch (error) {
//       // Display error message on failure
//       toast.error(error.message || 'Failed to sign in with Google');
//     } finally {
//       setLoading(false); // Reset loading state
//     }
//   };

//   // Render Google sign-in button
//   return (
//     <Button
//       type="button"
//       variant="outline"
//       onClick={handleGoogleSignIn}
//       disabled={loading}
//       className="w-full flex items-center justify-center gap-2 hover:bg-gray-500"
//     >
//       <FaGoogle className="h-4 w-4" />
//       {loading ? 'Signing in...' : 'Continue with Google'}
//     </Button>
//   );
// };

// export default GoogleSignIn;




import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/config/firebase';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';

const GoogleSignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // signInWithRedirect(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      
      // Send to backend to create/update user
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
          googleId: user.uid,
          profilePicture: user.photoURL,
           idToken
        })
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setCredentials({ user: data.user, token: data.token }));
        toast.success('Successfully signed in with Google!');
        navigate('/dashboard');
      } else {
        throw new Error('Failed to authenticate with backend');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 hover:bg-gray-500"
    >
      <FaGoogle className="h-4 w-4" />
      {loading ? 'Signing in...' : 'Continue with Google'}
    </Button>
  );
};

export default GoogleSignIn;