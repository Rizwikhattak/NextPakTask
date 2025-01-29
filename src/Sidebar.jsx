import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons from Lucide
import { Button } from "@/components/ui/button"; // ShadCN button

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <Button
        variant="outline"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          <h2 className="text-lg font-semibold">Sidebar</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-100">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-100">
                Profile
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay (closes sidebar when clicked outside) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
