'use cliente'

import styles from "./CompanyIdentityVideo.module.css"


export function CompanyIdentityVideo(){
  return(
    <div className={styles.videoStatementContainer}>
      <div className={styles.videoStatementContent}>
        <div className={styles.videoBlock}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
            >
            <source src="/videos/videoCompanyIdentify.webm" type="video/webm" />
          </video> 
        </div>
        <div className={styles.videoStatementText}>
          <h2 className={styles.videoStatementParagraph}>Cada casa Vanglorian é projetada com atenção ao que realmente importa: cômodos com medidas adequadas, conforto no dia a dia e um projeto que prioriza o bem-estar de quem vai viver ali.</h2>
        </div>
      </div>
    </div>
  )
}