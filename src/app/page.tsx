"use client";

import { useEffect, useState, useRef } from "react";

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
  }>({
    Fruit: [],
    Vegetable: [],
  });

  // Use ref to store timeout for each item
  const timeoutRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    setItems(initialData);
  }, []);

  const handleClick = (item: ObjectType) => {
    // Clear existing timeout if any (prevents duplicate items)
    if (timeoutRefs.current[item.name]) {
      clearTimeout(timeoutRefs.current[item.name]);
    }
    // Move item to the corresponding type block
    setItems((prevItems) => prevItems.filter((block) => block !== item));
    setMovedItems((prevMoved) => ({
      ...prevMoved,
      [item.type]: [...prevMoved[item.type], item],
    }));

    // Set timeout to move the item back to the main list after 5 seconds
    timeoutRefs.current[item.name] = setTimeout(() => {
      setMovedItems((prevMoved) => ({
        ...prevMoved,
        [item.type]: prevMoved[item.type].filter((block) => block !== item),
      }));
      setItems((prevItems) => [...prevItems, item]);
      delete timeoutRefs.current[item.name];
    }, 5000);
  };

  const handleReturn = (item: ObjectType) => {
    // Clear timeout if it is still running
    if (timeoutRefs.current[item.name]) {
      clearTimeout(timeoutRefs.current[item.name]);
      delete timeoutRefs.current[item.name];
    }
    // Move the item back to the list immediately when clicked in the columns
    setMovedItems((prevMoved) => ({
      ...prevMoved,
      [item.type]: prevMoved[item.type].filter((block) => block !== item),
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
