// // // import { useCallback } from "react";
// // // import Particles from "react-tsparticles";
// // // import { loadFull } from "tsparticles";

// // // const ParticlesBackground = () => {
// // //   const particlesInit = useCallback(async (engine) => {
// // //     await loadFull(engine);
// // //   }, []);

// // //   return (
// // //     <Particles
// // //       id="tsparticles"
// // //       init={particlesInit}
// // //       options={{
// // //         fullScreen: { enable: false }, // IMPORTANT
// // //         background: {
// // //           color: {
// // //             value: "transparent",
// // //           },
// // //         },
// // //         particles: {
// // //           number: {
// // //             value: 60,
// // //             density: {
// // //               enable: true,
// // //               area: 800,
// // //             },
// // //           },
// // //           color: {
// // //             value: "#ffffff",
// // //           },
// // //           shape: {
// // //             type: "circle",
// // //           },
// // //           opacity: {
// // //             value: 0.5,
// // //           },
// // //           size: {
// // //             value: { min: 1, max: 3 },
// // //           },
// // //           links: {
// // //             enable: true,
// // //             distance: 150,
// // //             color: "#ffffff",
// // //             opacity: 0.3,
// // //             width: 1,
// // //           },
// // //           move: {
// // //             enable: true,
// // //             speed: 1.5,
// // //             outModes: "bounce",
// // //           },
// // //         },
// // //         interactivity: {
// // //           events: {
// // //             onHover: {
// // //               enable: true,
// // //               mode: "repulse",
// // //             },
// // //             resize: true,
// // //           },
// // //           modes: {
// // //             repulse: {
// // //               distance: 100,
// // //             },
// // //           },
// // //         },
// // //         detectRetina: true,
// // //       }}
// // //       style={{
// // //         position: "absolute",
// // //         inset: 0,
// // //         zIndex: 0,
// // //       }}
// // //     />
// // //   );
// // // };

// // // export default ParticlesBackground;
// // import Particles from "react-tsparticles";

// // const ParticlesBackground = () => {
// //   return (
// //     <Particles
// //       id="tsparticles"
// //       options={{
// //         fullScreen: { enable: false },
// //         background: {
// //           color: { value: "transparent" },
// //         },
// //         particles: {
// //           number: {
// //             value: 60,
// //             density: { enable: true, area: 800 },
// //           },
// //           color: { value: "#ffffff" },
// //           shape: { type: "circle" },
// //           opacity: { value: 0.4 },
// //           size: { value: { min: 1, max: 3 } },
// //           links: {
// //             enable: true,
// //             distance: 140,
// //             color: "#ffffff",
// //             opacity: 0.3,
// //             width: 1,
// //           },
// //           move: {
// //             enable: true,
// //             speed: 1.5,
// //             outModes: "bounce",
// //           },
// //         },
// //         interactivity: {
// //           events: {
// //             onHover: {
// //               enable: true,
// //               mode: "repulse",
// //             },
// //           },
// //           modes: {
// //             repulse: {
// //               distance: 100,
// //             },
// //           },
// //         },
// //         detectRetina: true,
// //       }}
// //       style={{
// //         position: "absolute",
// //         inset: 0,
// //         zIndex: 0,
// //       }}
// //     />
// //   );
// // };

// // export default ParticlesBackground;
// import { useEffect, useMemo } from "react";
// import Particles from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";
// import { tsParticles } from "@tsparticles/engine";

// const ParticlesBackground = () => {
//   useEffect(() => {
//     loadSlim(tsParticles);
//   }, []);

//   const options = useMemo(
//     () => ({
//       fullScreen: false, // IMPORTANT for hero background
//       background: {
//         color: "transparent",
//       },
//       fpsLimit: 60,
//       particles: {
//         number: {
//           value: 50,
//           density: {
//             enable: true,
//             area: 800,
//           },
//         },
//         color: {
//           value: "#ffffff",
//         },
//         links: {
//           enable: true,
//           color: "#ffffff",
//           distance: 150,
//           opacity: 0.3,
//         },
//         move: {
//           enable: true,
//           speed: 1,
//         },
//         opacity: {
//           value: 0.6,
//         },
//         size: {
//           value: 2,
//         },
//       },
//       detectRetina: true,
//     }),
//     []
//   );

//   return <Particles options={options} />;
// };

// export default ParticlesBackground;
import { useEffect, useMemo } from "react";
import Particles from "@tsparticles/react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  useEffect(() => {
    loadSlim(tsParticles);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: false, // REQUIRED for hero background
      background: {
        color: "transparent",
      },
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: "#7e9ee3",
        },
        links: {
          enable: true,
          color: "#66b0e5",
          distance: 150,
          opacity: 0.3,
        },
        move: {
          enable: true,
          speed: 1,
        },
        size: {
          value: 5,
        },
        opacity: {
          value: 0.6,
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ParticlesBackground;
