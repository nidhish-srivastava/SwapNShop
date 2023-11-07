import { CarFront,Bike,Smartphone,Home,Laptop2,Armchair,Dog,Book,Shirt } from "lucide-react";

const categories = [
  { name: "Cars", icons: <CarFront /> },
  { name: "Bikes", icons: <Bike /> },
  { name: "Mobiles", icons:<Smartphone /> },
  { name: "Properties",icons : <Home />},
  { name: "Electronic and Appliances",icons : <Laptop2 /> },
  { name: "Furniture",icons : <Armchair /> },
  { name: "Pets",icons : <Dog /> },
  { name: "Books,Sports and Hobbies",icons : <Book /> },
  { name: "Fashion",icons : <Shirt /> },
];

function Sell() {
  return (
    <>
      <main className=" md:w-3/5 sm:w-4/5 sm:m-auto">
        <h2 className="mt-4 customsm2:mt-8 text-center text-[1.1rem] font-medium">
          Choose A Category
        </h2>
        <div className=" flex flex-col mt-5 cursor-pointer">
          {categories.map((e, i) => (
            <div key={i} className="border p-2 flex gap-3">
              <span aria-hidden="true">{e.icons}</span>
              <span>{e.name}</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Sell;
