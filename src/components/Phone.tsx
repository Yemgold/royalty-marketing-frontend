import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import '../index.css';

type PhoneInput = {
  value: string;
  setValue: (value: string) => void;
};
const Phone = ({ value, setValue }: PhoneInput) => {
  return (
    <div>
      <label htmlFor="phone_number" className="ml-4 font-semibold">
        Phone number
      </label>
      <PhoneInput
        className="custom-phone-input border p-2 outline-none rounded-full"
        placeholder="Enter phone number"
        value={value}
        onChange={(phone) => setValue(phone || '')}
      />
    </div>
  );
};

export default Phone;
