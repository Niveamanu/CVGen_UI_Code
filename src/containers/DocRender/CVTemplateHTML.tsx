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
  "Credentials": string;
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
      'CLINICAL RESEARCH TRIALS CONDUCTED': 'Clinical Research Trials Conducted',
      'PSYCHOMETRIC RATING/SCALES EXPERIENCES': 'Psychometric Rating/ Scales Experience' // Fixed: matches exact step title
    };

    const stepTitle = sectionMapping[sectionTitle] || sectionTitle;
    // Normalize the section title for URL parameter
    const normalizedSection = stepTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    console.log('🔄 Navigating to section:', {
      originalSection: sectionTitle,
      mappedStep: stepTitle,
      normalizedSection: normalizedSection,
      fullUrl: `/cv-builder?section=${normalizedSection}`
    });
    
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

        {/* Name and Credentials */}
        <div className="cv-name">
          {(() => {
            const firstName = personalInfo?.["First Name"]?.trim();
            const middleName = personalInfo?.["Middle Name"]?.trim();
            const lastName = personalInfo?.["Last Name"]?.trim();
            const credentials = personalInfo?.["Credentials"]?.trim();
            
            const nameParts = [firstName, middleName, lastName].filter(Boolean);
            const fullName = nameParts.join(' ');
            
            if (fullName && credentials) {
              return `${fullName}, ${credentials}`;
            } else if (fullName) {
              return fullName;
            } else if (credentials) {
              return credentials;
            } else {
              return '';
            }
          })()}
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
        {(() => {
          const siteData = data?.["Flourish Site Affiliations"];
          const validSiteAffiliations = siteData?.filter(affiliation => 
            affiliation && 
            (affiliation["Site Name"]?.trim() || 
             affiliation["CTMS Site Name"]?.trim() ||
             affiliation["Site Address"]?.trim())
          ) || [];
          
          return validSiteAffiliations.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('FLOURISH SITE AFFILIATIONS')}>
                FLOURISH SITE AFFILIATIONS
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validSiteAffiliations.map((affiliation, index) => (
                  <div key={index} className="affiliation-item">
                    <div className="affiliation-text">
                      {affiliation["CTMS Site Name"] && `${affiliation["CTMS Site Name"]} `}
                      {affiliation["Site Name"]}, {affiliation["Site Address"]}, {affiliation["City"]}, {affiliation["State"]} {affiliation["Zipcode"]}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Education */}
        {(() => {
          const educationData = data?.["Education"];
          const validEducation = educationData?.filter(edu => 
            edu && 
            (edu["degree"]?.trim() || 
             edu["universityName"]?.trim() ||
             edu["startYear"]?.trim() ||
             edu["endYear"]?.trim())
          ) || [];
          
          return validEducation.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('EDUCATION')}>
                EDUCATION
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validEducation.map((education, index) => (
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
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Licenses */}
        {(() => {
          const licensesData = data?.["Licenses & Certifications"]?.licenses;
          const validLicenses = licensesData?.filter(license => 
            license && 
            (license["licenseName"]?.trim() || license["licenseNumber"]?.trim())
          ) || [];
          
          return validLicenses.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('LICENSE(S)')}>
                LICENSE(S)
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validLicenses.map((license, index) => (
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
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Certifications */}
        {(() => {
          const certificationsData = data?.["Licenses & Certifications"]?.certifications;
          const validCertifications = certificationsData?.filter(certification => 
            certification && 
            (certification["certificationTitle"]?.trim() || 
             certification["issuingOrganization"]?.trim() ||
             certification["certificationId"]?.trim())
          ) || [];
          
          return validCertifications.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('LICENSE(S)')}>
                CERTIFICATION(S)
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validCertifications.map((certification, index) => (
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
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Professional Experience */}
        {(() => {
          const experiences = data?.["Professional Experience"];
          const validExperiences = experiences?.filter(exp => 
            exp && 
            (exp["Job Title"]?.trim() || 
             exp["Organization/Hospital Name"]?.trim() ||
             exp["Start Date"]?.trim() ||
             exp["End Date"]?.trim())
          ) || [];
          
          return validExperiences.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('PROFESSIONAL EXPERIENCE')}>
                PROFESSIONAL EXPERIENCE
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validExperiences.map((experience, index) => (
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
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Professional Memberships */}
        {(() => {
          const memberships = data?.["Professional Active Memberships"];
          // Only show section if there are valid memberships with meaningful data
          const validMemberships = memberships?.filter(membership => 
            membership && 
            (membership["Organization Name"]?.trim() || 
             membership["Membership Type"]?.trim() || 
             membership["Status"]?.trim())
          ) || [];
          
          return validMemberships.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('PROFESSIONAL ACTIVE MEMBERSHIPS')}>
                PROFESSIONAL ACTIVE MEMBERSHIPS
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validMemberships.map((membership, index) => (
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
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Awards */}
        {(() => {
          const awardsData = data?.["Achievements or Awards"];
          const validAwards = awardsData?.filter(award => 
            award && 
            (award["Award / Achievement Name"]?.trim() || 
             award["Awarding Organization/Institution"]?.trim() ||
             award["Awarded / Achieved Year"]?.trim())
          ) || [];
          
          return validAwards.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('ACHIEVEMENT(S) AND/OR AWARD(S)')}>
                ACHIEVEMENT(S) AND/OR AWARD(S)
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validAwards.map((award, index) => (
                  <div key={index} className="list-item">
                    <div className="date-column">
                      <span>{award["Awarded / Achieved Year"] || ''}</span>
                    </div>
                    <div className="content-column">
                      <span>{award["Award / Achievement Name"] || award["Awarding Organization/Institution"]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Hospital Affiliations */}
        {(() => {
          const hospitalData = data?.["Hospital Affiliations"];
          const validHospitalAffiliations = hospitalData?.filter(affiliation => 
            affiliation && 
            (affiliation["Hospital Name"]?.trim() || 
             affiliation["From Date"]?.trim() ||
             affiliation["To Date"]?.trim())
          ) || [];
          
          return validHospitalAffiliations.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('HOSPITAL AFFILIATIONS')}>
                HOSPITAL AFFILIATIONS
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validHospitalAffiliations.map((affiliation, index) => (
                  <div key={index} className="affiliation-item">
                    <div className="affiliation-text">
                      {affiliation["Hospital Name"]}, {affiliation["From Date"]} - {affiliation["To Date"]}, {affiliation["city"]}, {affiliation["state"]},{affiliation["country"]}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Research Affiliations */}
        {(() => {
          const researchData = data?.["Research Affiliations"];
          const validResearchAffiliations = researchData?.filter(affiliation => 
            affiliation && 
            (affiliation["position"]?.trim() || 
             affiliation["institutionName"]?.trim() ||
             affiliation["start"]?.trim())
          ) || [];
          
          return validResearchAffiliations.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('RESEARCH AFFILIATIONS')}>
                RESEARCH AFFILIATIONS
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validResearchAffiliations.map((affiliation, index) => (
                  <div key={index} className="list-item">
                    <div className="date-column">
                      <span>{affiliation["start"] || ''}  </span>
                    </div>
                    <div className="content-column">
                      <span>{[affiliation["position"], affiliation["institutionName"]].filter(Boolean).join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Training */}
        {(() => {
          const trainingData = data?.["Training"];
          const validTraining = trainingData?.filter(training => 
            training && 
            (training["Training Program / Course Name"]?.trim() || 
             training["Institution / Provider"]?.trim() ||
             training["Duration / Dates"]?.trim())
          ) || [];
          
          return validTraining.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('TRAINING')}>
                TRAINING
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validTraining.map((training, index) => (
                  <div key={index} className="list-item">
                    <div className="date-column">
                      <span>{training["Duration / Dates"] || ''}</span>
                    </div>
                    <div className="content-column">
                      <span>{training["Training Program / Course Name"] || training["Institution / Provider"]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null;
        })()}

         {/* Psychometric Rating/Scales Experiences */}
         {(() => {
           const experiences = data?.["Psychometric Rating/Scales Experiences"];
           const validExperiences = experiences?.filter(exp => exp && exp["Scale / Rating Name"]?.trim()) || [];
           
           return validExperiences.length > 0 ? (
             <>
               <div className="section-title" onClick={() => handleSectionClick('PSYCHOMETRIC RATING/SCALES EXPERIENCES')}>
                 PSYCHOMETRIC RATING/SCALES EXPERIENCES
                 <span className="section-nav-icon">↗</span>
               </div>
               <div className="section-content">
                 {validExperiences.map((experience, index) => (
                   <div key={index} className="list-item">
                     <div className="content-column">
                       <span>{experience["Scale / Rating Name"]}</span>
                     </div>
                   </div>
                 ))}
               </div>
             </>
           ) : null;
         })()}

        {/* Additional Skills / Languages */}
        {(() => {
          const validLanguages = data?.["Languages"]?.filter(lang => lang && lang["Language Name"] && lang["Language Name"].trim()) || [];
          console.log('Languages data:', data?.["Languages"]);
          console.log('Valid languages:', validLanguages);
          return validLanguages.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('ADDITIONAL SKILLS')}>
                ADDITIONAL SKILLS
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validLanguages.map((language, index) => (
                  <div key={index} className="language-item">
                    {language?.["Language Name"] || ''}
                  </div>
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Publications */}
        {(() => {
          const publications = data?.["Publications"];
          const validPublications = publications?.filter(pub => 
            pub && pub["Publications / Presentations"]?.trim()
          ) || [];
          
          return validPublications.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('PUBLICATIONS/PRESENTATIONS')}>
                PUBLICATIONS/PRESENTATIONS
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validPublications.map((publication, index) => (
                  <div key={index} className="publication-item">
                    <span className="publication-number">{index + 1}.</span>
                    <span className="publication-text">
                      {publication["Publications / Presentations"]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : null;
        })()}

        {/* Clinical Research Trials */}
        {(() => {
          const trials = data?.["Clinical Research Trials Conducted"];
          const validTrials = trials?.filter(trial => 
            trial && trial["Trial Title"]?.trim()
          ) || [];
          
          return validTrials.length > 0 ? (
            <>
              <div className="section-title" onClick={() => handleSectionClick('CLINICAL RESEARCH TRIALS CONDUCTED')}>
                CLINICAL RESEARCH TRIALS CONDUCTED
                <span className="section-nav-icon">↗</span>
              </div>
              <div className="section-content">
                {validTrials.map((trial, index) => (
                  <div key={index} className="trial-item">
                    <span className="trial-number">{index + 1}.</span>
                    <span className="trial-text" style={{ fontWeight: 'normal !important', fontStyle: 'normal !important', fontFamily: 'inherit !important' }}>
                      {trial["Trial Title"]}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : null;
        })()}



       

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
