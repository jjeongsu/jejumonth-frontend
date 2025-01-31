import { Hero, CarouselWrapper, PlanPreview, SearchPreview } from './components';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CarouselWrapper />
      <PlanPreview />
      <SearchPreview />
      <div>다음 컴포넌트</div>
    </div>
  );
};

export default HomePage;
