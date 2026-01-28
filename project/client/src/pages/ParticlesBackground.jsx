
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
      fullScreen: false, 
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
