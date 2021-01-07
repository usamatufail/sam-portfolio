import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer />
    </>
  );
}

export default App;
