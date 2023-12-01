import { categories } from "@/app/post/page"
import { filterUsername } from "@/lib/utils"
import Link from "next/link"

function CategoryHomePage() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 mb-12 mt-2">
    {categories.map(e=>(
        <Link href={`/category/${filterUsername(e.name)}`} key={e.name}>
      <span className="text-sm cursor-pointer">
        {e.name}
      </span>
        </Link>
    ))}
    </div>
  )
}

export default CategoryHomePage