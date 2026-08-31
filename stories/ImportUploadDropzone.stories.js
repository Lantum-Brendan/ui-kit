import ImportUploadDropzone from '../components/ImportUploadDropzone.vue';

export default {
  title: 'Components/ImportUploadDropzone',
  component: ImportUploadDropzone,
  tags: ['autodocs'],
  argTypes: {
    isDragging: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    isDragging: false,
    labels: {
      dropzone: 'Drop your file here or click to browse',
      supportedFormats: 'Supports CSV, PDF, PNG, JPG, TIFF, BMP',
    },
  },
};

export const WithDragging = {
  args: {
    isDragging: true,
    labels: {
      dropzone: 'Drop your file here or click to browse',
      supportedFormats: 'Supports CSV, PDF, PNG, JPG, TIFF, BMP',
    },
  },
};

export const Interactive = {
  args: {
    isDragging: false,
    labels: {
      dropzone: 'Custom dropzone label — click to upload',
      supportedFormats: 'CSV only',
    },
  },
};
