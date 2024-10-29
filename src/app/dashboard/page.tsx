"use client"
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Page(){
    useAuthRedirect();

    return(
        <div className="bg-gray-200 h-screen">
            <div className="w-full h-12 bg-white">
                <nav className="flex">
                    <h2>
                        Task Flow
                    </h2>
                    <select>
                        <option value="">Worspace</option>
                    </select>
                    <button>Dodaj</button>
                    <button>Notifications</button>

                </nav>
            </div>
            <div>
                <aside>
                    <h2>Sables</h2>
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