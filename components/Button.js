export const ButtonGreen = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        'bg-green-600 py-1 px-10 hover:bg-green-400 rounded-lg' +
        ' ' +
        className
      }
    >
      {children}
    </button>
  )
}
export const ButtonRed = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={
        'bg-red-600 py-1 px-10 hover:bg-red-400 rounded-lg' + ' ' + className
      }
    >
      {children}
    </button>
  )
}
