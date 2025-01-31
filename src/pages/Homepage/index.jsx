import { Hero, CarouselWrapper, PlanPreview, CommunityPreview } from './components';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CarouselWrapper />
      <PlanPreview />
      <div>다음 컴포넌트</div>
      <CommunityPreview />
    </div>
  );
};

export default HomePage;
