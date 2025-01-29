import { useCallback, useEffect, useRef } from 'react';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { Link } from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import PropTypes from 'prop-types';
import './style.css';

const TWEEN_FACTOR_BASE = 0.84;
const numberWithinRange = (number, min, max) => Math.min(Math.max(number, min), max);

const Carousel = ({ options, items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const setTweenFactor = useCallback(emblaApi => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach(slideIndex => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach(loopItem => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const opacity = numberWithinRange(tweenValue, 0, 1).toString();
        emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity);
  }, [emblaApi, tweenOpacity]);

  return (
    <div className="my-30 relative">
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {items.map((item, index) => (
              <div className="embla__slide" key={index}>
                <Link className="block relative" to={`/detail/${item.contentId}`}>
                  <img src={item.imageURL} alt={item.imageName} className="embla__slide__img " />
                  <span className="text-white text-10 font-semibold absolute bottom-10 left-10">
                    {item.imageName}
                  </span>
                </Link>
                <div className="mt-20 flex flex-col justify-center items-center">
                  <h3 className="font-bold text-24 flex justify-center">{item.title}</h3>
                  <span className="block font-semibold text-17 text-gray-7 mt-10">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};
export default Carousel;

Carousel.propTypes = {
  options: PropTypes.shape({
    align: PropTypes.string.isRequired,
    loop: PropTypes.bool.isRequired,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      imageName: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      contentId: PropTypes.string.isRequired,
    }),
  ),
};
