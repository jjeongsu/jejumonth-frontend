import { useCallback, useEffect, useRef } from 'react';
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons';
import { Link } from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import PNG_IMAGES from '@public/images/image';
import './style.css';

const TWEEN_FACTOR_BASE = 0.84;
const numberWithinRange = (number, min, max) => Math.min(Math.max(number, min), max);
// TODO wrapper로 분리
const items = [
  {
    title: '제주속 제주 휴애리 겨울 동백과 함께하는 여행',
    subtitle: 'T도 F만들어 버리는 아름다운 동백꽃 풍경',
    imageName: '서귀포시 자연생활공원',
    imageURL: PNG_IMAGES.carousel_1,
    contentId: 'CONT_000000000500707',
  },
  {
    title: '성산일출봉이 한눈에 보이는 제주도 대표 일출명소',
    subtitle: '<웰컴투 삼달리> 드라마속 제주를 찾는 여정',
    imageName: '서귀포시 오조포구',
    imageURL: PNG_IMAGES.carousel_2,
    contentId: 'CNTS_000000000020987',
  },
  {
    title: '메밀꽃과 라벤더를 한아름 품은 농장',
    subtitle: '꽃과 동물들에 둘러쌓인 힐링의 명소',
    imageName: '서귀포시 포선면 보롬왓',
    imageURL: PNG_IMAGES.carousel_3,
    contentId: 'CNTS_000000000020050',
  },
];

const Carousel = () => {
  const options = { align: 'center', loop: true };
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
