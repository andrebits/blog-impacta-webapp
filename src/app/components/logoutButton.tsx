"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove os cookies no client
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    window.location.href = "/login";
  };

  return <Link href="#" onClick={(e) => {
            e.preventDefault(); 
            handleLogout();     
        }}>Logout</Link>;
}