
import ProductList from "@/app/components/page-ui/product-card";
import Menu from "@/app/components/page-ui/menu";
import Header from "@/app/components/page-ui/header";
import Cart from "@/app/components/page-ui/cart";

export default function App() {
  return (
    <main className="w-full flex min-h-screen flex-col items-center justify-between">
        <Header/>
       <Menu/>
      <ProductList/>
        <Cart/>

    </main>
  );
}
