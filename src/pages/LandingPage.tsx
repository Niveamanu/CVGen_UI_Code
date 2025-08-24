import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.scss";

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className={styles.logo}>
                <img src="/assets/logo.svg" alt="Flourish Research" />
                <span>FLOURISH RESEARCH</span>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <Link to="/login" className={`btn ${styles.loginBtn}`}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <h1 className={styles.heroTitle}>
                Create your <span className={styles.highlight}>professional CV</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Professional branded CV tailored to showcase the doctor's strengths and career goals
              </p>
              <div className={styles.heroButtons}>
                <Link to="/login" className={`btn btn-primary ${styles.ctaBtn}`}>
                  Get Started
                </Link>
                <Link to="/dashboard" className={`btn btn-outline-primary ${styles.secondaryBtn}`}>
                  View Dashboard
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.heroImage}>
                <img src="/assets/hero-doctor.png" alt="Professional Doctor" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className={styles.sectionTitle}>Why Choose Flourish Research?</h2>
              <p className={styles.sectionSubtitle}>
                Professional CV generation with advanced features
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-file-medical"></i>
                </div>
                <h3>Medical CV Templates</h3>
                <p>Specialized templates designed for healthcare professionals</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-certificate"></i>
                </div>
                <h3>Certification Tracking</h3>
                <p>Keep track of all your certifications and training programs</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <i className="fas fa-download"></i>
                </div>
                <h3>Export Options</h3>
                <p>Download your CV in multiple formats instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <p>&copy; 2025 Flourish Research. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
