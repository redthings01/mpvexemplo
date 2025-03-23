// src/app/page.tsx
import ClientLayout from "./ClientLayout";
import Banner from "./components/Banner";
import AboutUs from "./components/AboutUs";
import BagList from "./components/Showcase";

export default function Home() {
  return (
    <ClientLayout>
      <Banner />
      <BagList />
      <AboutUs />
    </ClientLayout>
  );
}