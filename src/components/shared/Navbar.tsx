"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { Montserrat } from "next/font/google";
const fontMontserrat = Montserrat({ subsets: ["latin"] });
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavMenu() {
  const { data: session } = useSession();
  const src = session?.user?.image as string;
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <ul className="flex items-center  justify-between p-4 md:py-4 md:px-12">
        <Link href="/" >
          <span>LOGO</span>
        </Link>
        {session ? (
      
          <div
            className={` flex items-center gap-6 ${fontMontserrat.className}`}
          >
            <Link href="/sell">
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
                      <DropdownMenuLabel>
                        {session.user?.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                        <Link href={`${session.user?.name}`}>
                      <DropdownMenuItem>
                          View Profile
                      </DropdownMenuItem>
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
    </div>
  );
}
