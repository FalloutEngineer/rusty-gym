import React from "react"

import styles from "./page.module.css"
import Footer from "../components/Footer/Footer"

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.aboutHeading}>About us</h1>

          <h3 className={styles.aboutSubheading}>Welcome to RustyGym!</h3>

          <p className={styles.aboutParagraph}>
            At RustyGym, we believe that fitness is more than just a
            routine—it&apos;s a lifestyle. Whether you&apos;re a seasoned
            athlete or just beginning your fitness journey, RustyGym is here to
            help you unlock your full potential and achieve your health and
            wellness goals.
          </p>
          <h3 className={styles.aboutSubheading}>Our Story</h3>

          <p className={styles.aboutParagraph}>
            RustyGym was founded with a simple mission: to make fitness
            accessible, enjoyable, and effective for everyone. We understand
            that starting and maintaining a fitness regimen can be challenging,
            and thatabou&apos;tSubheadings why we created a platform that
            combines cutting-edge technology with expert guidance to support you
            every step of the way.
          </p>
          <h3 className={styles.aboutSubheading}>What We Offer</h3>

          <p className={styles.aboutParagraph}>
            Personalized Workouts: Our app tailors workouts to your individual
            fitness level, goals, and preferences. Whether you want to build
            muscle, lose weight, or improve your overall health, we have a plan
            for you.
          </p>
          <h3 className={styles.aboutSubheading}>Expert Guidance</h3>

          <p className={styles.aboutParagraph}>
            RustyGym features programs and tips from certified trainers and
            nutritionists. Our experts are dedicated to helping you perform
            exercises correctly and safely, maximizing your results.
          </p>
          <h3 className={styles.aboutSubheading}>Progress Tracking</h3>

          <p className={styles.aboutParagraph}>
            Stay motivated by tracking your progress. Our app provides detailed
            analytics and reports, helping you see your improvements over time
            and keep pushing forward.
          </p>
          <h3 className={styles.aboutSubheading}>Community Support</h3>

          <p className={styles.aboutParagraph}>
            Join a community of like-minded individuals who share your fitness
            goals. Participate in challenges, share your achievements, and find
            motivation and support from fellow RustyGym users.
          </p>
          <h3 className={styles.aboutSubheading}>Flexible Scheduling</h3>

          <p className={styles.aboutParagraph}>
            We know life can be busy. Thatabou&apos;tSubheadings why our
            workouts are designed to fit into your schedule, whether you have 10
            minutes or an hour. No more excuses—just fitness that fits your
            life.
          </p>
          <h3 className={styles.aboutSubheading}>Our Commitment</h3>

          <p className={styles.aboutParagraph}>
            At RustyGym, weabou&apos;tSubheadingre committed to your success.
            Our team is constantly working to enhance our app with new features,
            workouts, and content to ensure you have the best possible
            experience. We value your feedback and strive to create a platform
            that meets your needs and exceeds your expectations.
          </p>

          <p className={styles.aboutParagraph}>
            Join us at RustyGym and take the first step towards a healthier,
            happier you. Download our app today and start your fitness journey
            with us!
          </p>
        </div>

        <Footer />
      </div>
    </main>
  )
}
