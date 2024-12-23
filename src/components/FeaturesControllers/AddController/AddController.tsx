"use client";
import { createFeature } from "@/libs/redux/features/systemFeatures/systemFeatures";
import { AppDispatch, RootState } from "@/libs/redux/store";
import { FeatureType } from "@/types/featureType";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function AddController() {
  const { features } = useSelector((state: RootState) => state.systemFeatures);
  const dispatch: AppDispatch = useDispatch();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addErrors, setAddErrors] = useState(false);

  const handleOpenAddModal = () => {
    setAddErrors(false);
    setIsAddModalOpen(true);
  };
  const handleCloseAddModal = () => {
    setAddErrors(false);
    setIsAddModalOpen(false);
  };

  const handleAddingNewFeature = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("featureName") as string;
    const description = formData.get("featureDescription") as string;

    const newFeature: FeatureType = {
      id: crypto.randomUUID(),
      name,
      description,
      enabled: false,
    };

    const featureAlreadyExists = features.find(
      (feature) => feature.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (featureAlreadyExists) {
      setAddErrors(true);
      return;
    }

    setAddErrors(false);
    dispatch(createFeature(newFeature));
    setIsAddModalOpen(false);
  };

  return (
    <>
      <button
        className="px-2 py-1 rounded-sm bg-blue-700 hover:bg-opacity-80"
        onClick={handleOpenAddModal}
      >
        Add
      </button>
      {isAddModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseAddModal();
            }
          }}
        >
          <div className="relative p-6 rounded-lg shadow-lg bg-[#1b1f23] overflow-hidden">
            <IoIosClose
              className="absolute top-0 start-0 text-xl text-red-500 hover:text-gray-200 hover:bg-red-500 cursor-pointer rounded-br-sm"
              onClick={handleCloseAddModal}
              data-testid="close-add-modal"
            />
            <h2 className="text-xl font-bold mb-4 text-center">
              Adding new feature
            </h2>
            <form
              onSubmit={(e) => handleAddingNewFeature(e)}
              className="max-w-52"
            >
              <input
                name="featureName"
                type="text"
                required
                maxLength={20}
                placeholder="feature name..."
                className="rounded-lg p-1 w-full  bg-[#0a0a0a] bg-opacity-80 "
              />
              {/* Error only happens if the user is trying to add a feature with the same name of existing one */}
              {addErrors && (
                <p className="text-red-500 text-sm">
                  This feature already exists
                </p>
              )}
              <textarea
                name="featureDescription"
                required
                maxLength={70}
                placeholder="feature description..."
                className="h-20 rounded-lg p-1 w-full my-2 bg-[#0a0a0a] bg-opacity-80 "
              />

              <button
                type="submit"
                className="bg-blue-500 w-full p-2 rounded-lg"
              >
                Add
              </button>
            </form>
            <p className="text-sm max-w-52 mt-2">
              *Feature name is limited to 20 characters maximum.
            </p>
            <p className="text-sm max-w-52">
              *Feature Description is limited to 70 characters maximum.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
