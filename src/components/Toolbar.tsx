import React from "react";
import styles from "./Toolbar.module.scss";
import { useUserRoles } from '../hooks/useUserRole';

export default function Toolbar({ 
  onCreate, 
  onDownload
}: { 
  onCreate: () => void, 
  onDownload: () => void
}) {
  // Completely disabled role checking to debug infinite re-renders
   const { isRegulatoryUser, isBusinessUser, loading: rolesLoading } = useUserRoles();
  const userType = isRegulatoryUser ? 'RegulatoryUser' : 'BusinessUser';
  // Show button for all users temporarily while debugging
  let showCreateButton: boolean;
  if(userType === 'RegulatoryUser')
  {
    showCreateButton = true;
  }
  else
  {
    showCreateButton = false;
  }
  //showCreateButton = true;
  
  // Future implementation (uncomment when roles are working and stable):
  // const { isRegulatoryUser, isBusinessUser, loading: rolesLoading } = useUserRoles();
  // const showCreateButton = !rolesLoading && !isRegulatoryUser;

  return (
    <div className={styles.toolbar}>
      <div className="col-7">
        <h1 style={{ fontSize: "20px" }}>Professional CV Generator</h1>
      </div>
      {showCreateButton && (
        <button className={styles.createBtn} onClick={onCreate}>
          Create New CV
        </button>
      )}
    </div>
  );
}
