import { Input } from 'antd';
export default function NICInput({ value, onChange }) {
  return (
    <Input
      name="nic"
      placeholder="NIC No"
      size="large"
      className="input-custom"
      value={value}
      onChange={onChange}
    />
  );
}