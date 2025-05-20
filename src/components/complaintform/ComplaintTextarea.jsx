import { Input } from 'antd';
export default function ComplaintTextarea({ value, onChange }) {
  return (
    <Input.TextArea
      rows={6}
      name="complaintText"
      placeholder="Write the Complaint/Suggestion Here"
      className="textarea-custom"
      maxLength={600}
      showCount
      value={value}
      onChange={onChange}
    />
  );
}