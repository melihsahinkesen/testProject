import Header from "../src/layouts/Header";
import Item from "../src/components/Item";

const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <Item />
        </div>
      </div>
    </>
  );
};

export default App;
