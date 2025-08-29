"use client"
export default function getCookie(){
    
    return document.cookie
    .split("; ")
    .map((c) => c.split("="))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<string, string>);
      
}