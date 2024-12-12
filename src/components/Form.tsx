type FormType = {
  title: string;
  type: string;
  required: boolean;
  placeholder: string;
  value: string;
  setValue: (text: string) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
};
const Form = ({
  title,
  type,
  placeholder,
  value,
  setValue,
  onFocus,
  onBlur,
  onPaste,
  required,
}: FormType) => {
  return (
    <div className="flex flex-col mt-4">
      <label className="font-semibold ml-4" htmlFor={title}>
        {title}
      </label>
      <input
        className="border pl-6 py-2 rounded-full outline-none"
        type={type}
        placeholder={placeholder}
        value={value}
        onPaste={onPaste}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={(e) => setValue(e.target.value)}
        required={required}
      />
    </div>
  );
};

export default Form;
