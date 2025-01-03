"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function InstallButton() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    setIsInstalled(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  useEffect(() => {
    setIsIOS(
      (navigator.userAgent.includes("iPhone") ||
        navigator.userAgent.includes("iPad") ||
        navigator.userAgent.includes("iPod") ||
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)) &&
        !(window as any).MSStream
    );
  }, []);

  useEffect(() => {
    function beforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallPrompt(event);
    }

    window.addEventListener("beforeinstallprompt", beforeInstallPrompt);

    return () =>
      window.removeEventListener("beforeinstallprompt", beforeInstallPrompt);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    const result = await (installPrompt as any).prompt();

    console.log(result.outcome);

    if (result.outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  const handleOpenAppClick = () => {
    window.location.href = "/";
  };

  if (isIOS)
    return (
      <>
        {isInstalled ? (
          <Button
            size="lg"
            onClick={handleOpenAppClick}
            className="bg-main-orange hover:bg-main-orange bg-opacity-70"
          >
            Open App
          </Button>
        ) : (
          <p className="text-main-orange font-semibold text-base text-center w-full">
            To install this app on your iOS device, tap the share button and
            then "Add to Home Screen" .
          </p>
        )}
      </>
    );

  return (
    <Button
      size="lg"
      onClick={isInstalled ? handleOpenAppClick : handleInstall}
      className="bg-main-orange hover:bg-main-orange bg-opacity-70"
    >
      {isInstalled ? "Open App" : "Install App"}
    </Button>
  );
}
