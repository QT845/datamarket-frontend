import { useState } from "react";
import {
  createDataset,
  uploadDatasetVersion,
} from "@/features/dataset/services/datasetService";
import { useGetAllDomains } from "@/features/dataset/hooks/useDomain";

export default function CreateAndUploadDatasetForm() {
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    domainId: "",
  });
  const [versionData, setVersionData] = useState({
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const {
    domains,
    loading: domainsLoading,
    error: domainsError,
  } = useGetAllDomains();

  async function handleSubmit() {
    try {
      setLoading(true);

      if (!metadata.name || !metadata.description || !metadata.domainId) {
        throw new Error("Please fill in all metadata fields.");
      }

      if (!versionData.file) {
        throw new Error("Please select a file to upload.");
      }

      const res = await createDataset(metadata);
      const datasetId = res.data.id;

      const formData = new FormData();
      formData.append("file", versionData.file);

      await uploadDatasetVersion(datasetId, formData);

      setSuccess("Dataset created and version uploaded successfully!");
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Create and Upload Dataset</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div>
        <input
          type="text"
          placeholder="Dataset Name"
          value={metadata.name}
          onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
        />
      </div>

      <div>
        <textarea
          placeholder="Dataset Description"
          value={metadata.description}
          onChange={(e) =>
            setMetadata({ ...metadata, description: e.target.value })
          }
        />
      </div>

      <div>
        <select
          value={metadata.domainId}
          onChange={(e) =>
            setMetadata({ ...metadata, domainId: e.target.value })
          }
        >
          <option value="">Select Domain</option>
          {domains.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name}
            </option>
          ))}
        </select>
      </div>

      <div>{domainsError && <p>Error loading domains: {domainsError}</p>}</div>

      <div>
        <input
          type="file"
          onChange={(e) =>
            setVersionData({ ...versionData, file: e.target.files[0] })
          }
        />
      </div>
      <div>
        <button onClick={handleSubmit} disabled={loading || domainsLoading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
