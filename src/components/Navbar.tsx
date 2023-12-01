"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });
import { Search, MessageCircle, MapPin,ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import {  useState } from "react";
import { filterInput } from "@/lib/utils";


export default function NavMenu() {
  const [inputValue,setInputValue] = useState("")
  const pathname = usePathname()
  const router = useRouter()
    let show = pathname.split('/').includes("post")
  const { data: session } = useSession();
  const src = session?.user?.image as string;

  const searchHandler = (e:React.KeyboardEvent)=>{
    const searchInput = inputValue.match(/[a-zA-Z]+/g)?.join(' ')
    const convertToProperParam = filterInput(searchInput)
    if(e.key=="Enter"){
      console.log(searchInput);
      router.push(`/search/${convertToProperParam}`)
    }
  }


  return (
    <div className={show ? "hidden" : ""}>
      <ul className="flex items-center  justify-between p-4 md:py-4 md:px-12">
        <Link href="/">
          <span>LOGO</span>
        </Link>
        <span className={`${!session
        ? "" : "customsm2:mr-auto customsm2:ml-10"
        } custommd:block hidden`}>
          <DropdownMenu>
            <DropdownMenuTrigger>
          <MapPin />
          <DropdownMenuContent>
            <DropdownMenuLabel>Current Location</DropdownMenuLabel>
            <DropdownMenuSeparator />
<DropdownMenuItem></DropdownMenuItem>
<DropdownMenuItem></DropdownMenuItem>
<DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </span>
        <div className=" md:flex md:w-[25%] hidden border  rounded-full py-0 px-2 items-center">
          <Search/>
          <Input
          onKeyDown={searchHandler}
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
          className="border-none" type="search" placeholder="Location" />
          <ChevronDown />
        </div>
        <div
          className={`${
            session ? "md:flex customsm2:hidden" : "sm:flex w-[55%]"
          }  border rounded-xl w-[40%] py-0 px-2 items-center`}
        >
          <Input
            className="border-none"
            type="search"
            placeholder="Find car,mobile Phone & more..."
          />
          <span>
            <Search className="md:block hidden" />
          </span>
        </div>
        {session ? (
          <div
            className={` flex items-center gap-6 ${fontMontserrat.className}`}
          >
            <Link href="/chat">
              <MessageCircle />
            </Link>
            <Link href="/post">
              <h2 className=" text-xl ">Sell</h2>
            </Link>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="z-1000">
                  <div className="h-10- w-10 rounded-full overflow-hidden">
                    <Image src={src} alt="dp" width={100} height={100} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href={`/${session.user?.name}`}>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                  </Link>
                  <Link href={`/my-ads`}>
                    <DropdownMenuItem>
                      <span>My Ads</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <button onClick={() => signOut({ callbackUrl: "/" })}>
                      Sign out
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6 text-xl">
            <button onClick={() => signIn()}>SignIn</button>
          </div>
        )}
      </ul>
      <div
          className={`${
            session ? "hidden customsm2:flex" : "hidden"
          }  border rounded-xl w-[80%] m-auto py-0 px-2 items-center`}
        >
          <Input
            className="border-none"
            type="search"
            placeholder="Find car,mobile Phone & more..."
          />
          <span>
            <Search/>
          </span>
        </div>
    </div>
  );
}
