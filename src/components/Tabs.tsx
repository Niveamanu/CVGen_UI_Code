import React from "react";
import styles from "./Tabs.module.scss";
import DownloadButton from "./DownloadButton";
import { toast } from "react-toastify";

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onDownload: () => void;
}

export default function Tabs({ activeTab, onTabChange,onDownload }: TabsProps) {
  const tabs = [
    { label: "CV Collection", value: "collection" },
    { label: "Draft CVs", value: "activities" },
    { label: "Archived CVs", value: "archived" },
  ];

  return (
    <div className={styles.tabsBarWrapper}>
      <nav className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={activeTab === tab.value ? styles.active : styles.tab}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      
      {/* Only show download button for CV Collection tab */}
      {activeTab === "collection" && (
        <DownloadButton 
          onClick={onDownload} 
        />
      )}
    </div>
  );
}
