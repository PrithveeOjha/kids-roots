function CollaborationCard() {

  const styles = {

    wrapper: {
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      padding: "0 8%"
    },

    /* 🎬 VIDEO BACKGROUND */
    video: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: -2
    },

    /* 🌫️ OVERLAY */
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(90deg, rgba(30,20,60,0.75) 0%, rgba(30,20,60,0.55) 45%, rgba(30,20,60,0.1) 75%)",
      zIndex: -1
    },

    content: {
      maxWidth: "650px",
      color: "white"
    },

    heading: {
      fontSize: "clamp(42px,5vw,70px)",
      lineHeight: "1.1",
      fontWeight: "700"
    },

    highlight: {
      color: "#b9a7ff"
    },

    paragraph: {
      marginTop: "25px",
      fontSize: "18px",
      lineHeight: "1.6",
      opacity: 0.95
    },

    buttons: {
      marginTop: "35px",
      display: "flex",
      gap: "20px",
      flexWrap: "wrap"
    },

    primaryBtn: {
      background: "#3aa67c",
      color: "white",
      border: "none",
      padding: "16px 28px",
      borderRadius: "12px",
      fontWeight: "600",
      cursor: "pointer"
    },

    secondaryBtn: {
      border: "2px solid white",
      background: "transparent",
      padding: "16px 28px",
      borderRadius: "12px",
      color: "white",
      fontWeight: "600",
      cursor: "pointer"
    }

  };

  return (

    <section style={styles.wrapper}>

      {/* 🎬 VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline style={styles.video}>
        <source src="/card2.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div style={styles.overlay}></div>

      {/* CONTENT */}
      <div style={styles.content}>

        <h1 style={styles.heading}>
          Parent & Child <span style={styles.highlight}>Collaboration</span><br/>
          Through Shared Activities
        </h1>

        <p style={styles.paragraph}>
          Strengthen emotional bonds through interactive games,
          shared learning journeys, and collaborative activities
          designed to grow together.
        </p>

        <div style={styles.buttons}>
          <button style={styles.primaryBtn}>Explore Activities</button>
          <button style={styles.secondaryBtn}>Learn More</button>
        </div>

      </div>

    </section>
  );
}

export default CollaborationCard;
