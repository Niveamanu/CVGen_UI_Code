import React from "react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`cv-footer ${className}`} style={{
      background: 'rgba(255, 234, 136, 0.8)',
      color: '#1a1a1a',
      padding: '1rem 0',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      textAlign: 'center',
      borderTop: '2px solid #e5e7eb',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          {/* <div style={{ textAlign: 'left' }}>
            <h3 style={{ 
              margin: '0 0 0.25rem 0', 
              fontSize: '1rem', 
              fontWeight: '700',
              color: '#1a1a1a'
            }}>
              Flourish Research
            </h3>
            <p style={{ 
              margin: '0', 
              fontSize: '0.8rem', 
              color: '#374151',
              maxWidth: '300px'
            }}>
              Professional CV generation platform for healthcare professionals
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.25rem'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Trusted by Healthcare Professionals</span>
            </div>
            <p style={{ margin: '0', fontSize: '0.75rem', color: '#6b7280' }}>
              Secure • Reliable • Professional
            </p>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <p style={{ 
              margin: '0 0 0.25rem 0', 
              fontSize: '0.85rem', 
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              Contact Support
            </p>
            <p style={{ margin: '0', fontSize: '0.75rem', color: '#6b7280' }}>
              support@flourishresearch.com
            </p>
          </div> */}
        </div>
        
        {/* <div style={{ 
          marginTop: '1rem', 
          paddingTop: '0.75rem', 
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}> */}
          <p style={{ 
            margin: '0', 
            fontSize: '0.85rem', 
            color: '#6b7280'
          }}>
            &copy; {new Date().getFullYear()} Flourish Research. All rights reserved.
          </p>
        {/* </div> */}
      </div>
    </footer>
  );
};

export default Footer;
