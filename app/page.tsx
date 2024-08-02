"use client"
import Link from "next/link"
import styles from "./page.module.css"
import Footer from "./components/Footer/Footer"

export default function Home() {
  return (
    <main className={styles.main + " " + styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroSubheading}>Web app</h2>
          <h1 className={styles.heroHeading}>
            Rusty<span className={styles.logoHighlighted}>Gym</span>
          </h1>
          <span className={styles.heroDescription}>
            Become better version of yourself.
          </span>
        </div>
      </section>
      <section className={styles.opportunities + " " + styles.container}>
        <div className={styles.opportunitiesGrid}>
          <div className={styles.opportunitiesItem}>
            <figure
              className={styles.opportunitiesIcon}
              id={styles.muscleIcon}
            ></figure>
            <h3 className={styles.opportunitiesHeading}>Muscle growth</h3>
            <div className={styles.opportunitiesDescription}>
              If you want to get bigger muscles with maximal effectiveness.
            </div>
          </div>

          <div className={styles.opportunitiesItem}>
            <figure className={styles.opportunitiesIcon} id={styles.weightIcon}>
              {" "}
            </figure>
            <h3 className={styles.opportunitiesHeading}>Weight loss</h3>
            <div className={styles.opportunitiesDescription}>
              Are you looking to best solution to lose weight? Speed up this
              process with our app.
            </div>
          </div>

          <div className={styles.opportunitiesItem}>
            <figure className={styles.opportunitiesIcon} id={styles.absIcon}>
              {" "}
            </figure>
            <h3 className={styles.opportunitiesHeading}>6-pack</h3>
            <div className={styles.opportunitiesDescription}>
              To have prominent 6-pack its important to have low body fat and
              trained core muscles.
            </div>
          </div>

          <div className={styles.opportunitiesItem}>
            <figure
              className={styles.opportunitiesIcon}
              id={styles.wideBackIcon}
            >
              {" "}
            </figure>
            <h3 className={styles.opportunitiesHeading}>Wide back</h3>
            <div className={styles.opportunitiesDescription}>
              Proper trainings and nutrition is key to grow wide back muscles
            </div>
          </div>

          <div className={styles.opportunitiesItem}>
            <figure className={styles.opportunitiesIcon} id={styles.armsIcon}>
              {" "}
            </figure>
            <h3 className={styles.opportunitiesHeading}>Big Arms</h3>
            <div className={styles.opportunitiesDescription}>
              To get big arms you need not only train biceps, but also take
              attention to your triceps, that makes 2/3 of arm width.
            </div>
          </div>

          <div className={styles.opportunitiesItem}>
            <figure
              className={styles.opportunitiesIcon}
              id={styles.strengthIcon}
            >
              {" "}
            </figure>
            <h3 className={styles.opportunitiesHeading}>Strength</h3>
            <div className={styles.opportunitiesDescription}>
              Power lifting is best solution to impove muscle power in effective
              way.
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
