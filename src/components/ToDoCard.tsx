import { Reorder } from "framer-motion"
import { ReactElement, useRef, useState } from "react"
import ToDoItem from "./ToDoItem"

//assets
import PinIcon from '../assets/pin-icon.svg'

export interface TaskProps {
   index: number,
   text: string,
   state: boolean
}

export default function TodoCard(): ReactElement {

   const [total, setTotal] = useState(0)
   const [complete, setComplete] = useState(0)

   const [tasks, setTasks] = useState<TaskProps[]>([])

   const constraintsRef = useRef<HTMLElement>(null);

   const addTask = () => {
      setTasks([...tasks, { index: tasks.length + 1, text: "Tarefa", state: true }])
      setTotal(tasks.length)
   }

   return (
      <div className="bg-white rounded-lg divide-y max-w-xl w-full shadow-md">
         <div className="overflow-y-auto max-h-[72vh]">
            <div className="px-4 pt-4 pb-3 flex items-center">
               <input
                  autoFocus
                  type="text"
                  className="font-sans text-base outline-none w-full"
                  placeholder="Título"
               />
               <button className="overflow-hidden rounded-full min-w-8 min-h-8 flex items-center justify-center">
                  <img
                     src={PinIcon}
                     className="opacity-60"
                     width="27"
                     height="27"
                     alt="pin list"
                  />
               </button>
            </div>

            {
               tasks.length > 0 &&
               <Reorder.Group
                  ref={constraintsRef}
                  as="ul"
                  className="flex flex-col overflow-hidden bg-white"
                  values={tasks}
                  axis="y"
                  onReorder={setTasks}
               >
                  {
                     tasks.map((task: TaskProps) => {
                        return (
                           <ToDoItem key={task.index} value={task} constraint={constraintsRef} />
                        )
                     })
                  }
               </Reorder.Group>
            }
            {
               tasks.length === 0 &&
               <div className="text-gray-500 text-base flex justify-center items-center h-full">
                  Nenhuma tarefa registrada
               </div>
            }

            <div className="text-gray-500 text-xs p-3 flex justify-end">
               <span>Completadas {complete} de {total}</span>
            </div>
         </div>

         <div className="p-6 flex gap-8 justify-between items-center overflow-hidden">

            <button
               className="px-3 py-2 bg-slate-200 rounded-md text-base/normal"
               onClick={() => addTask()}
            >
               Adicionar tarefa
            </button>
         </div>
      </div>
   )
}