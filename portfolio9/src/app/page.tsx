"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import LanguageSwitcher from "@/components/ui/language-switcher";
import { useLocalization } from "@/lib/localization/LocalizationContext";
import { getLocalizedPath } from "@/lib/localization/helpers";

export default function Home() {
  const { t, isLoading, language } = useLocalization();
  const [activeItem, setActiveItem] = useState("work");
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText("design@nikipetrov.com");
    toast("Copied. Smooth move.", {
      description: "design@nikipetrov.com is on your clipboard — now go make something cool happen."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="w-full py-6 px-8 md:px-16 lg:px-24 bg-white">
        <div className="max-w-[800px] mx-auto flex justify-between items-center">
          {/* Left side - Name and nav links */}
          <div className="flex items-center">
            {/* Nikita Petrov group */}
            <div className="flex mr-[32px]">
              <Link
                href={getLocalizedPath("/", language)}
                className="text-[15px] leading-[150%] transition-colors duration-200 h-[36px] flex items-center justify-center px-[12px] rounded-[12px] font-normal text-[#343a3f] bg-white hover:bg-[#fafafa]"
                onClick={() => setActiveItem("home")}
              >
                Nikita Petrov
              </Link>
            </div>
            
            {/* Main navigation links grouped together */}
            <div className="flex space-x-0">
              <NavigationMenu>
                <NavigationMenuList className="space-x-0 flex gap-0">
                  {/* For the regular navigation links */}
                  {["about", "awards", "resume", "contact"].map((item) => (
                    <NavigationMenuItem key={item} className="mx-0 px-0">
                      <NavigationMenuLink asChild>
                        <Link 
                          href={getLocalizedPath(`/${item}`, language)}
                          onClick={() => setActiveItem(item)}
                          className="!px-[12px] text-[15px] leading-[150%] font-normal text-[#343a3f] transition-colors duration-200 h-[36px] flex items-center justify-center !rounded-[12px] bg-white hover:!bg-[#fafafa] mx-0"
                        >
                          {t(item)}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                  
                  {/* For the "More" dropdown trigger */}
                  <NavigationMenuItem className="mx-0 px-0">
                    <NavigationMenuTrigger className="!px-[12px] text-[15px] leading-[150%] font-normal text-[#343a3f] transition-colors duration-200 h-[36px] flex items-center justify-center !rounded-[12px] bg-white hover:!bg-[#fafafa] mx-0">
                      {t('more')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white p-4 rounded-[12px] shadow-md">
                      <div className="grid gap-4 w-[350px]">
                        {/* Writing */}
                        <NavigationMenuLink asChild>
                          <Link
                            href={getLocalizedPath("/writing", language)}
                            className="block p-3 hover:!bg-[#fafafa] rounded-[8px] transition-colors duration-200"
                            onClick={() => setActiveItem("writing")}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl">📝</span>
                              <div>
                                <h3 className="text-[15px] font-medium text-[#343a3f] mb-1">{t('writing')}</h3>
                                <p className="text-[13px] text-[#697077] leading-tight">
                                  Articles on UX, product design, and the messy middle — ideas, tools, and case studies to sharpen your process.
                                </p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        
                        {/* Volunteering */}
                        <NavigationMenuLink asChild>
                          <Link
                            href={getLocalizedPath("/volunteering", language)}
                            className="block p-3 hover:!bg-[#fafafa] rounded-[8px] transition-colors duration-200"
                            onClick={() => setActiveItem("volunteering")}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl">🤝</span>
                              <div>
                                <h3 className="text-[15px] font-medium text-[#343a3f] mb-1">{t('volunteering')}</h3>
                                <p className="text-[13px] text-[#697077] leading-tight">
                                  Designing for good — tools, apps, and projects that uplift communities and create meaningful impact.
                                </p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        
                        {/* Testimonials */}
                        <NavigationMenuLink asChild>
                          <Link
                            href={getLocalizedPath("/testimonials", language)}
                            className="block p-3 hover:!bg-[#fafafa] rounded-[8px] transition-colors duration-200"
                            onClick={() => setActiveItem("testimonials")}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl">💬</span>
                              <div>
                                <h3 className="text-[15px] font-medium text-[#343a3f] mb-1">{t('testimonials')}</h3>
                                <p className="text-[13px] text-[#697077] leading-tight">
                                  Mentor and team feedback on how I work, grow, and contribute — unfiltered and full of context.
                                </p>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          
          {/* Right side - Copy email button and Language Switcher */}
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleCopyEmail}
              className="font-[family-name:var(--font-geist-sans)] text-[15px] leading-[150%] bg-white text-[#697077] border border-[#f4f4f4] font-normal hover:bg-[#fafafa] hover:text-[#343a3f] hover:border-[#fafafa] transition-all duration-200 h-[36px] p-0 px-[12px] flex items-center justify-center shadow-none rounded-[12px] overflow-hidden cursor-pointer"
            >
              <span className="inline-flex items-center justify-center">{t('copyEmail')}</span>
            </Button>
            <LanguageSwitcher />
          </div>
            
          {/* Mobile menu button */}
          <button className="md:hidden ml-4 focus:outline-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21" stroke="#343a3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6H21" stroke="#343a3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 18H21" stroke="#343a3f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-8">
        {/* You can add your main content here */}
      </main>
    </div>
  );
}
