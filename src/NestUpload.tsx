
import React from "react";

const FileUploader: React.FC = () => {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      try {
        const response = await fetch("/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        // 这里处理返回的数据
        console.log(data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx" multiple onChange={handleFileUpload} />
    </div>
  );
};

export default FileUploader;
