import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import styles from "./CreateCV.module.scss";
import { useApiClient } from "../hooks/useApiClient";
import { toast } from "react-toastify";

export default function CreateCV() {
  const navigate = useNavigate();
  const apiClient = useApiClient();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    // Only take the first file (single file upload)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (isValidFileType(droppedFile)) {
        setFile(droppedFile);
      } else {
        toast.error("Please select a valid file type (.docx or .pdf)");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only take the first file (single file upload)
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (isValidFileType(selectedFile)) {
        setFile(selectedFile);
      } else {
        toast.error("Please select a valid file type (.docx or .pdf)");
      }
    }
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/pdf", // .pdf
    ];
    return validTypes.includes(file.type);
  };

  const handleCreateNewCV = async () => {
    // If no file is uploaded, go directly to CV builder
    if (!file) {
      navigate("/cv-builder", {
        state: {
          uploadedCVData: {
            data: {
            Publications: [
              {
                "Publications / Presentations":
                  "Chhota Udaipur Health Fair: A Cross Sectional Analysis of Health Indicators in Rural Gujarat, India",
                Authors:
                  "Peschansky V, Parikh PP, Parikh TP, Srivastava K, Denis R, Alsina L, Changela K",
                "Journal / Source":
                  "Poster Presentation at 2011 37th Annual Eastern Atlantic Student Research Forum (ESRF)",
                "Publication Date": "February 25, 2011",
                "Volume / Issue / Pages": "",
                "DOI / Link": "",
                "Description / Summary": "",
              },
              {
                "Publications / Presentations":
                  "INTESTINAL WORM INFECTION: A COMMUNITY BASED APPROACH IN ERADICATING CHILD ILLNESSES IN RURAL GHANA",
                Authors: "Denis R., Rickard D, MD",
                "Journal / Source":
                  "Oral Presentation at 2nd Annual Jay Weiss Social Medicine Advocacy Research and Training (SMART) Forum",
                "Publication Date": "October 8, 2010",
                "Volume / Issue / Pages": "",
                "DOI / Link": "",
                "Description / Summary": "",
              },
            ],
            "Psychometric Rating/Scales Experiences": [
              {
                "Scale / Rating Name": "C-SSRS",
              },
            ],
            "Clinical Research Trials Conducted": [
              {
                "Trial Title":
                  'A Randomized, Double-Blind Study to Evaluate the Efficacy and Safety of "Study Drug" in Patients with Alzheimer\'s Disease',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Multicenter, Randomized, Placebo-Controlled, Double-Blind, Parallel-Group Study, to Assess Efficacy, Safety, and Immunogenicity of "Study Drug," a Phosphorylated Tau Targeted Active Immunotherapy, in Participants with Preclinical Alzheimer\'s Disease',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase 2, Randomized, Double-blind, Placebo-controlled, Multi-center, Dose-ranging Study to Evaluate the Efficacy and Safety of "Study Drug" in Adult Participants with Severe Asthma',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A 4-Week, Double-Blind, Placebo-Controlled, Parallel-Group, Efficacy and Safety Trial of "Study Drug 1/Study Drug 2" Combination compared to "Study Drug 1, Study Drug 2" or Placebo delivered by Multidose Dry Powder Inhaler in Participants 12 Years and Older with Asthma',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase II, Randomized, Double-blind, Placebo-controlled, Crossover Study to Assess the Effect of "Study Drug" on Ambulatory Blood Pressure in Participants with Atherosclerotic Cardiovascular Disease or Risk Equivalents and Elevated Lor-density Lipoprotein Cholesterol',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Placebo-controlled, Double-blind, Randomized, Phase 3 Study to Evaluate the Effect of "Study Drug" Fixed Dose Combination Daily on Coronary Plaque Characteristics in Participants with Atherosclerotic Cardiovascular Disease on Coronary CT Angiography',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 3 Randomized, Placebo-Controlled Clinical Study to Evaluate the Efficacy and Safety of \"Study Drug' in Reducing Major Adverse Cardiovascular Events in Participants at High Cardiovascular Risk",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A randomized double-blind, placebo-controlled, multicenter study to evaluate the efficacy, safety and tolerability of "Study Drug" in US Black/African American & Hispanic patient populations with elevated Lp(a) and established atherosclerotic cardiovascular disease',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 3, Randomized, Double-Blind, Placebo-Controlled, Event-Driven Study to Investigate the Effect of \"Study Drug' on the Incidence of Major Adverse Cardiovascular Events and Major Adverse Kidney Events in Participants with Body Mass Index ≥27 kg/m² and Atherosclerotic Cardiovascular Disease and/or Chronic Kidney Disease",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase 3, Randomized, Double-Blind, Placebo-Controlled Study to Investigate the Effect of "Study Drug" on the Reduction of Major Adverse Cardiovascular Events in Adults with Elevated Lipoprotein(a) who have Established Atherosclerotic Cardiovascular Disease or Are at Risk for a First Cardiovascular Event',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A randomized double-blind, placebo-controlled, multicenter trial assessing the impact of lipoprotein(a) lowering with "Study Drug" on the progression of calcific aortic valve stenosis',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Double-blind, Randomized, Placebo-controlled, Multicenter Study Assessing the Impact of "Study Drug" on Major Cardiovascular Events in Patients with Atherosclerotic Cardiovascular Disease and Elevated Lipoprotein (a)',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase 3, Open-Label Study of Once Daily "Study Drug" Compared with "Comparator Drug" in Adult Participants with Type 2 Diabetes and Obesity or Overweight at Increased Cardiovascular Risk',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A multicentre randomized, double-blind, placebo-controlled Phase 2a study to evaluate efficacy, safety, tolerability, pharmacokinetics and target engagement of "Study Drug" in adult patients with Chronic Diabetic Neuropathic Pain (DPNP)',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase 2, Randomized, Double-Blind, Placebo-Controlled, Dose-Ranging Study to Evaluate "Study Drug" in Adult Participants with Diabetic Peripheral Neuropathic Pain',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase 2, Randomized, Double-Blind, Placebo-Controlled, Parallel Study to Evaluate the Efficacy and Safety of Subcutaneously Administered "Study Drug" in Patients with Mixed Dyslipidemia',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase 3, Open-label Extension Study to Evaluate the Safety and Efficacy of "Study Drug" in Adults With Hypercholesterolemia',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase III double-blind, randomised, parallel-group superiority trial to evaluate efficacy and safety of the combined use of oral "Study Drug 1 and Study Drug 2" compared with placebo and "Study Drug 2" in participants with symptomatic heart failure and left ventricular ejection fraction',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  'A Phase 2b Randomized, Double-blind, Placebo-controlled, Multicenter Dose Ranging Study to Evaluate The Efficacy and Safety of "Study Drug", a Novel Long-acting Antiviral Conjugate, for the Prevention of Influenza in Subjects not at Risk for Influenza Complications',
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Multi-center, Randomized, Double-blind, Placebo-controlled Trial to Assess the Efficacy and Safety of Study Drug in Excessive Sleepiness Associated with Shift Work Disorder",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 3 Open Label Continuation Protocol of a Fixed Dose Combination of Study Drug in Obstructive Sleep Apnea",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 3, Randomized, Double-Blind, Placebo-Controlled Study to Investigate the Effect of Study Drug on the Reduction of Morbidity and Mortality in Adults with Obesity",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 3, randomised, double-blind, parallel-group, event-driven, cardiovascular safety study with Study Drug administered subcutaneously compared with placebo in participants with overweight or obesity with established cardiovascular disease (CVD) or chronic kidney disease, and/or at least two weight-related complications or risk factors for CVD",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Master Protocol to Investigate the Efficacy and Safety of Study Drug Once Weekly in Participants with Type 2 Diabetes Mellitus who have Obesity or Overweight: A Randomized, Double-Blind, Placebo-Controlled Trial",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 3, Randomized, Double-Blind Study to Evaluate the Efficacy and Safety of Study Drug Compared to Comparator Drug in Adults Who Have Obesity",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 2, Double-Blind, Randomized, Placebo-Controlled Study of Study Drug 1 and Study Drug 2, Alone or in Combination, to Investigate the Efficacy and Safety in Adult Participants with Obesity or Overweight without Type 2 Diabetes",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 3 Study to Investigate the Efficacy and Safety of Study Drug Once Weekly in Participants who have Obesity or Overweight and Osteoarthritis of the Knee: A Randomized, Double-blind, Placebo-Controlled Trial",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Master Protocol to Investigate the Efficacy and Safety of Study Drug Once Weekly in Participants without Type 2 Diabetes who have Obesity or Overweight: A Randomized, Double-Blind, Placebo-Controlled Trial",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Double-Blind, Double Dummy, Randomized, Phase 1b, Nitrofurantoin Controlled, Repeat Oral Dose Study to Investigate the Safety, Tolerability, Pharmacokinetics and Microbiological Response of Study Drug in Female Participants with Acute Uncomplicated Urinary Tract Infection",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
              {
                "Trial Title":
                  "A Phase 3b, open-label, single-arm study in adolescent and adult female participants to evaluate clinical symptom improvement and the safety of Study Drug during treatment of uncomplicated urinary tract infections (acute cystitis)",
                "Trial ID / Registration Number": "",
                "Role / Position": "",
                "Start Date": "",
                "End Date": "",
              },
            ],
            "Hospital Affiliations": [
              {
                "Hospital Name": "Jackson North Hospital",
                "From Date": "2020",
                "To Date": "",
                city: "Miami",
                state: "Florida",
                zipcode: "",
                country: "",
              },
              {
                "Hospital Name": "Mercy Hospital",
                "From Date": "1998",
                "To Date": "",
                city: "Miami",
                state: "Florida",
                zipcode: "",
                country: "",
              },
              {
                "Hospital Name": "Aventura Hospital",
                "From Date": "2000",
                "To Date": "",
                city: "Miami",
                state: "Florida",
                zipcode: "",
                country: "",
              },
              {
                "Hospital Name": "Florida University Hospital",
                "From Date": "2000",
                "To Date": "",
                city: "Davie",
                state: "Florida",
                zipcode: "",
                country: "",
              },
              {
                "Hospital Name": "Kendall Regional Hospital",
                "From Date": "1998",
                "To Date": "",
                city: "Miami",
                state: "Florida",
                zipcode: "",
                country: "",
              },
            ],
            "Professional Active Memberships": [
              {
                "Organization Name": "Association of Black Cardiologist (ABC)",
                "Membership Type": "Member",
                "Start Date": "2024",
                "End Date": "",
                Status: "",
              },
              {
                "Organization Name": "American College of Cardiology (ACC)",
                "Membership Type": "Fellow",
                "Start Date": "2023",
                "End Date": "",
                Status: "",
              },
              {
                "Organization Name":
                  "Society of Society of Cardiovascular Angiography & Interventions (SCAI)",
                "Membership Type": "Member",
                "Start Date": "2022",
                "End Date": "",
                Status: "",
              },
              {
                "Organization Name": "American Heart Association (AHA)",
                "Membership Type": "Member",
                "Start Date": "2017",
                "End Date": "",
                Status: "",
              },
            ],
            "Research Affiliations": [
              {
                institutionName: "Flourish Research",
                position: "Investigator",
                start: "2024",
                end: "2020",
              },
              {
                institutionName:
                  "Johns Hopkins University/Johns Hopkins Hospital",
                position: "Investigator",
                start: "2019",
                end: "2023",
              },
              {
                institutionName:
                  "University of Miami Department of OB/GYN Research",
                position: "Trainee",
                start: "2008",
                end: "2009",
              },
            ],
            "Achievements or Awards": [
              {
                "Award / Achievement Name":
                  "John K. Robinson- Medical Student Dean's Award",
                "Awarding Organization/Institution": "",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2014",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name":
                  "University of Miami Department of Medicine Professionalism Award",
                "Awarding Organization/Institution":
                  "University of Miami Department of Medicine",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2014",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name":
                  "University of Miami Medical Parents Association Award",
                "Awarding Organization/Institution":
                  "University of Miami Medical Parents Association",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2014",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name":
                  "George Paff Teaching Award: Thomas Crowder 4' Year Medical Student of the Year Award",
                "Awarding Organization/Institution": "",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2014",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name":
                  "Jackie Tuckfield Graduate Business Student Award",
                "Awarding Organization/Institution": "",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2013",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name":
                  "1s! Place Delta Omega Scientific Poster Competition",
                "Awarding Organization/Institution": "",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2012",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name":
                  "Iron Arrow Honor Society University of Miami, The Highest Honor Attained at the University of Miami",
                "Awarding Organization/Institution": "University of Miami",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2011",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name":
                  "National Medical Association Medical Student Award",
                "Awarding Organization/Institution":
                  "National Medical Association",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2011",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name":
                  "Thomas Brown McClelland Rotary Club of Miami Award",
                "Awarding Organization/Institution": "Rotary Club of Miami",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2009",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name": "University of Miami Trustee Award",
                "Awarding Organization/Institution": "University of Miami",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2009",
                "Description / Details": "",
              },
              {
                "Award / Achievement Name": "Golden Key Honor Society Award",
                "Awarding Organization/Institution": "Golden Key Honor Society",
                "Awarded / Achieved Month": "",
                "Awarded / Achieved Year": "2008",
                "Description / Details": "",
              },
            ],
            Training: [
              {
                "Training Program / Course Name":
                  "Collaborative Institutional Training Initiative (CITI)/Health Insurance Portability and Accountability Act (HIPAA)",
                "Institution / Provider":
                  "Collaborative Institutional Training Initiative (CITI)",
                Start: "Sep 2024",
              },
              {
                "Training Program / Course Name":
                  "Global Health Network (GHN)/Good Clinical Practice E6 (GCP)",
                "Institution / Provider": "Global Health Network (GHN)",
                Start: "Aug 2024",
              },
              {
                "Training Program / Course Name":
                  "Collaborative Institutional Training Initiative (CITI)/Human Subject Protection (HSP)",
                "Institution / Provider":
                  "Collaborative Institutional Training Initiative (CITI)",
                Start: "Sep 2024",
              },
              {
                "Training Program / Course Name":
                  "American College of Cardiology (ACC) 2024 Clinical Trials Research: Upping Your Game",
                "Institution / Provider":
                  "American College of Cardiology (ACC)",
                Start: "2024-2025",
              },
            ],
            Languages: [
              {
                "Language Name": "English",
              },
              {
                "Language Name": "Haitian-Creole",
              },
            ],
            "Personal Information": {
              "First Name": "Rimsky",
              "Middle Name": "",
              "Last Name": "Denis",
              "Degree Title": "MD, MPH, MBA",
              Certifications: "FACC",
              "Business Number": "(786) 772-1510",
              "Business Email Address": "rdenis@flourishresearch.com",
            },
            "Flourish Site Affiliations": [
              {
                "Site Name": "Flourish Research North Miami",
                "CTMS Site Name": "ad asda",
                "Site Address": "8260 NE 2nd Avenue",
                City: "Miami",
                State: "Florida",
                Zipcode: "33138",
              },
              {
                "Site Name": "Flourish Research",
                "CTMS Site Name": "Amgensss",
                "Site Address": "2128 West Flagler Street, First Floor",
                City: "Miami",
                State: "Florida",
                Zipcode: "33135",
              },
              {
                "Site Name": "Flourish Research",
                "CTMS Site Name": "asdasj amgens",
                "Site Address": "12600 SW 120th Street, Suites 116/117",
                City: "Miami",
                State: "Florida",
                Zipcode: "33186",
              },
              {
                "Site Name": "Flourish Research",
                "CTMS Site Name": "asdas masdas",
                "Site Address": "7900 Glades Road, Suite 400",
                City: "Boca Raton",
                State: "Florida",
                Zipcode: "33434",
              },
            ],
            Education: [
              {
                startYear: "2003",
                endYear: "2006",
                degree: "Bachelor of Science (B.S.) Biological Science",
                universityName: "Florida International University",
                city: "Miami",
                state: "Florida",
                country: "USA",
              },
              {
                startYear: "2006",
                endYear: "2008",
                degree: "Master of Public Health (M.P.H.)",
                universityName: "Florida International University",
                city: "Miami",
                state: "Florida",
                country: "USA",
              },
              {
                startYear: "2012",
                endYear: "2013",
                degree: "Master of Business Administration (M.B.A.)",
                universityName: "University of Miami",
                city: "Miami",
                state: "Florida",
                country: "USA",
              },
              {
                startYear: "2009",
                endYear: "2014",
                degree: "Medical Doctorate (M.D.)",
                universityName: "University of Miami Miller School of Medicine",
                city: "Miami",
                state: "Florida",
                country: "USA",
              },
            ],
            License: [
              {
                issueDate: "2017",
                exiryDate: "Present",
                licenseName: "State of Florida Medical License",
                issuingAuthority: "State of Florida",
                licenseNumber: "ME137480",
              },
            ],
            Certifications: [
              {
                issueDate: "Mar 2023",
                expiryDate: "",
                certificateTitle: "Advanced Cardiovascular Life Support (ACLS)",
                issuingOrganization: "American Heart Association",
                certificateID: "",
              },
              {
                issueDate: "Mar 2023",
                expiryDate: "",
                certificateTitle: "Basic Life Support (BLS)",
                issuingOrganization: "American Heart Association",
                certificateID: "",
              },
              {
                issueDate: "Aug 2024",
                expiryDate: "",
                certificateTitle: "Internal Medicine",
                issuingOrganization: "American Board of Internal Medicine",
                certificateID: "",
              },
              {
                issueDate: "Sep 2023",
                expiryDate: "",
                certificateTitle: "Interventional Cardiology",
                issuingOrganization: "American Board of Internal Medicine",
                certificateID: "",
              },
              {
                issueDate: "Sep 2022",
                expiryDate: "",
                certificateTitle: "Cardiovascular Disease",
                issuingOrganization: "American Board of Internal Medicine",
                certificateID: "",
              },
            ],
            "Professional Experience": [
              {
                "Job Title": "Investigator",
                "Organization/Hospital Name":
                  "Flourish Research Acquisition, LLC dba Flourish Research North Miami",
                "Start Date": "2024",
                "End Date": "Present",
                City: "Miami",
                State: "Florida",
                Country: "USA",
              },
              {
                "Job Title": "Structural & Interventional Cardiologist",
                "Organization/Hospital Name": "Cardiovascular Health Institute",
                "Start Date": "2024",
                "End Date": "Present",
                City: "Miami",
                State: "Florida",
                Country: "USA",
              },
              {
                "Job Title": "Structural & Interventional Cardiologist",
                "Organization/Hospital Name": "HCA Aventura Hospital",
                "Start Date": "2023",
                "End Date": "2024",
                City: "Miami",
                State: "Florida",
                Country: "USA",
              },
              {
                "Job Title": "Fellow Structural Cardiology",
                "Organization/Hospital Name": "Johns Hopkins Hospital",
                "Start Date": "2022",
                "End Date": "2023",
                City: "Baltimore",
                State: "Maryland",
                Country: "USA",
              },
              {
                "Job Title": "Fellow Interventional Cardiology",
                "Organization/Hospital Name": "Johns Hopkins Hospital",
                "Start Date": "2021",
                "End Date": "2022",
                City: "Baltimore",
                State: "Maryland",
                Country: "USA",
              },
              {
                "Job Title": "Fellow Cardiovascular Disease",
                "Organization/Hospital Name": "Johns Hopkins Hospital",
                "Start Date": "2020",
                "End Date": "2021",
                City: "Baltimore",
                State: "Maryland",
                Country: "USA",
              },
              {
                "Job Title": "T-32 NIH Cardiovascular Disease Research Fellow",
                "Organization/Hospital Name": "Johns Hopkins Hospital",
                "Start Date": "2019",
                "End Date": "2020",
                City: "Baltimore",
                State: "Maryland",
                Country: "USA",
              },
              {
                "Job Title": "Fellow Cardiovascular Disease",
                "Organization/Hospital Name": "University of Miami",
                "Start Date": "2017",
                "End Date": "2019",
                City: "Miami",
                State: "Florida",
                Country: "USA",
              },
              {
                "Job Title": "Resident Physician",
                "Organization/Hospital Name": "Brown University",
                "Start Date": "2014",
                "End Date": "2017",
                City: "Providence",
                State: "Rhode Island",
                Country: "USA",
              },
              {
                "Job Title": "Assistant Director and Consultant",
                "Organization/Hospital Name":
                  "Center for Haitian Studies, Health & Human Services",
                "Start Date": "2014",
                "End Date": "2014",
                City: "Florida",
                State: "Florida",
                Country: "USA",
              },
              {
                "Job Title": "Research Coordinator/Clinical Educator",
                "Organization/Hospital Name":
                  "University of Miami Department of OB/GYN Research",
                "Start Date": "2008",
                "End Date": "2009",
                City: "Miami",
                State: "Florida",
                Country: "USA",
              },
              {
                "Job Title": "Medical Scribe",
                "Organization/Hospital Name":
                  "University of Miami Hospital Emergency Room",
                "Start Date": "2007",
                "End Date": "2008",
                City: "Miami",
                State: "Florida",
                Country: "USA",
              },
              {
                "Job Title": "Certified Nurses Aide",
                "Organization/Hospital Name": "Nursing Care Center of Miami",
                "Start Date": "2004",
                "End Date": "2008",
                City: "Miami",
                State: "Florida",
                Country: "USA",
              },
              {
                "Job Title": "Certified Nurses Aide",
                "Organization/Hospital Name": "The Palace at Home",
                "Start Date": "2004",
                "End Date": "2008",
                City: "Miami",
                State: "Florida",
                Country: "USA",
              },
            ],
          }},
          fileName: "New CV",
        },
      });
      return;
    }

    // If file is uploaded, process it first
    try {
      setIsProcessing(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload the file to the API
      const response = await apiClient.cv.uploadCV(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // Wait a moment to show completion
      setTimeout(() => {
        toast.success("CV uploaded successfully! Processing completed.");
        setIsProcessing(false);
        setUploadProgress(0);

        // Navigate to CV builder with the processed data
        navigate("/cv-builder", {
          state: {
            uploadedCVData: response,
            fileName: file.name,
          },
        });
      }, 1000);
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast.error("Failed to upload CV. Please try again.");
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className={styles.createCVPage}>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>
          {isProcessing ? (
            <div className={styles.processingState}>
              <h1 className={styles.processingTitle}>
                We are Processing, Please Wait
              </h1>
              <p className={styles.processingSubtitle}>
                Your file is currently being processed. This may take a moment.
                Please stay on this page until the process is complete.
              </p>

              {/* Progress Bar */}
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className={styles.progressText}>
                  {uploadProgress}% Complete
                </p>
              </div>

              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.cardHeader}>
                <h1 className={styles.title}>Build Professional CV</h1>
                <p className={styles.subtitle}>
                  Create professional CV that showcases expertise and
                  achievements
                </p>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.uploadSection}>
                  <h3 className={styles.uploadTitle}>
                    Upload Your Existing CV
                  </h3>

                  {file ? (
                    <div className={styles.fileSelected}>
                      <div className={styles.fileIcon}>
                        <span className={styles.fileType}>
                          {file.name.split(".").pop()?.toUpperCase() || "DOC"}
                        </span>
                      </div>
                      <div className={styles.fileInfo}>
                        <p className={styles.fileName}>{file.name}</p>
                        <p className={styles.fileSize}>
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                      <button
                        className={styles.removeFile}
                        onClick={removeFile}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`${styles.uploadArea} ${
                        dragActive ? styles.dragActive : ""
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        <div className={styles.uploadIcon}>
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <mask
                              id="mask0_212_2991"
                              style={{ maskType: "alpha" }}
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="48"
                              height="48"
                            >
                              <rect width="48" height="48" fill="#1472ED" />
                            </mask>
                            <g mask="url(#mask0_212_2991)">
                              <path
                                d="M13 38C10.505 38 8.38133 37.1323 6.629 35.397C4.87633 33.662 4 31.5412 4 29.0345C4 26.6655 4.81533 24.6117 6.446 22.873C8.077 21.1347 9.9925 20.2 12.1925 20.069C12.6412 17.1563 13.9808 14.75 16.2115 12.85C18.4422 10.95 21.0383 10 24 10C27.343 10 30.1787 11.1643 32.507 13.493C34.8357 15.8213 36 18.657 36 22V24H37.231C39.1463 24.0617 40.7533 24.7648 42.052 26.1095C43.3507 27.4545 44 29.0847 44 31C44 32.9617 43.3365 34.6187 42.0095 35.971C40.6825 37.3237 39.0383 38 37.077 38H26.231C25.3103 38 24.5417 37.6917 23.925 37.075C23.3083 36.4583 23 35.6897 23 34.769V23.1615L18.8 27.3385L17.3845 25.9615L24 19.346L30.6155 25.9615L29.2 27.3385L25 23.1615V34.769C25 35.077 25.1282 35.3592 25.3845 35.6155C25.6408 35.8718 25.923 36 26.231 36H37C38.4 36 39.5833 35.5167 40.55 34.55C41.5167 33.5833 42 32.4 42 31C42 29.6 41.5167 28.4167 40.55 27.45C39.5833 26.4833 38.4 26 37 26H34V22C34 19.2333 33.025 16.875 31.075 14.925C29.125 12.975 26.7667 12 24 12C21.2333 12 18.875 12.975 16.925 14.925C14.975 16.875 14 19.2333 14 22H12.923C11.0667 22 9.44867 22.6833 8.069 24.05C6.68967 25.4167 6 27.0667 6 29C6 30.9333 6.68333 32.5833 8.05 33.95C9.41667 35.3167 11.0667 36 13 36H18V38H13Z"
                                fill="#1472ED"
                              />
                            </g>
                          </svg>
                        </div>
                        <div
                          className={styles.browseBtn}
                          onClick={() =>
                            document.getElementById("fileInput")?.click()
                          }
                        >
                          Browse Files
                        </div>
                      </div>
                      <div className={styles.uploadContent}>
                        <p className={styles.uploadText}>
                          Select File or drag and drop here
                        </p>
                        <p className={styles.supportedFormats}>
                          Supported File (*.docx, *.pdf)
                        </p>
                      </div>

                      <input
                        id="fileInput"
                        type="file"
                        accept=".docx,.pdf"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        multiple={false}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.divider}>
                  <span>or</span>
                </div>

                <button
                  className={styles.createNewBtn}
                  onClick={handleCreateNewCV}
                  disabled={isProcessing}
                >
                  {file ? "Process CV & Continue" : "Create New CV"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
