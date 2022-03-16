import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as firebaseAuth from "firebase/auth";
import type { User } from "firebase/auth";
import invariant from "../utils";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
//TODO: use analytics
const analytics = getAnalytics(app);

const AuthContext = createContext<{
  user?: User;
  signin(email: string, password: string): Promise<User>;
  signup(email: string, password: string): Promise<User>;
  signout(): void;
  sendPasswordResetEmail(email: string): Promise<void>;
  confirmPasswordReset(code: string, newPassword: string): Promise<void>;
} | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const auth = useContext(AuthContext);
  invariant(auth, "useAuth must be used within an AuthProvider");
  return auth;
};

function useProvideAuth() {
  const [user, setUser] = useState<User>();

  const signin = (email: string, password: string) => {
    return firebaseAuth
      .signInWithEmailAndPassword(firebaseAuth.getAuth(), email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email: string, password: string) => {
    return firebaseAuth
      .createUserWithEmailAndPassword(firebaseAuth.getAuth(), email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebaseAuth.signOut(firebaseAuth.getAuth()).then(() => {
      setUser(undefined);
    });
  };

  const sendPasswordResetEmail = (email: string) => {
    return firebaseAuth.sendPasswordResetEmail(firebaseAuth.getAuth(), email);
  };

  const confirmPasswordReset = (code: string, password: string) => {
    return firebaseAuth.confirmPasswordReset(
      firebaseAuth.getAuth(),
      code,
      password
    );
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      firebaseAuth.getAuth(),
      (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(undefined);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
