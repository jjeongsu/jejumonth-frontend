import { Hero, CarouselWrapper, PlanPreview, CommunityPreview, SearchPreview } from './components';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CarouselWrapper />
      <PlanPreview />
      <SearchPreview />
      <div>다음 컴포넌트</div>
      <CommunityPreview />
    </div>
  );
};

export default HomePage;