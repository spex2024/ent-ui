import React from "react";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import {ShoppingCartIcon} from "lucide-react";

export default function MealCard({meal ,openModal , key}) {
    console.log(meal)
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none w-full"
            key={key}
        >
            <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src={meal.imageUrl}
                width={250}
            />
            <CardFooter className="justify-between before:bg-white/90 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_5px)] shadow-small ml-1 z-10 bg-white/50">
                <div className="flex items-center gap-2">

                <p className="text-sm text-black font-bold">{meal.main.name}</p>
                    <Button className="text-tiny text-white  " variant="flat" color="" radius="md" isIconOnly  onClick={()=>openModal(meal)}>
                        <ShoppingCartIcon size={20}  color={'#000'}/>
                    </Button>

                </div>

            </CardFooter>
        </Card>
    );
}
