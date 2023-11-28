"use client"
import { CarFront,Bike,Smartphone,Home,Laptop2,Armchair,Dog,Book,Shirt } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type categories = {
  name : string
  icons : React.ReactNode
  selected : false | true
}

export const categories = [
  { name: "Cars",icons: <CarFront />, selected : false },
  { name: "Bikes", icons: <Bike />, selected : false },
  { name: "Mobiles", icons:<Smartphone />, selected : false },
  { name: "Properties",icons : <Home />, selected : false},
  { name: "Electronic and Appliances",icons : <Laptop2 />, selected : false },
  { name: "Furniture",icons : <Armchair />, selected : false },
  { name: "Pets",icons : <Dog />, selected : false },
  { name: "Books,Sports and Hobbies",icons : <Book />, selected : false },
  { name: "Fashion",icons : <Shirt />, selected : false },
]

function Sell() {
  const [category,setCategory] = useState(categories)
  const router = useRouter()
  const clickOnCategoryHandler = (name:string | undefined) =>{
    setCategory(
      (e)=>{
        e.map(ele=>{
          if(ele.name==name) {
            router.push(`/post/${name}`)
            return {...e,selected : true}
          }
        })
        return e
      }
    )
  }
  
  return (
    <>
    <Link href={`/`} className="text-[1.4rem] p-4">Home</Link>
      <main className=" md:w-3/5 sm:w-4/5 sm:m-auto">
        <h2 className="mt-4 customsm2:mt-8 text-center text-[1.1rem] font-medium">
          Choose A Category
        </h2>
        <div className=" flex flex-col mt-5 cursor-pointer">
          {categories.map((e, i) => (
            <div key={i} className="border p-2 flex gap-3" onClick={()=>clickOnCategoryHandler(e.name)} >
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
