import { Input } from 'antd';
export default function ApartmentInput({ value, onChange }) {
  return (
    <Input
      name="apartmentNo"
      placeholder="Apartment No"
      size="large"
      className="input-custom"
      value={value}
      onChange={onChange}
    />
  );
}