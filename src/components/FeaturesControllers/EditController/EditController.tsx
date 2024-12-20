"use client";
import { editFeature } from "@/libs/redux/features/systemFeatures/systemFeatures";
import { RootState } from "@/libs/redux/store";
import { FeatureType } from "@/types/featureType";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function EditController() {
  const { features } = useSelector((state: RootState) => state.systemFeatures);
  const dispatch = useDispatch();

  const [selectingFeature, setSelectingFeature] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<FeatureType>(
    features[0]
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setSelectedFeature(features[0]);
    setSelectingFeature(true);
    setIsEditModalOpen(false);
  };

  const handleEditingFeature = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("featureName") as string;
    const description = formData.get("featureDescription") as string;
    const newEditedFeature = { ...selectedFeature, name, description };

    const id = selectedFeature.id;
    dispatch(editFeature({ id, newEditedFeature }));
    handleCloseEditModal();
  };

  return (
    <>
      <button
        className="px-2 py-1 rounded-sm outline outline-gray-500 hover:bg-gray-700"
        onClick={handleOpenEditModal}
      >
        Edit
      </button>
      {isEditModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseEditModal();
            }
          }}
        >
          <div className="relative p-6 rounded-lg shadow-lg bg-[#1b1f23] overflow-hidden">
            <IoIosClose
              className="absolute top-0 start-0 text-xl text-red-500 hover:text-gray-200 hover:bg-red-500 cursor-pointer rounded-br-sm"
              onClick={handleCloseEditModal}
            />
            <h2 className="text-xl font-bold mb-4 text-center">
              Edit a feature
            </h2>
            {selectingFeature ? (
              <>
                <ul className="space-y-2">
                  {features?.map((feature: FeatureType, index: number) => (
                    <li key={feature.id}>
                      <label
                        htmlFor={feature.name}
                        className="cursor-pointer flex justify-between items-center p-2 border border-gray-500 rounded-lg"
                      >
                        <span>{feature.name}</span>
                        <input
                          type="radio"
                          id={feature.name}
                          name="feature"
                          defaultChecked={
                            index === features.indexOf(selectedFeature)
                          }
                          onChange={() => setSelectedFeature(feature)}
                        />
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center gap-4">
                  <button
                    className="w-full rounded-sm mt-2 border border-gray-500  p-2"
                    onClick={handleCloseEditModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-full bg-gray-700 rounded-sm mt-2 hover:bg-opacity-80  p-2"
                    onClick={() => setSelectingFeature(false)}
                  >
                    Edit
                  </button>
                </div>
              </>
            ) : (
              <form
                onSubmit={(e) => handleEditingFeature(e)}
                className="max-w-52"
              >
                <input
                  name="featureName"
                  type="text"
                  required
                  maxLength={20}
                  placeholder="feature name..."
                  defaultValue={selectedFeature.name}
                  className="rounded-lg p-1 w-full  bg-[#0a0a0a] bg-opacity-80 "
                />

                <textarea
                  name="featureDescription"
                  required
                  maxLength={70}
                  placeholder="feature description..."
                  defaultValue={selectedFeature.description}
                  className="h-20 rounded-lg p-1 w-full my-2 bg-[#0a0a0a] bg-opacity-80 "
                />

                <div className="flex justify-between items-center gap-4">
                  <button
                    className="w-full rounded-sm mt-2 border border-gray-500 whitespace-nowrap p-2"
                    onClick={() => setSelectingFeature(true)}
                  >
                    Go Back
                  </button>
                  <button
                    className="w-full bg-blue-700 rounded-sm mt-2 hover:bg-opacity-80  p-2"
                    type="submit"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
