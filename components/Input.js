export const Input = ({
  type,
  placeholder,
  onChange,
  value,
  name,
  className
}) => {
  return (
    <input
      className={
        'py-2 px-4 w-64 rounded-lg font-extralight text-sm border-none outline-none bg-gray-600' +
        ' ' +
        className
      }
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
