import { useState } from "react";

export default function ImportCSVModal({
  isOpen,
  onClose,
  activeTab,
  data = [],
  selectedItems,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const downloadDirectCSV = (dataToExport, filename) => {
    if (!dataToExport || dataToExport.length === 0) {
      setError("No data available to download");
      return;
    }

    try {
      // Get headers
      const headers = Object.keys(dataToExport[0]);

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...dataToExport.map((item) =>
          headers
            .map((header) => {
              const value = item[header]?.toString() || "";
              return value.includes(",") ? `"${value}"` : value;
            })
            .join(",")
        ),
      ].join("\n");

      // Download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    } catch (error) {
      console.error("Error downloading data:", error);
      setError("Failed to download data. Please try again.");
    }
  };

  const appendToCSV = async (dataToExport) => {
    try {
      // Create file input for selecting existing CSV
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".csv";
      input.click();

      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            // Get existing CSV content
            const existingContent = event.target.result;
            const existingRows = existingContent
              .split("\n")
              .filter((row) => row.trim());
            const headers = existingRows[0].split(",").map((h) => h.trim());

            // Format new data to match existing headers
            const newRows = dataToExport.map((item) => {
              return headers
                .map((header) => {
                  const value = item[header]?.toString() || "";
                  return value.includes(",") ? `"${value}"` : value;
                })
                .join(",");
            });

            // Combine existing and new content
            const newContent = existingRows.concat(newRows).join("\n");

            // Download combined file
            const blob = new Blob([newContent], {
              type: "text/csv;charset=utf-8;",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute(
              "download",
              file.name.replace(".csv", "_updated.csv")
            );
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            onClose();
          } catch (error) {
            console.error("Error processing file:", error);
            setError("Failed to process the CSV file. Please try again.");
          }
        };
        reader.readAsText(file);
      };
    } catch (error) {
      console.error("Error appending to CSV:", error);
      setError("Failed to append to CSV file. Please try again.");
    }
  };

  const handleDownload = (type) => {
    if (!data || data.length === 0) {
      setError("No data available to download");
      return;
    }

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      let dataToExport = [];
      let filename = "";

      if (type === "teams") {
        dataToExport = data.filter((item) => item.has_team === true);
        filename = `ideathon_teams_${timestamp}.csv`;
        downloadDirectCSV(dataToExport, filename);
      } else if (type === "individuals") {
        dataToExport = data.filter((item) => !item.has_team);
        filename = `ideathon_individuals_${timestamp}.csv`;
        downloadDirectCSV(dataToExport, filename);
      } else if (type === "selected") {
        // Create file input for selecting existing CSV
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";
        input.click();

        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = (event) => {
            try {
              // Get existing CSV content
              const existingContent = event.target.result;
              const existingRows = existingContent
                .split("\n")
                .filter((row) => row.trim());
              const headers = existingRows[0].split(",").map((h) => h.trim());

              // Get selected data
              dataToExport = data.filter((item) => selectedItems.has(item.id));

              // Format new data to match existing headers
              const newRows = dataToExport.map((item) => {
                return headers
                  .map((header) => {
                    const value = item[header]?.toString() || "";
                    return value.includes(",") ? `"${value}"` : value;
                  })
                  .join(",");
              });

              // Combine existing and new content
              const newContent = existingRows.concat(newRows).join("\n");

              // Download combined file
              const blob = new Blob([newContent], {
                type: "text/csv;charset=utf-8;",
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.setAttribute("href", url);
              link.setAttribute(
                "download",
                file.name.replace(".csv", "_updated.csv")
              );
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              onClose();
            } catch (error) {
              console.error("Error processing file:", error);
              setError("Failed to process the CSV file. Please try again.");
            }
          };
          reader.readAsText(file);
        };
      } else {
        dataToExport = data;
        filename = `${activeTab}_all_${timestamp}.csv`;
        downloadDirectCSV(dataToExport, filename);
      }
    } catch (error) {
      console.error("Error preparing data:", error);
      setError("Failed to prepare data for download");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black/80 border border-orange-500/20 rounded-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Download Data</h2>
            <button
              onClick={onClose}
              className="text-orange-200/60 hover:text-orange-200 transition-colors"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {activeTab === "ideathon" ? (
              <>
                <button
                  onClick={() => handleDownload("teams")}
                  disabled={loading}
                  className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Download Teams Data
                </button>
                <button
                  onClick={() => handleDownload("individuals")}
                  disabled={loading}
                  className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Download Individual Participants
                </button>
                {selectedItems?.size > 0 && (
                  <button
                    onClick={() => handleDownload("selected")}
                    disabled={loading}
                    className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Append Selected to CSV ({selectedItems.size})
                  </button>
                )}
              </>
            ) : (
              // Only show Download All for startup track
              <button
                onClick={() => handleDownload("all")}
                disabled={loading}
                className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Download All Participants
              </button>
            )}

            <button
              onClick={onClose}
              className="w-full px-6 py-2 text-orange-200/60 hover:text-orange-200 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
