"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FormData } from "./product-form";

type ResultProps = { rating: number; comment: string; advice: string } | null;

interface AIMatchResultModalProps {
  result: ResultProps;
  outfit: FormData;
  isOpen: boolean;
  closeModal: () => void;
}

export function AIMatchResultModal({
  outfit,
  result,
  isOpen,
  closeModal,
}: AIMatchResultModalProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={closeModal}>
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-main-orange">
              AI Match Result
            </DialogTitle>
            <DialogDescription>
              See how well your outfit matches according to our AI.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 w-full">
            {result ? (
              <>
                <div className="flex items-center justify-center">
                  <Badge
                    variant={
                      result.rating >= 6
                        ? "green"
                        : result.rating >= 4
                        ? "default"
                        : "destructive"
                    }
                    className="text-lg p-2 px-6"
                  >
                    Match Score: {result.rating} / 10
                  </Badge>
                </div>
                <p className="text-center font-medium text-lg">
                  {result.comment}
                </p>
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Your Outfit:</h4>
                  <ul className="space-y-2">
                    {outfit.shirt?.type && outfit.shirt?.brand && (
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        Shirt: {outfit.shirt.type} by {outfit.shirt.brand}
                      </li>
                    )}
                    {outfit.trouser?.type && outfit.trouser?.brand && (
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        Trousers: {outfit.trousers.type} by{" "}
                        {outfit.trousers.brand}
                      </li>
                    )}
                    {outfit.shoes?.type && outfit.shoes?.brand && (
                      <li className="flex items-center">
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                        Shoes: {outfit.shoes.type} by {outfit.shoes.brand}
                      </li>
                    )}
                  </ul>
                </div>
                <p className="my-2 italic font-normal text-base">
                  *{result.advice}*
                </p>
              </>
            ) : (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
