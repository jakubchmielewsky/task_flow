"use client"
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import {FiPlus, FiClock} from "react-icons/fi";
import SelectDropdown from "@/components/SelectDropdown";
import { useState } from "react";

export default function Page(){
    useAuthRedirect();
    const [workspace, setWorkspace] = useState<string|undefined>();
    const handleWorkspaceChange= (ws:string)=>{
        setWorkspace(ws);
    }

    return(
        <div className="bg-gray-100 h-screen">
            <nav className="w-full h-12 bg-white flex items-center px-2 text-gray-600 shadow-md justify-between">
                <div className="flex">
                    <h2 className="font-bold text-xl ">
                        Task Flow
                    </h2>
                    <SelectDropdown selected={workspace} onSelectedChange={handleWorkspaceChange} options={["Workspace","work2","Workspace","work2","Workspace","work2","Workspace","work2"]}/>
                    <button className="text-sm ml-2 hover:bg-gray-100 p-1 rounded-full"><FiPlus/></button>
                </div>
                <button className="flex text-sm items-center gap-2 hover:bg-gray-100 p-1 rounded-full"><FiClock/>Recent</button>
                
            </nav>
            <div>
                <aside>
                    <h2>Tables</h2>
                    <h2>Members</h2>

                    <div>
                        <p>user panel</p>
                    </div>
                </aside>
                <main>

                </main>
            </div>
        </div>
    )
}