import { toast } from "sonner";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";
import { useRouter } from "next/navigation";

interface UseToggleFavoriteRestaurantProps {
  userId?: string;
  restaurantId: string;
  restaurantIsFavorite?: boolean;
}

const useToggleFavoriteRestaurant = ({
  userId,
  restaurantId,
  restaurantIsFavorite,
}: UseToggleFavoriteRestaurantProps) => {
  const router = useRouter();

  const handleFavoriteClick = async () => {
    if (!userId) return;
    try {
      await toggleFavoriteRestaurant(userId, restaurantId);

      toast(
        restaurantIsFavorite
          ? "Restaurante removido dos favoritos."
          : "Restaurante favoritado.",
        {
          action: {
            label: "Ver Favoritos",
            onClick: () => router.push("/my-favorite-restaurants"),
          },
        },
      );
    } catch (error) {
      toast.error("Erro ao favoritar restaurante.");
    }
  };
  return { handleFavoriteClick };
};

export default useToggleFavoriteRestaurant;
