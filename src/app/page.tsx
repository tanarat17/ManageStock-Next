import Image from "next/image";
import Sidebar from "./component/Sidebar"; 
import CardMenu from "./component/CardMenu";   
import VerticalCardGrid from "./component/Grid";    
export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen items-center justify-items-center p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      
      <header className="row-start-1"> {/* เพิ่ม header หากต้องการ */ }
        {/* Header content */}
      </header>

      <main className="flex flex-col sm:flex-row gap-8 row-start-2 w-full max-w-5xl items-center justify-center">
        {/* <Sidebar className="flex-shrink-0 w-full sm:w-1/3" /> */}

        
        <div className="flex items-center justify-center w-full sm:w-2/3"> {/* เพิ่ม div นี้ */}
          <VerticalCardGrid />
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* Footer content */}
      </footer>
    </div>
  );
}
