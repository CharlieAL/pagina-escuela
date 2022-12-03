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
        'py-1 px-3 w-64 rounded-lg font-light text-lg' + ' ' + className
      }
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
