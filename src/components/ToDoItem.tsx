import { ReactElement, RefObject, useState } from "react";
import DragIcon from '../assets/drag-icon.svg';
import CloseIcon from '../assets/close-icon.svg';
import { Reorder } from "framer-motion";
import { TaskProps } from "./ToDoCard";

interface ToDoItemProps {
   value: TaskProps;
   constraint?: RefObject<HTMLElement> | undefined
}
export default function ToDoItem({ value, constraint = undefined }: ToDoItemProps): ReactElement {
   const [isInputFocused, setIsInputFocused] = useState(false);

   const handleInputFocus = () => {
      setIsInputFocused(true);
   };

   const handleInputBlur = () => {
      setIsInputFocused(false);
   };

   return (
      <Reorder.Item
         dragTransition={{ bounceStiffness: 0, bounceDamping: 0 }}
         dragElastic={0}
         dragConstraints={constraint}
         value={value}
         as={"li"}
         className="bg-inherit"
      >
         <div className={`flex items-center py-2 pl-1 pr-4 group border-transparent border-t border-b ${isInputFocused ? 'border-slate-300' : ''}`}>
            <div className="flex items-center flex-grow gap-1">
               <img
                  src={DragIcon}
                  alt="Drag"
                  className="opacity-0 group-hover:opacity-60 hover:!opacity-100 cursor-move transition-all"
                  width={24}
                  height={24}
               />
               <input
                  type="checkbox"
                  className="min-w-4 min-h-4 border-[0.125rem] rounded-sm appearance-none cursor-pointer checked:bg-gray-500 border-gray-400 checked:border-transparent"
               />
               <input
                  type="text"
                  placeholder="Adicionar tarefa..."
                  autoFocus
                  className="outline-none ml-2 w-full text-base focus:bg-transparent"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
               />
            </div>
            <button className="w-6 h-6 flex justify-center items-center rounded-full opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-all hover:bg-gray-200">
               <img
                  src={CloseIcon}
                  alt="Close"
                  width={20}
                  height={20}
               />
            </button>
         </div>
      </Reorder.Item>
   );
}
