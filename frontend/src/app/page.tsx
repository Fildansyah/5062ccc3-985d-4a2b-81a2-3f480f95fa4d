"use client";
import {
  IconCornerUpLeft,
  IconDeviceFloppy,
  IconPlus,
} from "@tabler/icons-react";
import { Table } from "./components";
import { useCallback, useState } from "react";
import { EmployeeData } from "./utils";
import { Employee, EmployeeColumn } from "./types/employee";

export default function Home() {
  const [employeeData, setEmployeeData] = useState<Employee[]>(EmployeeData);
  const [bodyData, setBodyData] = useState<Employee[]>([]);
  const columns: EmployeeColumn[] = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "position", label: "Position" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
  ];

  const handleAddRow = () => {
    const newRow: Employee = {
      firstName: "",
      lastName: "",
      position: "",
      phone: "",
      email: "",
    };
    setEmployeeData([newRow, ...employeeData]);
  };

  const handleDataChange = useCallback(
    (editedData: Employee[]) => {
      setBodyData(editedData);
    },
    [setBodyData],
  );

  return (
    <main className="flex h-screen flex-col p-5 gap-3">
      <div className="flex flex-row items-center justify-end p-3 gap-2">
        <IconPlus
          className="cursor-pointer hover:bg-gray-200 rounded-full p-[5px]"
          onClick={handleAddRow}
          size={32}
        />
        <IconDeviceFloppy
          onClick={() => console.log(bodyData)}
          className="cursor-pointer hover:bg-gray-200 rounded-full p-[5px]"
          size={32}
        />
        <IconCornerUpLeft
          className="cursor-pointer hover:bg-gray-200 rounded-full p-[5px]"
          size={32}
        />
      </div>

      <div className="h-full overflow-auto ">
        <Table
          columns={columns}
          data={employeeData}
          onDataChange={handleDataChange}
          setTableData={setEmployeeData}
        />
      </div>
    </main>
  );
}
