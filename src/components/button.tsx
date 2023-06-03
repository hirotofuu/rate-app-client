import { ReactNode } from 'react';


type Props = {
  children: ReactNode;
  onPush: VoidFunction;
};



const Button: React.FC<Props> = ({ children, onPush }) => {
  return (
    <>
      <button type="submit" onClick={onPush} className="w-full mt-4 p-2 text-white bg-indigo-500 rounded-md  focus:bg-indigo-600 focus:outline-none cursor-pointer">{children}</button>
    </>
  );
};

export default Button;