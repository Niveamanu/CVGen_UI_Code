export interface CVData {
  "Email Address": string;
  "Version": string;
  "s3_path": string;
  "Status": string;
  "Date Added": string;
  "Personal Information": {
    "First Name": string;
    "Middle Name": string;
    "Last Name": string;
    "Degree Title": string[];
    "Certifications": string;
  };
  "Flourish Site Affiliations": Array<{
    "Site Name": string;
    "CTMS Site Name": string;
    "Business Number": string;
    "Business Email Address": string;
    "Site Address": string;
    "City": string;
    "State": string;
    "Zipcode": string;
    "Description of Affiliation": string;
  }>;
  "Hospital Affiliations": Array<{
    "Hospital Name": string;
    "From Date": string;
    "To Date": string;
    "city": string;
    "state": string;
    "zipcode": string;
    "country": string;
  }>;
  "Education": Array<{
    "Start Year": string;
    "End Year": string;
    "Degree": string;
    "University Name": string;
    "City": string;
    "State": string;
    "Country": string;
  }>;
  "License": Array<{
    "Issue Date": string;
    "Exiry Date": string;
    "License Name": string;
    "Issuing Authority": string;
    "License Number": string;
  }>;
  "Certifications": Array<{
    "Issue Date": string;
    "Expiry Date": string;
    "Certificate Title": string;
    "Issuing Organization": string;
    "Certificate ID": string;
  }>;
  "Professional Experience": Array<{
    "Job Title": string;
    "Organization/Hospital Name": string;
    "Start Date": string;
    "End Date": string;
    "City": string;
    "State": string;
    "Country": string;
  }>;
  "Psychometric Rating/Scales Experiences": Array<{
    "Scale / Rating Name": string;
    "Description / Experience": string;
    "Number of Scales Used": string;
    "Context / Application": string;
  }>;
  "Professional Active Memberships": Array<{
    "Organization Name": string;
    "Membership Type": string;
    "Start Date": string;
    "End Date": string;
    "Status": string;
  }>;
  "Publications": Array<{
    "Publication Title": string;
    "Authors": string;
    "Journal / Source": string;
    "Publication Date": string;
    "Volume / Issue / Pages": string;
    "DOI / Link": string;
    "Description / Summary": string;
  }>;
  "Clinical Research Trials Conducted": Array<{
    "Trial Title": string;
    "Trial ID / Registration Number": string;
    "Institution / Organization": string;
    "Role / Position": string;
    "Start Date": string;
    "End Date": string;
    "Brief Description / Outcome": string;
  }>;
  "Research Affiliations": Array<{
    "Institution Name": string;
    "Research Area / Focus": string;
    "Position / Role": string;
    "Start": string;
    "End": string;
    "Project Title / Description": string;
    "Address": string;
    "City": string;
    "State": string;
    "Zipcode": string;
    "Country": string;
  }>;
  "Achievements or Awards": Array<{
    "Award / Achievement Name": string;
    "Awarding Organization/Institution": string;
    "Awarded / Achieved Month": string;
    "Awarded / Achieved Year": string;
    "Description / Details": string;
  }>;
  "Training": Array<{
    "Training Program / Course Name": string;
    "Institution / Provider": string;
    "Duration / Dates": string;
    "Certification / Qualification": string;
    "Description / Details": string;
  }>;
  "Languages": Array<{
    "Language Name": string;
    "Proficiency Level": string;
    "Certification / Qualification": string;
  }>;
  "Encoded Content": string;
  "Updated By": string;
  "Role": string;
}

export interface CVCollectionResponse {
  data: CVData[];
  success: boolean;
  message?: string;
}

export interface CVCollection {
  "full_name": string;
  "site_name": string;
  "role": string;
  "created_at": string;
  "created_by": string;
  "email": string;
  "version": string;
}


