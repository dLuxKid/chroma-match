import ProductForm from "./product-form";

export default function ProductPage() {
  return (
    <div className="container mx-auto w-full min-h-dvh p-[5%] py-16">
      <h1 className="text-xl md:text-3xl font-bold mb-6 w-full text-center">
        Show Me your Steeze
      </h1>
      <ProductForm />
    </div>
  );
}
