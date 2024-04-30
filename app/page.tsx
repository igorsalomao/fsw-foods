import Header from "./_components/Header";
import Search from "./_components/Search";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
    </>
  );
};

export default Home;
