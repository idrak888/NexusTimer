"use client";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import TableRow from "@/components/TableRow";
import { useState, useEffect } from "react";
import { Cube } from "@/interfaces/Cube";
import genId from "@/lib/genId";
import TableHeader from "@/components/TableHeader";
import ModalCreate from "@/components/ModalCreate";

export default function CubesPage() {
  const [cubes, setCubes] = useState<Cube[]>([]);
  const [isCreatingCube, setIsCreatingCube] = useState<boolean>(false);

  useEffect(() => {
    const cubesDB = window.localStorage.getItem("cubes");
    if (!cubesDB) {
      window.localStorage.setItem("cubes", "[]");
    }

    if (cubesDB) {
      const parseCubes = JSON.parse(cubesDB);
      setCubes(parseCubes);
    }
  }, []);

  const handleClick = () => {
    setIsCreatingCube(true);
  };

  const handleClose = () => {
    setIsCreatingCube(false);
  };

  const handleNewCube = (newCubelist: Cube[]) => {
    setCubes(newCubelist);
  };

  return (
    <>
      <div className="w-full md:w-10/12 mx-auto">
        {/* Header */}

        <h1 className="text-4xl font-bold mt-5">Welcome back!</h1>
        <p className="text-lg text-gray-400">
          Here&rsquo;s a list of your cubes!
        </p>

        {/* Filters table */}
        <div className="mt-8"></div>

        <div className="flex align-middle gap-3">
          {/* Options */}
          <InputText placeholder="Filter your cubes" />
          <Button disabled={false} handleClick={handleClick}>
            + Cube
          </Button>
          <Button disabled={true} handleClick={handleClick}>
            - Delete
          </Button>
        </div>

        <div>
          {/* table */}
          <div className="table w-full mt-4 border rounded-lg text-sm border-zinc-800">
            <TableHeader />
            <div className="table-row-group h-10 border-b border-zinc-800 text-white text-sm">
              {cubes.map((cube) => {
                return <TableRow key={genId()} cubeData={cube} />;
              })}
            </div>
          </div>
        </div>
        {isCreatingCube && (
          <ModalCreate
            handleClose={handleClose}
            handleAddCube={handleNewCube}
          />
        )}
      </div>
    </>
  );
}
