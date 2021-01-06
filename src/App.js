import { OffScreenNav, Nav, SliderNav, Slider, OffScreenContent } from "components";

function App() {
  return (
    <>
      <div className="loading-overlay"></div>
      <OffScreenNav />
      <Nav />
      <Slider />
      <SliderNav />
      <OffScreenContent />
    </>
  );
}

export default App;
