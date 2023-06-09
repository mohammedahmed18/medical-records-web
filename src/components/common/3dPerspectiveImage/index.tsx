import React, { useCallback, useEffect, useRef } from 'react';

type Props = {
  children: React.ReactNode;
};
const ThreeDimensionalPerspectiveImage = (props: Props) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  const transform3d = useCallback((rX: number, rY: number) => {
    const elContainer = refContainer.current;
    if (!elContainer) return;
    // const elContent = elContainer.querySelector('.content');
    elContainer.style.transform = `rotateY(${rY}deg) rotateX(${-rX}deg)`;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(() => {
          const elContainer = refContainer.current;
          if (!elContainer) return;
          const { top: bodyTop, left: bodyLeft } =
            document.body.getBoundingClientRect();
          const { top: elTop, left: elLeft } =
            elContainer.getBoundingClientRect();
          const offX = elLeft - bodyLeft;
          const offY = elTop - bodyTop;

          const x = e.clientX - offX + 0;
          const y = e.clientY - offY + window.scrollY;

          const rY = map(x, 0, elContainer.clientWidth, -10, 10);
          const rX = map(y, 0, elContainer.clientHeight, -10, 10);

          transform3d(rX, rY);
          tickingRef.current = false;
        });
      }
    },
    [transform3d, refContainer]
  );

  const handleMouseEnter = useCallback(() => {
    const elContainer = refContainer.current;
    if (!elContainer) return;
    elContainer.style.transition = `none`;
  }, [refContainer]);

  const handleMouseLeave = useCallback(() => {
    window.requestAnimationFrame(() => {
      const elContainer = refContainer.current;
      if (!elContainer) return;
      elContainer.style.transition = `all 0.2s linear`;
      elContainer.style.transform = `rotateY(0deg) rotateX(0deg)`;
    });
  }, [refContainer]);

  useEffect(() => {
    const elContainer = refContainer.current;
    if (!elContainer) return;
    if (elContainer) {
      elContainer.addEventListener('mousemove', handleMouseMove);
      elContainer.addEventListener('mouseenter', handleMouseEnter);
      elContainer.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      elContainer.removeEventListener('mousemove', handleMouseMove);
      elContainer.removeEventListener('mouseenter', handleMouseEnter);
      elContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, refContainer]);

  return (
    <div ref={refContainer} className='perspective-image'>
      {props.children}
    </div>
  );
};

function map(
  x: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number
) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export default ThreeDimensionalPerspectiveImage;
