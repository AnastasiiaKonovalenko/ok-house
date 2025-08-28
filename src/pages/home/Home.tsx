import { Box, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import IntroOverlay from "@/features/intro/IntroOverlay";
import { HeaderCtx } from "@/components/layout/HeroLayout.tsx";
import { useEffect, useState } from "react";
import Carousel from "@/components/widgets/Carousel.tsx";
import BoxInfo from "@/pages/home/segments/BoxInfo.tsx";
import { FreeMode, Mousewheel } from "swiper/modules";
import AnimatedIntroSlide from "@/components/widgets/AnimatedIntroSlide.tsx";

const whatWeAre = [
  {
    header: "Mission",
    text: "We would love to arrange a meeting sometime this week, at a time that is most convenient for you during regular business hours. The only restriction is Wednesday, April 23, when we are available only until 12:00."
  },
  {
    header: "Projects",
    text: ""
  },
  {
    header: "Design studio",
    text: "We are an academically grounded design studio driven by methodology and business logic."
  }
]

export default function Home() {
  const { setHeaderVisible } = useOutletContext<HeaderCtx>();
  const [showIntro, setShowIntro] = useState(true);
  const [introSlides, setIntroSlides] = useState(true);
  const [showCarousel, setShowCarousel] = useState(false);

  const handleAfterInit = () => {
    const INTRO_MS = 1600; // длина анимации с запасом
    setTimeout(() => setIntroSlides(false), INTRO_MS);
  };

  useEffect(() => {
    if(showIntro) {
      return;
    }

    const x = setTimeout(() => setShowCarousel(true), 2000);
    return () => clearTimeout(x);
  }, [showIntro]);

  return (
    <Box sx={{ display: "flex", flexGrow: 1, pt: { xs: "17vw", sm: "17vw", lg: "7vw" } }}>
      {showIntro && (
        <IntroOverlay
          onShowHeader={() => setHeaderVisible(true)}
          onFinish={() => setShowIntro(false)}
        />
      )}
      {showCarousel && (
        <Carousel
          swiperProps={{
            onAfterInit: handleAfterInit,
            modules: [Mousewheel, FreeMode],
            freeMode: true,
            direction: "horizontal",
            mousewheel: { releaseOnEdges: true, sensitivity: 0.7 },
            style: { width: "100%" },
            breakpoints: {
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
                slidesOffsetBefore: 32,
                slidesOffsetAfter: 32,
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesOffsetBefore: 32,
                slidesOffsetAfter: 32,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 24,
                slidesOffsetBefore: 48,
                slidesOffsetAfter: 48,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 24,
                slidesOffsetBefore: 80,
                slidesOffsetAfter: 80,
              },
              1400: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesOffsetBefore: 80,
                slidesOffsetAfter: 80,
              },
            },
          }}
          slides={whatWeAre.map((x, idx) => (
            <AnimatedIntroSlide runIntro={introSlides} key={idx} idx={idx}>
              <BoxInfo>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    mb: "6vw",
                    fontSize: { xs: "1.3rem", md: "1.4rem" },
                  }}
                >
                  {x.header}
                </Typography>

                <Typography
                  sx={{
                    textTransform: "uppercase",
                    lineHeight: "190%",
                    fontSize: { xs: "0.85rem", md: "1rem" },
                  }}
                >
                  {x.text}
                </Typography>
              </BoxInfo>
            </AnimatedIntroSlide>
          ))}
        />
      )}
    </Box>
  );
}
