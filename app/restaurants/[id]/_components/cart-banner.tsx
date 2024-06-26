"use client";

import Cart from "@/app/_components/Cart";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatCurrency } from "@/app/_helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext, useState } from "react";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  if (!restaurantHasProductOnCart) return null;

  return (
    <div className="border-soliid fixed bottom-0 left-0 z-50 w-full border-t border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* PREÇO */}
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              / {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
            </span>
          </h3>
        </div>
        {/* BOTÃO */}

        <Button onClick={() => setIsCartOpen(true)}>Ver sacola</Button>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger>
            <Button>Ver sacola</Button>
          </SheetTrigger>
          <SheetContent className="w-[90vw]">
            <SheetHeader>
              <SheetTitle className="text-left">Sacola</SheetTitle>
            </SheetHeader>
            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
