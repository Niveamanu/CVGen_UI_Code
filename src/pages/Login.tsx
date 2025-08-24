import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import styles from "./Login.module.scss";

import login from "../assets/logo.svg?url";

import mslogo from "../assets/ms.svg?url";

import { useMsalAuth } from '../hooks/useMsal';

import { 

  pageTransitions, 

  staggerItem, 

  buttonHover, 

  slideDownCard,

  cardStagger,

  enhancedStaggerItem

} from "../utils/animations";

import api from "@/api";

import { useDispatch } from "react-redux";

import { loggedInAction } from "@/store/reducers/authUser";
 
// TODO: Move to Auth Page

export default function Login() {

  const navigate = useNavigate();

  const [microsoftError, setMicrosoftError] = useState<string | null>(null);

  const dispatch = useDispatch();

  // Use the new MSAL hook

  const { login: msalLogin, isAuthenticated, isLoading: msalLoading } = useMsalAuth();
 
  // Check if user is already authenticated on component mount

  useEffect(() => {

    if (isAuthenticated) {

      // User is already authenticated, redirect to dashboard

      console.log('User already authenticated');
      navigate('/dashboard');

    }

  }, [isAuthenticated, navigate]);
 
  const handleMicrosoftLogin = async () => {

    setMicrosoftError(null);

    try {

      await msalLogin();

      // If login is successful, the user will be redirected or the state will update

      // The useEffect above will handle the redirect to dashboard

    } catch (error) {

      console.error("Microsoft login failed:", error);

      setMicrosoftError("Microsoft login failed. Please try again.");

    }

  };
 
  return (
<motion.div 

      className={styles.loginPage}

      initial={pageTransitions.initial}

      animate={pageTransitions.animate}

      exit={pageTransitions.exit}

      transition={pageTransitions.transition}
>
<motion.div 

        className={styles.loginContainer}

        initial={slideDownCard.initial}

        animate={slideDownCard.animate}
>
<motion.div

          variants={cardStagger}

          initial="initial"

          animate="animate"

          className="w-100 d-flex flex-column justify-content-center align-items-center"
>
<motion.img 

            src={login} 

            alt="Flourish Research" 

            className={styles.logo}

          />
<motion.div 

            className={styles.loginTitle}
>

            Login
</motion.div>
<motion.div 

            className={styles.loginSubtitle}
>

            Welcome back! Please sign in with your Microsoft account
</motion.div>

          {microsoftError && (
<div className="alert alert-danger w-100 mb-3">

              {microsoftError}
</div>

          )}
<motion.button 

            className={styles.microsoftBtn} 

            type="button" 

            onClick={handleMicrosoftLogin}

            disabled={msalLoading}

            {...buttonHover}
>

            {msalLoading ? (
<>
<div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>

                Signing in...
</>

            ) : (
<>
<img src={mslogo} alt="Microsoft" height={20} />

                Sign in with Microsoft
</>

            )}
</motion.button>
</motion.div>
</motion.div>
<motion.div 

        className={styles.rightPanel + " d-none d-md-flex flex-column justify-content-center align-items-center"} 

        style={{ color: '#fff', textAlign: 'center', paddingLeft: '2rem'}}

        initial={{ opacity: 0, x: 50 }}

        animate={{ opacity: 1, x: 0 }}

        transition={{ duration: 0.6, delay: 0.3 }}
>
<motion.h2 

          style={{fontWeight: 700, fontSize: '2rem', marginBottom: '1rem'}}

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.5, delay: 0.5 }}
>

          Create your professional CV
</motion.h2>
<motion.p 

          style={{fontSize: '1.2rem', maxWidth: 400}}

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.5, delay: 0.7 }}
>

          Professional branded CV tailored to showcase the doctor's strengths and career goals
</motion.p>
</motion.div>
</motion.div>

  );

}

 