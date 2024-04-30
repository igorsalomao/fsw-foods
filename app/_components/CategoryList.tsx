import { db } from "../_lib/prisma";
import CategoryItem from "./CategoryItem";

const CategoryList = async () => {
  const categories = await db.category.findMany({});
  return (
    <div className="flex overflow-x-scroll">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoryList;
