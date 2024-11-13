export const hypnoticV1 = {
  background: `
      radial-gradient(50% 50% at 100% 0, #ceeefd 0% 5%, #ffffff 6% 15%, #ceeefd 16% 25%, #ffffff 26% 35%, #ceeefd 36% 45%, #ffffff 46% 55%, #ceeefd 56% 65%, #ffffff 66% 75%, #ceeefd 76% 85%, #ffffff 86% 95%, #0000 96%),
      radial-gradient(50% 50% at 0 100%, #ceeefd 0% 5%, #ffffff 6% 15%, #ceeefd 16% 25%, #ffffff 26% 35%, #ceeefd 36% 45%, #ffffff 46% 55%, #ceeefd 56% 65%, #ffffff 66% 75%, #ceeefd 76% 85%, #ffffff 86% 95%, #0000 96%),
      radial-gradient(50% 50%, #ceeefd 0% 5%, #ffffff 6% 15%, #ceeefd 16% 25%, #ffffff 26% 35%, #ceeefd 36% 45%, #ffffff 46% 55%, #ceeefd 56% 65%, #ffffff 66% 75%, #ceeefd 76% 85%, #ffffff 86% 95%, #0000 96%),
      radial-gradient(50% 50%, #ceeefd 0% 5%, #ffffff 6% 15%, #ceeefd 16% 25%, #ffffff 26% 35%, #ceeefd 36% 45%, #ffffff 46% 55%, #ceeefd 56% 65%, #ffffff 66% 75%, #ceeefd 76% 85%, #ffffff 86% 95%, #0000 96%) 35px 35px
    `,
  backgroundSize: "70px 70px",
  backgroundColor: "#ceeefd",
};

export const netV2 = {
  background: `
            radial-gradient(35.36% 35.36% at 100% 25%, #0000 66%, #ffffff 68% 70%, #0000 72%) 35px 35px / calc(2*35px) calc(2*35px),
            radial-gradient(35.36% 35.36% at 0 75%, #0000 66%, #ffffff 68% 70%, #0000 72%) 35px 35px / calc(2*35px) calc(2*35px),
            radial-gradient(35.36% 35.36% at 100% 25%, #0000 66%, #ffffff 68% 70%, #0000 72%) 0 0 / calc(2*35px) calc(2*35px),
            radial-gradient(35.36% 35.36% at 0 75%, #0000 66%, #ffffff 68% 70%, #0000 72%) 0 0 / calc(2*35px) calc(2*35px),
            repeating-conic-gradient(#d4e0f9 0 25%, #0000 0 50%) 0 0 / calc(2*35px) calc(2*35px),
            radial-gradient(#0000 66%, #ffffff 68% 70%, #0000 72%) 0 calc(35px/2) / 35px 35px
        `,
  backgroundColor: "#d4e0f9",
};

export const snakesStyle = {
  background: `
            conic-gradient(at 62.5% 12.5%, #ffffff 25%, #0000 0) calc(35px/-8) calc(35px/2),
            conic-gradient(at 62.5% 12.5%, #ffffff 25%, #0000 0) calc(-3*35px/8) calc(35px/4),
            conic-gradient(at 87.5% 62.5%, #ffffff 25%, #0000 0) calc(3*35px/8) calc(35px/4),
            conic-gradient(at 87.5% 62.5%, #ffffff 25%, #0000 0) calc(35px/-8) 0,
            conic-gradient(at 25% 12.5%, #ffffff 25%, #0000 0) 0 calc(35px/-4),
            conic-gradient(at 25% 12.5%, #ffffff 25%, #0000 0) calc(35px/-4) 0,
            conic-gradient(at 87.5% 87.5%, #ffffff 25%, #0000 0) calc(35px/8) 0 #fef3c7`,
  backgroundSize: "35px 35px",
};

export const barsStyle = {
  background: `
            linear-gradient(135deg, #0000 20.5%, #ffffff 0 29.5%, #0000 0),
            linear-gradient(45deg, #0000 8%, #ffffff 0 17%, #0000 0 58%) 19px 0,
            linear-gradient(135deg, #0000 8%, #ffffff 0 17%, #0000 0 58%, #ffffff 0 67%, #0000 0),
            linear-gradient(45deg, #0000 8%, #ffffff 0 17%, #0000 0 58%, #ffffff 0 67%, #0000 0 83%, #ffffff 0 92%, #0000 0),
            #befadf`,
  backgroundSize: `38px 38px`,
};

export const dotsStyle = {
  backgroundImage: `
    radial-gradient(farthest-side at -33.33% 50%, transparent 52%, #befadf 54% 57%, transparent 59%) 0 calc(56px/2),
    radial-gradient(farthest-side at 50% 133.33%, transparent 52%, #befadf 54% 57%, transparent 59%) calc(56px/2) 0,
    radial-gradient(farthest-side at 133.33% 50%, transparent 52%, #befadf 54% 57%, transparent 59%),
    radial-gradient(farthest-side at 50% -33.33%, transparent 52%, #befadf 54% 57%, transparent 59%)`,
  backgroundColor: "#ffffff",
  backgroundSize: "calc(56px/4.667) 56px, 56px calc(56px/4.667)",
};
const randomStyleChoose = () => {
  const styles = [hypnoticV1, netV2, barsStyle];
  return styles[Math.floor(Math.random() * styles.length)];
};

export const randomStyle = randomStyleChoose();
