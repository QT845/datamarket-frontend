import axios from "@/api/api";

/**
 * Get all domains
 * BE: GET /domains/all
 */
export const getAllDomains = async () => {
  const res = await axios.get("/domains/all");
  return res.data;
};