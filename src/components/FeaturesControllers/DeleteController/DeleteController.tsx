"use client";
import { deleteFeatures } from "@/redux/features/systemFeatures/systemFeatures";
import { RootState } from "@/redux/store";
import { FeatureType } from "@/types/featureType";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteController() {
  const { features } = useSelector((state: RootState) => state.systemFeatures);
  const dispatch = useDispatch();

  const [checkedFeaturesToBeDeleted, setCheckedFeaturesToBeDeleted] = useState(
    [] as string[]
  );
  const [noFeaturesChecked, setNoFeaturesChecked] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setConfirmDeleteVisible(false);
    setIsDeleteModalOpen(false);
  };

  const handleCheckBoxChange = (id: string) => {
    if (checkedFeaturesToBeDeleted.includes(id)) {
      setCheckedFeaturesToBeDeleted(
        checkedFeaturesToBeDeleted.filter((featureId) => featureId !== id)
      );
    } else {
      setCheckedFeaturesToBeDeleted([...checkedFeaturesToBeDeleted, id]);
    }
  };

  const handleDeletingFeature = () => {
    dispatch(deleteFeatures({ IDs: checkedFeaturesToBeDeleted }));
    handleCloseDeleteModal();
  };

  const handleDeleteButtonClick = () => {
    if (checkedFeaturesToBeDeleted.length === 0) {
      setNoFeaturesChecked(true);
    } else {
      setNoFeaturesChecked(false);
      setConfirmDeleteVisible(true);
    }
  };

  return (
    <>
      <button
        className="px-2 py-1 rounded-sm bg-red-700 hover:bg-opacity-80"
        onClick={handleOpenDeleteModal}
      >
        Delete
      </button>
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseDeleteModal();
            }
          }}
        >
          <div className="relative p-6 rounded-lg shadow-lg bg-[#1b1f23] overflow-hidden">
            <IoIosClose
              className="absolute top-0 start-0 text-xl text-red-500 hover:text-gray-200 hover:bg-red-500 cursor-pointer rounded-br-sm"
              onClick={handleCloseDeleteModal}
            />
            <h2 className="text-xl font-bold mb-4 text-center">
              Deleting features
            </h2>
            <ul className="space-y-2">
              {features?.map((feature: FeatureType) => (
                <li key={feature.id}>
                  <label
                    htmlFor={feature.name}
                    className={`cursor-pointer flex justify-between items-center p-2 border border-gray-500 rounded-lg ${
                      confirmDeleteVisible ? "cursor-not-allowed" : ""
                    }`}
                  >
                    <span>{feature.name}</span>
                    <input
                      type="checkbox"
                      id={feature.name}
                      disabled={confirmDeleteVisible}
                      onChange={() => handleCheckBoxChange(feature.id)}
                    />
                  </label>
                </li>
              ))}
            </ul>
            {confirmDeleteVisible ? (
              <>
                <h4 className="text-center my-2">Are you sure?</h4>
                <div className="flex justify-between items-center">
                  <button
                    className="p-2 border border-gray-500 rounded-md"
                    onClick={() => setConfirmDeleteVisible(false)}
                  >
                    Go back
                  </button>
                  <button
                    className="p-2 bg-red-700 hover:bg-opacity-80 rounded-md"
                    onClick={handleDeletingFeature}
                  >
                    Yes
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  className="w-full bg-red-700 rounded-sm mt-2 hover:bg-opacity-80"
                  onClick={handleDeleteButtonClick}
                >
                  Delete
                </button>
                {noFeaturesChecked && (
                  <p className="text-red-500 text-sm max-w-40 mt-1 leading-4">
                    *Please select at least one feature to delete
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
