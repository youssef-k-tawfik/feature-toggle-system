"use client";
import AddController from "./AddController/AddController";
import DeleteController from "./DeleteController/DeleteController";
import EditController from "./EditController/EditController";

export default function FeaturesControl() {
  return (
    <>
      <div className="py-2 flex justify-around items-center">
        <AddController />
        <DeleteController />
        <EditController />
      </div>
    </>
  );
}
