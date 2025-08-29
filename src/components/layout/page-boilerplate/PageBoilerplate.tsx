import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";

import Carousel from "@/components/widgets/Carousel";
import AnimatedIntroSlide from "@/components/widgets/AnimatedIntroSlide";
import type { HeaderCtx } from "@/components/layout/HeroLayout";
import { FreeMode, Mousewheel } from "swiper/modules";
import BoxInfo from "@/components/UI/BoxInfo.tsx";

export type Card = { header: string; text: string; path: string, imgPath?: string };

type Props = {
  slidesConfig?: ReadonlyArray<Card>;
  children?: ReactNode;
  showCarousel?: boolean;
};

// ---- Constants ----------------------------------------------------

const INTRO_ANIM_MS = 1600; // how long slide intro animation runs
const CAROUSEL_DELAY_MS = 2000; // when to mount carousel after intro is done
export const SWIPER_BASE_PROPS = {
  modules: [FreeMode, Mousewheel],
  freeMode: true,
  direction: "horizontal" as const,
  mousewheel: { releaseOnEdges: true, sensitivity: 0.7 },
  allowTouchMove: true,
  simulateTouch: true,
  touchStartPreventDefault: false,
  passiveListeners: false,
  nested: true,
  resistanceRatio: 0.85,
  touchReleaseOnEdges: true,
  threshold: 6,
  watchOverflow: true,
  style: {
    width: "100%",
    touchAction: "pan-y" as const,
    WebkitOverflowScrolling: "touch",
    overscrollBehaviorX: "contain" as const,
  },
  breakpoints: {
    0:    { slidesPerView: 1, spaceBetween: 16, slidesOffsetBefore: 32, slidesOffsetAfter: 32 },
    600:  { slidesPerView: 2, spaceBetween: 20, slidesOffsetBefore: 32, slidesOffsetAfter: 32 },
    900:  { slidesPerView: 3, spaceBetween: 24, slidesOffsetBefore: 48, slidesOffsetAfter: 48 },
    1200: { slidesPerView: 3, spaceBetween: 24, slidesOffsetBefore: 80, slidesOffsetAfter: 80 },
    1400: { slidesPerView: 3, spaceBetween: 30, slidesOffsetBefore: 80, slidesOffsetAfter: 80 },
  },
} satisfies Parameters<typeof Carousel>[0]["swiperProps"];

// ---- Component ----------------------------------------------------

export default function PageBoilerplate({ slidesConfig, children, showCarousel = true}: Props) {
  const { showIntro } = useOutletContext<HeaderCtx>();

  const [introSlides, setIntroSlides] = useState(true); // initial slide entrance animation
  const [showContent, setShowContent] = useState(false);

  // keep timeouts cleaned up
  const timeouts = useRef<number[]>([]);
  const pushTimeout = (id: number) => timeouts.current.push(id);
  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, []);

  // after Swiper init, stop per-slide intro after fixed duration
  const handleAfterInit = useCallback(() => {
    pushTimeout(window.setTimeout(() => setIntroSlides(false), INTRO_ANIM_MS));
  }, []);

  // mount the carousel after the page intro finishes
  useEffect(() => {
    if (showIntro) {
      setShowContent(false);
      return;
    }
    pushTimeout(window.setTimeout(() => setShowContent(true), showCarousel ? CAROUSEL_DELAY_MS : 0));
  }, [showIntro]);

  // memoized slides (recompute only when data or intro flag changes)
  const slides = useMemo(
    () =>
      slidesConfig?.map((item, idx) => {
        const key = `${item.header}-${idx}`;
        return (
          <AnimatedIntroSlide runIntro={introSlides} key={key} idx={idx}>
            <BoxInfo header={item.header} path={item.path} text={item.text} imgPath={item.imgPath} />
          </AnimatedIntroSlide>
        );
      }),
    [introSlides]
  );

  if (!showContent) return null;

  return (
    <>
      {showCarousel && (
        <Box sx={{ display: "flex", flexGrow: 1, pt: { xs: "17vw", sm: "17vw", lg: "7vw" } }}>
          <Carousel
            swiperProps={{
              ...SWIPER_BASE_PROPS,
              onAfterInit: handleAfterInit,
            }}
            slides={slides ?? []}
          />
        </Box>
      )}
      {children}
    </>
  );
}
