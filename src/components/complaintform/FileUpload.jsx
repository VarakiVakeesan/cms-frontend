import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function FileUpload({ file, setFile }) {
  const beforeUpload = (file) => {
    setFile(file);
    return false; // Prevent auto-upload
  };

  const handleRemove = () => setFile(null);

  return (
    <Upload
      beforeUpload={beforeUpload}
      onRemove={handleRemove}
      fileList={file ? [file] : []}
      maxCount={1}
      accept="image/*,.pdf"
      showUploadList={{ showRemoveIcon: true }}
      style={{ width: '100%' }}
    >
      <Button icon={<UploadOutlined />} size="large" className="upload-btn">
        Upload Proof Image/File
      </Button>
    </Upload>
  );
}