"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-center"
      closeButton={true}
      className="toaster group font-sans"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg font-sans",
          title: "group-[.toast]:font-semibold group-[.toast]:text-[#323F4B]",
          description: "group-[.toast]:font-normal group-[.toast]:text-[#323F4B]",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      style={
        {
          "--font-size-heading": "15px",
          "--line-height-heading": "1.5",
          "--font-weight-heading": "600",
          "--font-size-description": "15px",
          "--line-height-description": "1.5",
          "--font-weight-description": "400",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster } 