"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { ChevronLeft, PlusIcon } from "lucide-react";
import Image from "next/image";
import { RefObject, useRef, useState } from "react";
import { Cropper, CropperRef, RectangleStencil } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { toast } from "sonner";
import { extractColors } from "extract-colors";
import { AIMatchResultModal } from "./ai-match-result";

const steps = ["Shirt", "Trousers", "Footwear"];

export type FormData = {
  [key: string]: {
    image: string | null;
    imageColors: {
      hex: string;
      hue: number;
      saturation: number;
      lightness: number;
    }[];
    type?: string;
    brand?: string;
    description?: string;
  };
};

const verifyAllFields = (formData: FormData) => {
  for (const key in formData) {
    if (!formData[key].image && !formData[key].imageColors.length) return false;
  }
  return true;
};

export default function ProductForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    shirt: {
      image: null,
      imageColors: [],
      type: "",
      brand: "",
      description: "",
    },
    trousers: {
      image: null,
      imageColors: [],
      type: "",
      brand: "",
      description: "",
    },
    footwear: {
      image: null,
      imageColors: [],
      type: "",
      brand: "",
      description: "",
    },
    // accessories: { image: null, type: "", brand: "", description: "" },
  });
  const cropperRef = useRef<CropperRef>(null);
  const [showCropper, setShowCropper] = useState(false);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<{
    rating: number;
    comment: string;
    advice: string;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    window.location.reload();
  };

  const onCrop = async () => {
    setLoading(true);

    try {
      if (cropperRef?.current) {
        // const res = await axios.post("/api/upload-image", {
        //   image: cropperRef.current.getCanvas()?.toDataURL() as string,
        // });
        const imageColors = await extractColors(
          cropperRef.current.getCanvas()?.toDataURL() as string
        );

        setShowCropper(false);

        setFormData((prev) => ({
          ...prev,
          [steps[currentStep].toLowerCase()]: {
            ...prev[steps[currentStep].toLowerCase()],
            imageColors,
            image: cropperRef.current?.getCanvas()?.toDataURL() as string,
          },
        }));
      }
    } catch (error) {
      console.log(error);
      return toast.error("An error occured while uploading the image");
    }

    setLoading(false);
  };

  const handleFileChange = (step: string, file: File | null) => {
    if (!file) return;

    if (!file.type.includes("image"))
      return toast.error("Please select images only");
    if (file.size > 10 * 1024 * 1024)
      return toast.error("Images cannot be larger than 10mb");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        [step.toLowerCase()]: {
          ...prev[step.toLowerCase()],
          image: reader.result as string,
        },
      }));

      setShowCropper(true);
    };
    reader.onerror = (err) => {
      console.error(err);
      return toast.error("An error occured while reading the image");
    };
  };

  const handleInputChange = (step: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [step.toLowerCase()]: {
        ...prev[step.toLowerCase()],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    if (!formData[steps[currentStep].toLowerCase()].image) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!verifyAllFields(formData)) return;

    setLoading(true);

    try {
      const data: FormData = formData;
      for (const key in formData) {
        data[key] = { ...formData[key], image: null };
      }

      const res = await axios.post("/api/submit", data);
      setResult(JSON.parse(res.data.data));
      setIsOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("An error occured while submitting the form");
    }

    setLoading(false);
  };

  return (
    <>
      {isOpen && (
        <AIMatchResultModal
          isOpen={isOpen}
          closeModal={closeModal}
          outfit={formData}
          result={result}
        />
      )}
      <Card className="w-full max-w-2xl mx-auto hover:scale-100">
        <CardHeader>
          <Progress
            value={((currentStep + 1) / steps.length) * 100}
            className="mb-4 h-2"
          />
          <CardTitle>{steps[currentStep]} Details</CardTitle>
        </CardHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <CardContent className="flex flex-col gap-4">
            <RenderFormFields
              step={steps[currentStep]}
              handleFileChange={handleFileChange}
              handleInputChange={handleInputChange}
              formData={formData}
              cropperRef={cropperRef}
              showCropper={showCropper}
              onCrop={onCrop}
            />
          </CardContent>
          <CardFooter className="flex gap-4 justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0 || loading}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button
                type="submit"
                disabled={loading}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="bg-main-orange hover:bg-main-orange bg-opacity-70 disabled:bg-main-orange/50 flex items-center justify-center"
              >
                {loading ? <Loader /> : "Submit"}
              </Button>
            ) : (
              <Button
                type="button"
                className="flex items-center justify-center"
                disabled={loading}
                onClick={handleNext}
              >
                {loading ? <Loader /> : "Next"}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </>
  );
}

const RenderFormFields = ({
  step,
  handleFileChange,
  handleInputChange,
  formData,
  showCropper,
  onCrop,
  cropperRef,
}: {
  step: string;
  handleFileChange: (step: string, File: File | null) => void;
  handleInputChange: (step: string, field: string, value: string) => void;
  formData: FormData;
  showCropper: boolean;
  onCrop: () => void;
  cropperRef: RefObject<CropperRef | null>;
}) => {
  const lowercaseStep = step.toLowerCase();

  if (showCropper)
    return (
      <div className="size-full max-w-xl max-h-[576px] mx-auto flex flex-col items-center gap-4 overflow-x-scroll">
        <p className="font-medium text-lg">Crop to Focus Colors</p>

        <Cropper
          ref={cropperRef}
          src={formData[lowercaseStep].image}
          stencilProps={{
            aspectRatio: 6 / 9,
            movable: true,
            resizable: true,
          }}
          stencilComponent={RectangleStencil}
          className="size-full aspect-[6/9] mx-auto"
        />

        <Button type="button" onClick={onCrop}>
          crop
        </Button>
      </div>
    );

  return (
    <>
      <div className="flex mb-4">
        <Label
          htmlFor={`${lowercaseStep}-image`}
          className="size-40 flex-center transition-all duration-300 active:scale-95 active:opacity-25 cursor-pointer rounded-2xl overflow-hidden"
        >
          {formData[lowercaseStep].image ? (
            <Image
              src={formData[lowercaseStep].image}
              alt="cover image"
              width={100}
              height={100}
              aria-required
              className="size-40 object-center"
            />
          ) : (
            <div className="flex items-center justify-center flex-col size-40 bg-transparent border border-dashed border-main-orange rounded-2xl overflow-hidden">
              <span className="text-2xl text-main-orange font-normal">
                <PlusIcon />
              </span>
              <p className="text-base font-medium">Add Image</p>
            </div>
          )}
          <Input
            id={`${lowercaseStep}-image`}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) =>
              handleFileChange(step, e.target.files ? e.target.files[0] : null)
            }
          />
        </Label>
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${lowercaseStep}-type`}>Type/Style</Label>
        <Input
          id={`${lowercaseStep}-type`}
          value={formData[lowercaseStep].type}
          placeholder="e.g. T-shirt, Polo, blazer, etc."
          onChange={(e) => handleInputChange(step, "type", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${lowercaseStep}-brand`}>Brand/Label</Label>
        <Input
          id={`${lowercaseStep}-brand`}
          value={formData[lowercaseStep].brand}
          placeholder="e.g. Gucci, Nike, Adidas, etc."
          onChange={(e) => handleInputChange(step, "brand", e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`${lowercaseStep}-description`}>Tell me more</Label>
        <Textarea
          id={`${lowercaseStep}-description`}
          className="h-40"
          placeholder="Describe the gender, fit size, condition, item, color, fabric, material, etc."
          value={formData[lowercaseStep].description}
          onChange={(e) =>
            handleInputChange(step, "description", e.target.value)
          }
        />
      </div>
    </>
  );
};
