import React from "react";
import styles from "./Toolbar.module.scss";
import { useUserRoles } from '../hooks/useUserRole';
import { bool } from "prop-types";

export default function Toolbar({ 
  onCreate, 
  onDownload
}: { 
  onCreate: () => void, 
  onDownload: () => void
}) {
  const { isAdmin,isUser ,loading: rolesLoading } = useUserRoles();
  const userType1 =  isAdmin ? 'AdminUser' : 'NormalUser';
  const userType2 = isUser ? 'NormalUser' : 'AdminUser';
  let showButton: boolean;
  if (userType1 === 'NormalUser' && userType2 === 'AdminUser') 
    {
     showButton = true;
    }
  else
    {
      showButton = false;
    }

  return (
    <div className={styles.toolbar}>
      <div className="col-7">
        <h1 style={{ fontSize: "20px" }}>Professional CV Generator</h1>
      </div>
      {!showButton && userType1 == "AdminUser" &&
      <button className={styles.createBtn} onClick={onCreate}>Create New CV</button>}
      {showButton   &&
      <button className={styles.createBtn} onClick={onCreate}>Create New CV</button>}
    </div>
  );
}
