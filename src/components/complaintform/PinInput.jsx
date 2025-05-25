import { Input } from 'antd';
export default function PinInput({ value, onChange }) {
  return (
    <Input.Password
      name="pinNo"
      placeholder="PIN No"
      size="large"
      className="input-custom"
      value={value}
      onChange={onChange}
      maxLength={8}
    />
  );
}