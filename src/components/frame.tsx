import { ReactNode } from 'react';

type Props ={
  children: ReactNode;
}

const Frame: React.FC<Props> =({children})=>{
  
  return(
    <>
      <div className="p-1 xl:w-1/2 lg:p-0 base:p-0 sm:p-0 xl:w-1/2 lg:w-1/2 base:w-5/6 sm:w-5/6 w-full ml-auto mr-auto ">
        {children}
      </div>

    </>
  )
}

export default Frame