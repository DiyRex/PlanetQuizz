import Image from "next/image";
import Navbar from '@/components/navbar';
import QuizSection from '@/components/quizSection';
import Footer from "@/components/footer";


export default function Home() {
  return (
   <>
   <Navbar/>
   <QuizSection/>
   <Footer/>
   </>
  );
}
