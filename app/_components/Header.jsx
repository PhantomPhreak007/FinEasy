"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex bg-[#222224] justify-between items-center border- shadow-sm">
      <div className="flex flex-row items-center">
        <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
        <span className="text-[#0ef07b]  font-bold text-xl">Fin<span className="text-white" >Easy</span></span>
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className="flex gap-3  items-center">
          <Link href={"/dashboard"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button className="rounded-full bg-[#0ef07b] ">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
