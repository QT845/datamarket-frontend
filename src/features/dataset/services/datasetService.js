import axios from "@/api/api";

/**
 * Create dataset (metadata)
 * BE: POST /provider/datasets/create
 */
export const createDataset = async (data) => {
  const res = await axios.post("/provider/datasets/create", data);
  return res.data;
};

/**
 * Upload dataset version
 * BE: POST /provider/datasets/{datasetId}/versions/upload
 */
export const uploadDatasetVersion = async (datasetId, formData) => {
  const res = await axios.post(
    `/provider/datasets/${datasetId}/versions/upload`,
    formData,
  );
  return res.data;
};
