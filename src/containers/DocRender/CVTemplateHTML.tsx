import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './CVTemplateHTML.css';

interface PersonalInfo {
  "First Name": string;
  "Middle Name": string;
  "Last Name": string;
  "Degree Title": string;
  "Certifications": string;
  "Business Number": string;
  "Business Email Address": string;
}

interface SiteAffiliation {
  "Site Name"?: string;
  "CTMS Site Name"?: string;
  "Site Address"?: string;
  "City"?: string;
  "State"?: string;
  "Zipcode"?: string;
  "Country"?: string;
  "Description of Affiliation"?: string;
}

interface Education {
  "degree"?: string;
  "universityName"?: string;
  "startYear"?: string;
  "endYear"?: string;
  "country"?: string;
  "city"?: string;
  "state"?: string;
}

interface Experience {
  "Job Title"?: string;
  "Organization/Hospital Name"?: string;
  "City"?: string;
  "State"?: string;
  "Start Date"?: string;
  "End Date"?: string;
  "Country"?: string;
}

interface Publication {
  "Publications / Presentations"?: string;
  "Authors"?: string;
  "Journal / Source"?: string;
  "Publication Date"?: string;
  "Volume / Issue / Pages"?: string;
  "DOI / Link"?: string;
  "Description / Summary"?: string;
}

interface ProfessionalMembership {
  "Organization Name"?: string;
  "Membership Type"?: string;
  "Start Date"?: string;
  "End Date"?: string;
  "Status"?: string;
}
interface License {
  "licenseName"?: string;
  "issuingAuthority"?: string;
  "issueDate"?: string;
  "expiryDate"?: string;
  "licenseNumber"?: string;
  
}

interface Certification {

  "certificationTitle"?: string;
  "issuingOrganization"?: string;
  "issueDate"?: string;
  "expiryDate"?: string;
  "certificationId"?: string;
}
interface ClinicalResearchTrials {
  "Trial Title"?: string;
  "Trial ID / Registration Number"?: string;
  "Role / Position"?: string;
  "Start Date"?: string;
  "End Date"?: string;
  "Brief Description / Outcome"?: string;
}

interface ResearchAffiliations {
  "institutionName"?: string;
  "position"?: string;
  "start"?: string;
   
}
interface AchievementsOrAwards {
  "Awarded / Achieved Year"?: string;
  "Award / Achievement Name"?: string;
  "Awarding Organization/Institution"?: string;
  "Description / Details"?: string;
}

interface CVData {
  "Personal Information": PersonalInfo;
  "Flourish Site Affiliations": SiteAffiliation[];
  "Hospital Affiliations": any[];
  "Research Affiliations": ResearchAffiliations[];
  "Education": Education[];
  "Licenses & Certifications": {
    licenses: License[];
    certifications: Certification[];
  };
  "Certifications": Certification[];
  "Professional Experience": Experience[];
  "Publications": Publication[];
  "Clinical Research Trials Conducted": ClinicalResearchTrials[];
  "Psychometric Rating/Scales Experiences": any[];
  "Achievements or Awards": AchievementsOrAwards[];
  "Training": any[];
  "Languages": any[];
  "Professional Active Memberships": ProfessionalMembership[];
}

interface CVTemplateHTMLProps {
  data: Partial<CVData>;
}

const CVTemplateHTML: React.FC<CVTemplateHTMLProps> = ({ data }) => {
  const navigate = useNavigate();
  const personalInfo = data["Personal Information"];

  // Function to handle section navigation
  const handleSectionClick = (sectionTitle: string) => {
    // Map CV section titles to CVBuilder step titles
    const sectionMapping: { [key: string]: string } = {
      'FLOURISH SITE AFFILIATIONS': 'Flourish Site Affiliations',
      'EDUCATION': 'Education',
      'LICENSE(S)': 'Licenses & Certifications',
      'CERTIFICATION(S)': 'Licenses & Certifications',
      'PROFESSIONAL EXPERIENCE': 'Professional Experience',
      'PROFESSIONAL ACTIVE MEMBERSHIPS': 'Professional Active Memberships',
      'ACHIEVEMENT(S) AND/OR AWARD(S)': 'Achievements or Awards',
      'HOSPITAL AFFILIATIONS': 'Hospital Affiliations',
      'RESEARCH AFFILIATIONS': 'Research Affiliations',
      'TRAINING': 'Training',
      'ADDITIONAL SKILLS': 'Personal Information', // Languages are in Personal Information
      'PUBLICATIONS/PRESENTATIONS': 'Publications',
      'CLINICAL RESEARCH TRIALS CONDUCTED:': 'Clinical Research Trials Conducted',
      'PSYCHOMETRIC RATING/SCALES EXPERIENCES': 'Psychometric Rating/Scales Experiences'
    };

    const stepTitle = sectionMapping[sectionTitle] || sectionTitle;
    // Normalize the section title for URL parameter
    const normalizedSection = stepTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
    navigate(`/cv-builder?section=${normalizedSection}`);
  };

  const renderSiteAffiliations = () => {
    return data?.["Flourish Site Affiliations"]
      ?.map((affiliation, index) => (
        <div key={index} className="affiliation-item">
          <div className="affiliation-text">
            {affiliation["CTMS Site Name"] && `${affiliation["CTMS Site Name"]} `}
            {affiliation["Site Name"]}, {affiliation["Site Address"]}, {affiliation["City"]}, {affiliation["State"]} {affiliation["Zipcode"]}
          </div>
        </div>
      )) || [];
  };

  const renderEducation = () => {
    return data?.["Education"]
      ?.map((education, index) => (
        <div key={index} className="list-item">
          <div className="date-column">
            <span>{education["startYear"] || ''}-{education["endYear"] || ''}</span>
          </div>
          <div className="content-column">
            <span>
              {[education["degree"], education["universityName"], education["city"], education["state"], education["country"]]
                .filter(Boolean).join(", ")}
            </span>
          </div>
        </div>
      )) || [];
  };

  const renderProfessionalExperience = () => {
    const experiences = data?.["Professional Experience"];
    if (!experiences || !Array.isArray(experiences)) return [];
    
    return experiences.map((experience, index) => (
      <div key={index} className="list-item">
        <div className="date-column">
          <span>{experience["Start Date"] || ''}-{experience["End Date"] || ''}</span>
        </div>
        <div className="content-column">
          <span>
            {[experience["Job Title"], experience["Organization/Hospital Name"], experience["City"], experience["State"], experience["Country"]]
              .filter(Boolean).join(", ")}
          </span>
        </div>
      </div>
    ));
  };

  const renderPublications = () => {
    const publications = data["Publications"];
    
    // Check if publications exists and is an array
    if (!publications || !Array.isArray(publications)) {
      return [];
    }
    
    return publications
      .filter(pub => pub && pub["Publications / Presentations"]?.trim())
      .map((publication, index) => (
        <div key={index} className="publication-item">
          <span className="publication-number">{index + 1}.</span>
          <span className="publication-text">
            {publication["Publications / Presentations"]}
          </span>
        </div>
      ));
  };

  const renderClinicalTrials = () => {
    const trials = data["Clinical Research Trials Conducted"];
    if (!trials || !Array.isArray(trials)) return [];

    return trials
      .filter(trial => trial["Trial Title"]?.trim()) // Only show trials with titles
      .map((trial, index) => (
        <div key={index} className="trial-item">
          <div className="trial-header">
            <span className="trial-number">{index + 1}.</span>
            <span className="trial-title">{trial["Trial Title"]}</span>
          </div>
          
        </div>
      ));
  };

  const renderLicenses = () => {
    const licensesData = data["Licenses & Certifications"]?.licenses;
    if (!licensesData || !Array.isArray(licensesData)) return [];
    
    return licensesData
      .filter(license => license["licenseName"] || license["licenseNumber"])
      .map((license, index) => (
        <div key={index} className="list-item">
          <div className="date-column">
            <span>{license["issueDate"] || ''}-{license["expiryDate"] || ''}</span>
          </div>
          <div className="content-column">
            <span>
              {[license["licenseName"], license["licenseNumber"]]
                .filter(Boolean).join(", ")}
              {license["issuingAuthority"] && `, ${license["issuingAuthority"]}`}
            </span>
          </div>
        </div>
      ));
  };

  const renderCertifications = () => {
    const certificationsData = data["Licenses & Certifications"]?.certifications;
    if (!certificationsData || !Array.isArray(certificationsData)) return [];
    
    return certificationsData.map((certification, index) => (
      <div key={index} className="list-item">
        <div className="date-column">
          <span>{certification["issueDate"] || ''}</span>
        </div>
        <div className="content-column">
          <span>
            {[certification["certificationTitle"], certification["issuingOrganization"]]
              .filter(Boolean).join(", ")}
            {certification["certificationId"] && `, ID: ${certification["certificationId"]}`}
          </span>
        </div>
      </div>
    ));
  };

  const renderAwards = () => {
    return data?.["Achievements or Awards"]
      ?.map((award, index) => (
        <div key={index} className="list-item">
          <div className="date-column">
            <span>{award["Awarded / Achieved Year"] || ''}</span>
          </div>
          <div className="content-column">
            <span>{award["Award / Achievement Name"] || award["Awarding Organization/Institution"]}</span>
          </div>
        </div>
      )) || [];
  };

  const renderResearchAffiliations = () => {
    return data?.["Research Affiliations"]
      ?.map((affiliation, index) => (
        <div key={index} className="list-item">
          <div className="date-column">
            <span>{affiliation["start"] || ''}  </span>
          </div>
          <div className="content-column">
            <span>{[affiliation["position"], affiliation["institutionName"]].filter(Boolean).join(", ")}</span>
          </div>
        </div>
      )) || [];
  };

  const renderTraining = () => {
    return data?.["Training"]
      ?.map((training, index) => (
        <div key={index} className="list-item">
          <div className="date-column">
            <span>{training["Duration / Dates"] || ''}</span>
          </div>
          <div className="content-column">
            <span>{training["Training Program / Course Name"] || training["Institution / Provider"]}</span>
          </div>
        </div>
      )) || [];
  };

  const renderHospitalAffiliations = () => {
    return data?.["Hospital Affiliations"]
      ?.map((affiliation, index) => (
        <div key={index} className="affiliation-item">
          <div className="affiliation-text">
            {affiliation["Hospital Name"]}, {affiliation["From Date"]} - {affiliation["To Date"]}, {affiliation["city"]}, {affiliation["state"]},{affiliation["country"]}
          </div>
        </div>
      )) || [];
  };

  return (
    <div className="cv-template-html">
      <div className="cv-page">
        {/* Header */}
        <div className="cv-header">
          <img src={logo} alt="Logo" className="cv-logo" />
        </div>

        {/* CV Title */}
        <div className="cv-title">Curriculum Vitae</div>
        console.log("hiiii",{personalInfo?.["Degree Title"]})

        {/* Name and Credentials */}
        <div className="cv-name">
          {personalInfo?.["First Name"]} {personalInfo?.["Middle Name"]} {personalInfo?.["Last Name"]}, {personalInfo?.["Degree Title"]}
        </div>

        {/* Divider */}
        <div className="cv-divider">
          <div className="divider-circle"></div>
          <div className="divider-line"></div>
          <div className="divider-circle"></div>
        </div>

        {/* Contact Information */}
        <div className="contact-info-container">
          <div className="contact-details-row">
            <span className="contact-detail">
              Tel: {personalInfo?.["Business Number"]}
            </span>
            <span className="contact-detail">
              E-Mail: {personalInfo?.["Business Email Address"]}
            </span>
          </div>
        </div>

        {/* Flourish Site Affiliations */}
        <div className="section-title" onClick={() => handleSectionClick('Flourish Site Affiliations')}>
          FLOURISH SITE AFFILIATIONS
        </div>
        <div className="section-content">
          {renderSiteAffiliations()}
        </div>

        {/* Education */}
        <div className="section-title" onClick={() => handleSectionClick('EDUCATION')}>
          EDUCATION
        </div>
        <div className="section-content">
          {renderEducation()}
        </div>

        {/* Licenses */}
        <div className="section-title" onClick={() => handleSectionClick('LICENSE(S)')}>
          LICENSE(S)
        </div>
        <div className="section-content">
          {renderLicenses()}
        </div>

        {/* Certifications */}
        <div className="section-title" onClick={() => handleSectionClick('CERTIFICATION(S)')}>
          CERTIFICATION(S)
        </div>
        <div className="section-content">
          {renderCertifications()}
        </div>

        {/* Professional Experience */}
        <div className="section-title" onClick={() => handleSectionClick('PROFESSIONAL EXPERIENCE')}>
          PROFESSIONAL EXPERIENCE
        </div>
        <div className="section-content">
          {renderProfessionalExperience()}
        </div>

        {/* Professional Memberships */}
        <div className="section-title" onClick={() => handleSectionClick('PROFESSIONAL ACTIVE MEMBERSHIPS')}>
          PROFESSIONAL ACTIVE MEMBERSHIPS
        </div>
        <div className="section-content">
          {(() => {
            const memberships = data["Professional Active Memberships"];
            if (!memberships) {
              return <div className="membership-text">No memberships listed</div>;
            }
            
            if (Array.isArray(memberships)) {
              return memberships.map((membership, index) => (
                <div key={index} className="list-item">
                  <div className="date-column">
                    <span>{membership["Start Date"] || ''} - {membership["End Date"] || ''}</span>
                  </div>
                  <div className="content-column">
                    <span>
                      {[
                        membership["Organization Name"],
                        membership["Membership Type"] ? `(${membership["Membership Type"]})` : '',
                        membership["Status"] ? `- ${membership["Status"]}` : ''
                      ].filter(Boolean).join(' ')}
                    </span>
                  </div>
                </div>
              ));
            } else {
              return <div className="membership-text">{String(memberships)}</div>;
            }
          })()}
        </div>

        {/* Awards */}
        <div className="section-title" onClick={() => handleSectionClick('ACHIEVEMENT(S) AND/OR AWARD(S)')}>
          ACHIEVEMENT(S) AND/OR AWARD(S)
        </div>
        <div className="section-content">
          {renderAwards()}
        </div>

        {/* Hospital Affiliations */}
        <div className="section-title" onClick={() => handleSectionClick('HOSPITAL AFFILIATIONS')}>
          HOSPITAL AFFILIATIONS
        </div>
        <div className="section-content">
          {renderHospitalAffiliations()}
        </div>

        {/* Research Affiliations */}
        <div className="section-title" onClick={() => handleSectionClick('RESEARCH AFFILIATIONS')}>
          RESEARCH AFFILIATIONS
        </div>
        <div className="section-content">
          {renderResearchAffiliations()}
        </div>

        {/* Training */}
        <div className="section-title" onClick={() => handleSectionClick('TRAINING')}>
          TRAINING
        </div>
        <div className="section-content">
          {renderTraining()}
        </div>

         {/* Psychometric Rating/Scales Experiences */}
         <div className="section-title" onClick={() => handleSectionClick('Psychometric Rating/Scales Experiences')}>
          PSYCHOMETRIC RATING/SCALES EXPERIENCES
        </div>
        <div className="section-content">
          {data["Psychometric Rating/Scales Experiences"]
            ?.filter(exp => exp["Scale / Rating Name"]?.trim())
            .map((experience, index) => (
              <div key={index} className="list-item">
                <div className="content-column">
                  <span>{experience["Scale / Rating Name"]}</span>
                </div>
              </div>
            )) || [<div key="no-experiences" className="list-item">No experiences listed</div>]}
        </div>

        {/* Additional Skills / Languages */}
        <div className="section-title" onClick={() => handleSectionClick('ADDITIONAL SKILLS')}>
          ADDITIONAL SKILLS
        </div>
        <div className="section-content">
          {data["Languages"]
            ?.filter(lang => lang["Language Name"])
            .map((language, index) => (
              <div key={index} className="language-item">
                {language["Language Name"]}{language["Proficiency Level"] ? ` - ${language["Proficiency Level"]}` : ''}
              </div>
            )) || [<div key="no-languages" className="language-item">Bilingual in English and Haitian-Creole</div>]}
        </div>

        {/* Publications */}
        <div className="section-title" onClick={() => handleSectionClick('PUBLICATIONS/PRESENTATIONS')}>
          PUBLICATIONS/PRESENTATIONS
        </div>
        <div className="section-content">
          {renderPublications()}
        </div>

        {/* Clinical Research Trials */}
        <div className="section-title" onClick={() => handleSectionClick('CLINICAL RESEARCH TRIALS CONDUCTED')}>
          CLINICAL RESEARCH TRIALS CONDUCTED
        </div>
        <div className="section-content">
          {renderClinicalTrials()}
        </div>

        {/* Footer */}
        <div className="cv-footer">
          <div className="footer-divider">
            <div className="footer-circle"></div>
            <div className="footer-line"></div>
            <div className="footer-circle"></div>
          </div>
          <div className="footer-content">
            <div className="page-info">
              <div className="page-number">Page 1 of 1</div>
              <div className="page-name">{personalInfo?.["First Name"]} {personalInfo?.["Middle Name"]} {personalInfo?.["Last Name"]}</div>
              <div className="page-date">{new Date().toLocaleDateString('en-US', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              }).replace(',', '')}</div>
            </div>
            
             
          </div>
        </div>

       

        {/* Signature Section */}
        {/* <div className="signature-section">
          <div className="signature-container">
            <div className="signature-top-bracket">Signed by:</div>
            <div className="signature-name">Kimsky Denis, MD, MPH, MBA, FACS</div>
            <div className="signature-bottom-bracket">2ED976A66D224E0...</div>
          </div>
          <div className="signature-date">16-Jan-2025</div>
          <div className="signature-line"></div>
          <div className="signature-line-text">Signature and Date</div>
        </div> */}
      </div>
    </div>
  );
};

export default CVTemplateHTML;
