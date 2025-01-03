import hero from "@/assets/images/hero.webp";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Check, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full p-[5%]">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center gap-6 md:gap-8">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Match Your Clothes with AI
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Upload images of your clothes and let our AI tell you if
                they&apos;re a perfect match. Style has never been so easy.
              </p>

              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-main-orange hover:bg-main-orange bg-opacity-70"
                >
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <Image
                alt="Fashion Match App"
                className="size-full overflow-hidden rounded-xl object-cover object-center sm:w-full max-w-[500px] max-h-[500px]"
                src={hero}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full p-[5%]">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            Try It Now
          </h2>
          <Card className="w-full max-w-3xl mx-auto hover:scale-100">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700">
                  <Camera className="h-10 w-10 text-gray-500 dark:text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-center">
                  Upload Your Clothes
                </h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Drag and drop or click to upload images of the clothes you
                  want to match
                </p>
                <Link href={"/product"} className="flex w-full">
                  <Button
                    size="lg"
                    className="bg-main-orange hover:bg-main-orange bg-opacity-70 w-full"
                  >
                    Upload Images
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="w-full p-[5%]" id="features">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Zap className="h-10 w-10 text-primary" />
                <h3 className="text-2xl font-semibold">Instant Analysis</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get immediate feedback on your clothing combinations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Sparkles className="h-10 w-10 text-primary" />
                <h3 className="text-2xl font-semibold">AI-Powered Matching</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our advanced AI ensures accurate and stylish matches
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <Check className="h-10 w-10 text-primary" />
                <h3 className="text-2xl font-semibold">Personal Style Guide</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get personalized recommendations based on your wardrobe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full p-[5%]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Start Matching Today
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join thousands of fashion-forward users and revolutionize your
                wardrobe
              </p>
            </div>
            <Button
              size="lg"
              className="bg-main-orange hover:bg-main-orange bg-opacity-70"
            >
              Download the App
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
