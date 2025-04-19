"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("language", value);
  };
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <Tabs 
      value={language} 
      onValueChange={handleLanguageChange}
      className={cn("w-[80px]")}
    >
      <TabsList className="h-[36px] rounded-[12px] bg-[#fafafa] shadow-none border-0 ring-0 ring-offset-0 !shadow-none p-[2px]">
        <TabsTrigger 
          value="en" 
          className="text-[15px] font-normal leading-[150%] rounded-[10px] h-[32px] py-0 px-[10px] data-[state=active]:bg-white data-[state=active]:text-[#343a3f] text-[#697077] shadow-none border-0 ring-0 ring-offset-0 !shadow-none"
        >
          EN
        </TabsTrigger>
        <TabsTrigger 
          value="ru" 
          className="text-[15px] font-normal leading-[150%] rounded-[10px] h-[32px] py-0 px-[10px] data-[state=active]:bg-white data-[state=active]:text-[#343a3f] text-[#697077] shadow-none border-0 ring-0 ring-offset-0 !shadow-none"
        >
          RU
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
