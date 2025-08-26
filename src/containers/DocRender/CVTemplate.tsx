import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import logo from './logo.png';

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

interface ProfessionalMembership {
  "Organization Name"?: string;
  "Membership Type"?: string;
  "Start Date"?: string;
  "End Date"?: string;
  "Status"?: string;
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
  "end"?: string;
}

interface AchievementsOrAwards {
  "Awarded / Achieved Year"?: string;
  "Award / Achievement Name"?: string;
  "Awarding Organization/Institution"?: string;
  "Description / Details"?: string;
}

interface HospitalAffiliation {
  "Hospital Name"?: string;
  "From Date"?: string;
  "To Date"?: string;
  "city"?: string;
  "state"?: string;
  "zipcode"?: string;
  "country"?: string;
}

interface CVData {
  "Personal Information": PersonalInfo;
  "Flourish Site Affiliations": SiteAffiliation[];
  "Hospital Affiliations": HospitalAffiliation[];
  "Research Affiliations": ResearchAffiliations[];
  "Education": Education[];
  "Licenses & Certifications": {
    licenses: License[];
    certifications: Certification[];
  };
  "Professional Experience": Experience[];
  "Publications": Publication[];
  "Clinical Research Trials Conducted": ClinicalResearchTrials[];
  "Psychometric Rating/Scales Experiences": any[];
  "Achievements or Awards": AchievementsOrAwards[];
  "Training": any[];
  "Languages": any[];
  "Professional Active Memberships": ProfessionalMembership[];
}

 

interface CVTemplateProps {
  data: Partial<CVData>;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  dividerCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
  },
  contactInfoContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  contactAddress: {
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 5,
  },
  contactDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  contactDetail: {
    marginHorizontal: 10,
    fontSize: 9,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 3,
    fontSize: 10,
  },
  dateColumn: {
    width: 80,
    marginRight: 10,
  },
  contentColumn: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  affiliationItem: {
    marginBottom: 5,
    fontSize: 10,
  },
  publicationItem: {
    marginBottom: 12,
    fontSize: 10,
    lineHeight: 1.3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 0,
  },
  publicationNumber: {
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 20,
    minWidth: 15,
    textAlign: 'left',
  },
  publicationText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.3,
  },
  trialSection: {
    marginBottom: 15,
  },
  trialTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  trialItem: {
    marginBottom: 12,
    fontSize: 10,
    lineHeight: 1.3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 0,
  },
  trialNumber: {
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 20,
    minWidth: 15,
    textAlign: 'left',
  },
  trialText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.3,
  },
  signatureSection: {
    marginTop: 40,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  signedByText: {
    fontSize: 10,
    marginBottom: 5,
  },
  signatureContainer: {
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    width: 350,
    alignItems: 'center',
    position: 'relative',
    height: 80,
    // backgroundColor: '#f8fbff', // Very light blue background to simulate gradient effect
  },
  signatureTopBracket: {
    position: 'absolute',
    top: -8,
    left: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 10,
    color: '#333',
    width: 400,
    height: 150,
  },
  signatureBottomBracket: {
    position: 'absolute',
    bottom: -8,
    left: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 3,
    fontSize: 8,
    color: '#666',
  },
  signatureName: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  },
  signatureId: {
    fontSize: 8,
    color: '#666',
  },
  signatureDate: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: 300,
    position: 'relative',
  },
  signatureLineText: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 5,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  footerDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  footerCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
  },
  footerLine: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  footerContent: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  footerDate: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  pageNumber: {
    fontSize: 10,
    color: '#333',
  },
  pageName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  pageDate: {
    fontSize: 10,
    color: '#333',
  },
  pageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
});

const CVTemplate: React.FC<CVTemplateProps> = ({ data }) => {
  const personalInfo = data["Personal Information"];

  const renderSiteAffiliations = () => {
    return data?.["Flourish Site Affiliations"]
      ?.map((affiliation, index) => (
        <View key={index} style={styles.affiliationItem}>
          <Text>
            {affiliation["Site Name"]}
            {affiliation["CTMS Site Name"] && ` (${affiliation["CTMS Site Name"]})`}
            {affiliation["Site Address"] && `, ${affiliation["Site Address"]}`}
            {affiliation["City"] && `, ${affiliation["City"]}`}
            {affiliation["State"] && `, ${affiliation["State"]}`}
            {affiliation["Zipcode"] && `, ${affiliation["Zipcode"]}`}
          </Text>
        </View>
      )) || [];
  };

  const renderEducation = () => {
    return data?.["Education"]
      ?.map((education, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.dateColumn}>
            <Text>{education["startYear"] || ''}-{education["endYear"] || ''}</Text>
          </View>
          <View style={styles.contentColumn}>
            <Text>
              {[education["degree"], education["universityName"], education["city"], education["state"], education["country"]]
                .filter(Boolean).join(", ")}
            </Text>
          </View>
        </View>
      )) || [];
  };

  const renderProfessionalExperience = () => {
    const experiences = data?.["Professional Experience"];
    if (!experiences || !Array.isArray(experiences)) return [];
    
    return experiences.map((experience, index) => (
      <View key={index} style={styles.listItem}>
        <View style={styles.dateColumn}>
          <Text>{experience["Start Date"] || ''}-{experience["End Date"] || ''}</Text>
        </View>
        <View style={styles.contentColumn}>
          <Text>
            {[experience["Job Title"], experience["Organization/Hospital Name"], experience["City"], experience["State"], experience["Country"]]
              .filter(Boolean).join(", ")}
          </Text>
        </View>
      </View>
    ));
  };

  const renderPublications = () => {
    const publications = data["Publications"];
    
    // Check if publications exists and is an array
    if (!publications || !Array.isArray(publications)) {
      return [];
    }
    
    return publications.map((publication, index) => (
      <View key={index} style={styles.publicationItem}>
        <Text style={styles.publicationNumber}>{index + 1}.</Text>
        <Text style={styles.publicationText}>
          {publication["Publications / Presentations"] && (
            <Text style={styles.bold}>{publication["Publications / Presentations"]}</Text>
          )}
          {publication["Authors"] && (
            <Text>{"\n"}Authors: {publication["Authors"]}</Text>
          )}
          {publication["Journal / Source"] && (
            <Text>{"\n"}Journal/Source: {publication["Journal / Source"]}</Text>
          )}
          {publication["Publication Date"] && (
            <Text>{"\n"}Publication Date: {publication["Publication Date"]}</Text>
          )}
          {publication["Volume / Issue / Pages"] && (
            <Text>{"\n"}Volume/Issue/Pages: {publication["Volume / Issue / Pages"]}</Text>
          )}
          {publication["DOI / Link"] && (
            <Text>{"\n"}DOI/Link: {publication["DOI / Link"]}</Text>
          )}
          {publication["Description / Summary"] && (
            <Text>{"\n"}Description: {publication["Description / Summary"]}</Text>
          )}
        </Text>
      </View>
    ));
  };

  const renderClinicalTrials = () => {
    const trials = data["Clinical Research Trials Conducted"];
    if (!trials || !Array.isArray(trials)) return [];

    return trials.map((trial, index) => (
      <View key={index} style={styles.trialItem}>
        <Text style={styles.trialNumber}>{index + 1}.</Text>
        <Text style={styles.trialText}>
          {trial["Trial Title"] && (
            <Text style={styles.bold}>{trial["Trial Title"]}</Text>
          )}
        </Text>
      </View>
    ));
  };

  const renderLicenses = () => {
    const licensesData = data["Licenses & Certifications"]?.licenses;
    if (!licensesData || !Array.isArray(licensesData)) return [];
    
    return licensesData.map((license, index) => (
      <View key={index} style={styles.listItem}>
        <View style={styles.dateColumn}>
          <Text>{license["issueDate"] || ''}-{license["expiryDate"] || ''}</Text>
        </View>
        <View style={styles.contentColumn}>
          <Text>
            {[license["licenseName"], license["licenseNumber"]]
              .filter(Boolean).join(", ")}
            {license["issuingAuthority"] && `, ${license["issuingAuthority"]}`}
          </Text>
        </View>
      </View>
    ));
  };

  const renderCertifications = () => {
    const certificationsData = data["Licenses & Certifications"]?.certifications;
    if (!certificationsData || !Array.isArray(certificationsData)) return [];
    
    return certificationsData.map((certification, index) => (
      <View key={index} style={styles.listItem}>
        <View style={styles.dateColumn}>
          <Text>{certification["issueDate"] || ''}</Text>
        </View>
        <View style={styles.contentColumn}>
          <Text>
            {[certification["certificationTitle"], certification["issuingOrganization"]]
              .filter(Boolean).join(", ")}
            {certification["certificationId"] && `, ID: ${certification["certificationId"]}`}
          </Text>
        </View>
      </View>
    ));
  };

  const renderAwards = () => {
    return data?.["Achievements or Awards"]
      ?.map((award, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.dateColumn}>
            <Text>{award["Awarded / Achieved Year"] || ''}</Text>
          </View>
          <View style={styles.contentColumn}>
            <Text>
              {award["Award / Achievement Name"]}
              {award["Awarding Organization/Institution"] && `, ${award["Awarding Organization/Institution"]}`}
              {award["Description / Details"] && ` - ${award["Description / Details"]}`}
            </Text>
          </View>
        </View>
      )) || [];
  };

  const renderResearchAffiliations = () => {
    return data?.["Research Affiliations"]
      ?.map((affiliation, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.dateColumn}>
            <Text>{affiliation["start"] || ''}  </Text>
          </View>
          <View style={styles.contentColumn}>
            <Text>
              {affiliation["institutionName"]}
              {affiliation["position"] && `, ${affiliation["position"]}`}
            </Text>
          </View>
        </View>
      )) || [];
  };

  const renderTraining = () => {
    return data?.["Training"]
      ?.map((training, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.dateColumn}>
            <Text>{training["Start"] || ''}</Text>
          </View>
          <View style={styles.contentColumn}>
            <Text>
              {training["Training Program / Course Name"]}
              {training["Institution / Provider"] && `, ${training["Institution / Provider"]}`}
            </Text>
          </View>
        </View>
      )) || [];
  };

  const renderProfessionalMemberships = () => {
    const memberships = data["Professional Active Memberships"];
    if (!memberships || !Array.isArray(memberships)) return [];

    return memberships.map((membership, index) => {
      if (typeof membership !== 'object' || membership === null) {
        return <Text key={index} style={{ fontSize: 10 }}>Invalid membership data</Text>;
      }
      
      const orgName = String(membership["Organization Name"] || '');
      const membershipType = String(membership["Membership Type"] || '');
      const status = String(membership["Status"] || '');
      const startDate = String(membership["Start Date"] || '');
      const endDate = String(membership["End Date"] || '');
      
      const displayText = [
        orgName,
        membershipType ? `(${membershipType})` : '',
        status ? `- ${status}` : ''
      ].filter(Boolean).join(' ');
      
      const dateText = `${startDate} - ${endDate}`;
      
      return (
        <View key={index} style={styles.listItem}>
          <View style={styles.dateColumn}>
            <Text>{dateText}</Text>
          </View>
          <View style={styles.contentColumn}>
            <Text>{displayText}</Text>
          </View>
        </View>
      );
    });
  };

  const renderAchievementsOrAwards = () => {
    return data?.["Achievements or Awards"]
      ?.map((award, index) => (
        <View key={index} style={styles.listItem}>
          <View style={styles.dateColumn}>
            <Text>{award["Awarded / Achieved Year"] || ''}</Text>
          </View>
          <View style={styles.contentColumn}>
            <Text>
              {award["Award / Achievement Name"]}
              {award["Awarding Organization/Institution"] && `, ${award["Awarding Organization/Institution"]}`}
              {award["Description / Details"] && ` - ${award["Description / Details"]}`}
            </Text>
          </View>
        </View>
      )) || [];
  };

  const renderHospitalAffiliations = () => {
    return data?.["Hospital Affiliations"]
      ?.map((affiliation, index) => (
        <View key={index} style={styles.affiliationItem}>
          <Text>
            {affiliation["Hospital Name"]}
            {affiliation["From Date"] && `, From: ${affiliation["From Date"]}`}
            {affiliation["To Date"] && `, To: ${affiliation["To Date"]}`}
            {affiliation["city"] && `, ${affiliation["city"]}`}
            {affiliation["state"] && `, ${affiliation["state"]}`}
            {affiliation["zipcode"] && `, ${affiliation["zipcode"]}`}
            {affiliation["country"] && `, ${affiliation["country"]}`}
          </Text>
        </View>
      )) || [];
  };


  return (
    <Document>
      <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image src={logo} style={styles.logo} />
          </View>

        {/* CV Title */}
        <Text style={styles.title}>Curriculum Vitae</Text>
        {/* Name and Credentials */}
        <Text style={styles.name}>
          {personalInfo?.["First Name"]} {personalInfo?.["Middle Name"]} {personalInfo?.["Last Name"]}, {personalInfo?.["Credentials"]}
        </Text>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerCircle} />
          <View style={styles.dividerLine} />
          <View style={styles.dividerCircle} />
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfoContainer}>
          <View style={styles.contactDetailsRow}>
            <Text style={styles.contactDetail}>
              Tel: {personalInfo?.["Business Number"]}
            </Text>
            <Text style={styles.contactDetail}>
              E-Mail: {personalInfo?.["Business Email Address"]}
            </Text>
          </View>
        </View>

        {/* Flourish Site Affiliations */}
        {data["Flourish Site Affiliations"] && data["Flourish Site Affiliations"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>FLOURISH SITE AFFILIATIONS</Text>
            <View style={styles.sectionContent}>
              {renderSiteAffiliations()}
            </View>
          </>
        )}

        {/* Hospital Affiliations */}
        {data["Hospital Affiliations"] && data["Hospital Affiliations"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>HOSPITAL AFFILIATIONS</Text>
            <View style={styles.sectionContent}>
              {renderHospitalAffiliations()}
            </View>
          </>
        )}

        {/* Research Affiliations */}
        {data["Research Affiliations"] && data["Research Affiliations"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>RESEARCH AFFILIATIONS</Text>
            <View style={styles.sectionContent}>
              {renderResearchAffiliations()}
            </View>
          </>
        )}

        {/* Education */}
        {data["Education"] && data["Education"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.sectionContent}>
              {renderEducation()}
            </View>
          </>
        )}

        {/* Licenses & Certifications */}
        {data["Licenses & Certifications"] && (
          (data["Licenses & Certifications"].licenses && data["Licenses & Certifications"].licenses.length > 0) ||
          (data["Licenses & Certifications"].certifications && data["Licenses & Certifications"].certifications.length > 0)
        ) && (
          <>
            <Text style={styles.sectionTitle}>LICENSES & CERTIFICATIONS</Text>
            <View style={styles.sectionContent}>
              {renderLicenses()}
              {renderCertifications()}
            </View>
          </>
        )}

        {/* Professional Experience */}
        {data["Professional Experience"] && data["Professional Experience"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
            <View style={styles.sectionContent}>
              {renderProfessionalExperience()}
            </View>
          </>
        )}

        {/* Professional Active Memberships */}
        {data["Professional Active Memberships"] && data["Professional Active Memberships"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>PROFESSIONAL ACTIVE MEMBERSHIPS</Text>
            <View style={styles.sectionContent}>
              {renderProfessionalMemberships()}
            </View>
          </>
        )}

        {/* Achievements or Awards */}
        {data["Achievements or Awards"] && data["Achievements or Awards"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>ACHIEVEMENTS OR AWARDS</Text>
            <View style={styles.sectionContent}>
              {renderAchievementsOrAwards()}
            </View>
          </>
        )}

        {/* Training */}
        {data["Training"] && data["Training"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>TRAINING</Text>
            <View style={styles.sectionContent}>
              {renderTraining()}
            </View>
          </>
        )}

        {/* Psychometric Rating/Scales Experiences */}
        {data["Psychometric Rating/Scales Experiences"] && data["Psychometric Rating/Scales Experiences"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>PSYCHOMETRIC RATING/SCALES EXPERIENCES</Text>
            <View style={styles.sectionContent}>
              {data["Psychometric Rating/Scales Experiences"].map((experience, index) => (
                <Text key={index} style={{ fontSize: 10 }}>
                  {experience["Scale / Rating Name"]}
                </Text>
              ))}
            </View>
          </>
        )}

        {/* Additional Skills / Languages */}
        {data["Languages"] && data["Languages"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>ADDITIONAL SKILLS</Text>
            <View style={styles.sectionContent}>
              {data["Languages"]
                .filter(lang => lang["Language Name"])
                .map((language, index) => (
                  <Text key={index} style={{ fontSize: 9 }}>
                    {language["Language Name"]}
                  </Text>
                ))}
            </View>
          </>
        )}

        {/* Publications */}
        {data["Publications"] && data["Publications"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>PUBLICATIONS/PRESENTATIONS</Text>
            <View style={styles.sectionContent}>
              {renderPublications()}
            </View>
          </>
        )}

        {/* Clinical Research Trials */}
        {data["Clinical Research Trials Conducted"] && data["Clinical Research Trials Conducted"].length > 0 && (
          <>
            <Text style={styles.sectionTitle}>CLINICAL RESEARCH TRIALS CONDUCTED:</Text>
            <View style={styles.sectionContent}>
              {renderClinicalTrials()}
            </View>
          </>
        )}

        {/* Footer */}
        {/* <View style={styles.footer}>
          <View style={styles.footerDivider}>
            <View style={styles.footerCircle} />
            <View style={styles.footerLine} />
            <View style={styles.footerCircle} />
          </View>
          <View style={styles.footerContent}>
            <View style={styles.pageInfo}>
              <Text style={styles.pageNumber}>Page 1 of 1</Text>
              <Text style={styles.pageName}>
                {personalInfo?.["First Name"]} {personalInfo?.["Middle Name"]} {personalInfo?.["Last Name"]}
              </Text>
              <Text style={styles.pageDate}>
                {new Date().toLocaleDateString('en-US', { 
                  day: '2-digit', 
                  month: 'short', 
                  year: 'numeric' 
                }).replace(',', '')}
              </Text>
            </View>
          
          </View>
        </View> */}

        {/* Signature Section */}
        {/* <View style={styles.signatureSection}>
          <View style={styles.signatureContainer}>
            <Text style={styles.signatureTopBracket}>Signed by:</Text>
            <Text style={styles.signatureName}>Kimsky Denis, MD, MPH, MBA, FACS</Text>
            <Text style={styles.signatureBottomBracket}>2ED976A66D224E0...</Text>
          </View>
          <Text style={styles.signatureDate}>16-Jan-2025</Text>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureLineText}>Signature and Date</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default CVTemplate;
