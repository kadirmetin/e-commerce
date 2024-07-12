import {
  Add,
  Close,
  CloudUploadRounded,
  Delete,
  Upload,
} from "@mui/icons-material";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../../../../api/apiService";
import { useSnackbar } from "../../../../../context/ToastContext";

type Props = {
  onUpload: (urls: string[]) => void;
  onRemove: (index: number) => void;
  onChange: (images: string[]) => void;
};

const ImageUploader = (props: Props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { openSnackbar } = useSnackbar();
  const prevImagesRef = useRef([]);

  useEffect(() => {
    const prevImages = prevImagesRef.current;

    if (images.length > prevImages.length) {
      const addedImages = images.filter((img) => !prevImages.includes(img));
      if (addedImages.length > 0) {
        setUploaded(false);
      }
    }

    prevImagesRef.current = images;
    props.onChange(images);
  }, [images]);

  const handleUpload = async () => {
    try {
      setLoading(true);

      const response = await uploadImage(images);

      if (response?.status === 200) {
        const urls = response.data.map((item) => item.secure_url);

        props.onUpload(urls);

        openSnackbar("Resimler başarıyla yüklendi!", "success");

        setUploaded(true);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);

      openSnackbar(`${error}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        setImages((prevState) => [...prevState, reader.result]);
      };

      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
  });

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      props.onRemove(index);
      return newImages;
    });
  };

  return (
    <Box className="w-full h-full flex flex-col justify-center items-center">
      {images.length > 0 ? (
        <Box className="relative h-full w-full flex flex-col justify-center items-center gap-4">
          <Box className="absolute top-0 right-0 m-2 ">
            <Tooltip title="Add More Image">
              <IconButton
                aria-label="Add"
                disabled={loading}
                {...getRootProps()}
              >
                <Add color="info" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete All">
              <IconButton
                aria-label="Delete"
                disabled={loading}
                onClick={() => {
                  setImages([]);
                  props.onChange([]);
                }}
              >
                <Delete color="error" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box className="flex flex-row gap-4">
            {images.map((image, index) => (
              <Box key={index} className="relative">
                <Box className="relative">
                  <img
                    src={image}
                    alt="Uploaded img"
                    className="max-w-full h-auto w-48 object-cover"
                  />
                </Box>
                <Box className="absolute top-0 right-0 bg-white rounded-full">
                  <IconButton
                    color="default"
                    size="small"
                    aria-label="Delete"
                    disabled={loading}
                    onClick={() => {
                      handleRemoveImage(index);
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
          <Box>
            <Button
              startIcon={<Upload />}
              variant="contained"
              disabled={loading || uploaded}
              size="medium"
              onClick={() => handleUpload()}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          className="w-full h-full flex flex-col justify-center items-center cursor-pointer group dropzone"
          {...getRootProps()}
        >
          <>
            <CloudUploadRounded
              className="text-gray-500 group-hover:text-blue-500 transition-colors duration-300"
              sx={{ fontSize: 75 }}
            />
            <Typography
              variant="h6"
              className="text-gray-500 text-center group-hover:text-blue-500 transition-colors duration-300"
            >
              {isDragActive
                ? "Drop your files to upload"
                : "Drag and drop files here, or click to select files to upload."}
            </Typography>
          </>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
