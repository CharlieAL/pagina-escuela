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
        'py-2 px-4 w-64 rounded-lg font-extralight text-sm' + ' ' + className
      }
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
