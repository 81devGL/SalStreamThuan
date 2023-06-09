import React from "react";
import { Footer, Header } from "src/components";
import { useToken } from "src/hooks";
interface Props {
  children?: any;
}
function LayoutBasic({ children }: Props) {
 
  return (
    <>
      <Header />
      <div className="flex items-center justify-center mx-auto xl:mx-[200px] ">
        <div className=" w-full mt-14">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default LayoutBasic;
