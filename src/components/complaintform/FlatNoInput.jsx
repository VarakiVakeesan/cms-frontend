import { Input } from 'antd';
export default function FlatNoInput({ value, onChange }) {
  return (
    <Input
      name="flatNo"
      placeholder="Flat No"
      size="large"
      className="input-custom"
      value={value}
      onChange={onChange}
    />
  );
}