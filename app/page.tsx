import CategoryList from "./_components/CategoryList";
import Header from "./_components/Header";
import Search from "./_components/Search";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>
    </>
  );
};

export default Home;
