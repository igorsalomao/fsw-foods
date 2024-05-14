import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import Header from "../_components/Header";
import RestaurantItem from "../_components/restaurant-item";
import { HeartIcon } from "lucide-react";

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
  });
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>
        <div className="flex w-full flex-col gap-6">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))
          ) : (
            <div>
              <h3 className="mb-2 inline-flex items-center font-medium">
                Lojas guardadas no seu <HeartIcon size={16} className="ml-1" />
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                Toque em ♡ para salvar e encontrar aqui seus restaurantes
                favoritos.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyFavoriteRestaurants;
