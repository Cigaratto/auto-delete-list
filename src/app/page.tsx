"use client";

import { useEffect, useState } from "react";

interface ObjectType {
  type: "Fruit" | "Vegetable";
  name: string;
}

export default function Home() {
  const initialData: ObjectType[] = [
    { type: "Fruit", name: "Apple" },
    { type: "Vegetable", name: "Broccoli" },
    { type: "Vegetable", name: "Mushroom" },
    { type: "Fruit", name: "Banana" },
    { type: "Vegetable", name: "Tomato" },
    { type: "Fruit", name: "Orange" },
    { type: "Fruit", name: "Mango" },
    { type: "Fruit", name: "Pineapple" },
    { type: "Vegetable", name: "Cucumber" },
    { type: "Fruit", name: "Watermelon" },
    { type: "Vegetable", name: "Carrot" },
  ];

  const [items, setItems] = useState<ObjectType[]>([]);
  const [movedItems, setMovedItems] = useState<{
    Fruit: ObjectType[];
    Vegetable: ObjectType[];
  }>({ Fruit: [], Vegetable: [] });

  useEffect(() => {
    setItems(initialData);
  }, []);

  const handleClick = (item: ObjectType) => {
    // Move item to the corresponding type block
    setItems((prevItems) => prevItems.filter((block) => block !== item));
    setMovedItems((preMoved) => ({
      ...preMoved,
      [item.type]: [...preMoved[item.type], item],
    }));

    // Set a timer to move the item back to the main list after 5 seconds
    setTimeout(() => {
      setMovedItems((preMoved) => ({
        ...preMoved,
        [item.type]: preMoved[item.type].filter((block) => block !== item),
      }));
      setItems((prevItems) => [...prevItems, item]);
    }, 5000);
  };

  // Move the item back to the list immediately when clicked in the columns
  const handleReturn = (item: ObjectType) => {
    setMovedItems((preMoved) => ({
      ...preMoved,
      [item.type]: preMoved[item.type].filter((block) => block !== item),
    }));
    setItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className="h-screen grid grid-cols-3 w-full gap-4 p-4">
      {/* List */}
      <div className="h-full border-2 px-4 py-4 rounded-lg border-black border-solid overflow-y-auto flex flex-col gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            className="cursor-pointer py-4 border-2 border-solid rounded-lg border-black text-center"
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Fruit Column */}
      <div className="border-2 h-full overflow-y-auto border-solid rounded-lg border-black">
        <div className="text-center font-semibold py-4 rounded-lg bg-orange-300 mb-4">
          Fruit
        </div>
        {movedItems.Fruit.map((item, index) => (
          <div
            key={index}
            onClick={() => handleReturn(item)}
            className="cursor-pointer mb-4 mx-2 border-2 py-4 border-solid rounded-lg border-black text-center"
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Vegetable Column */}
      <div className="border-2 h-full overflow-y-auto border-solid rounded-lg border-black">
        <div className="text-center py-4 font-semibold rounded-lg bg-green-300 mb-4">
          Vegetable
        </div>
        {movedItems.Vegetable.map((item, index) => (
          <div
            key={index}
            onClick={() => handleReturn(item)}
            className="cursor-pointer mb-4 mx-2 border-2 py-4 border-solid rounded-lg border-black text-center"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
