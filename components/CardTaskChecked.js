export default function CardTaskChecked({ nombreTask, status, onClick }) {
  if (status !== 'revisado') {
    return
  }
  return (
    <>
      <a
        onClick={onClick}
        className={`bg-green-700 min-w-[240px]  mx-3   h-[80px] relative rounded-lg cursor-pointer snap-always snap-center`}
      >
        {/* card header */}
        <div className='absolute right-0 top-1 font-extralight text-sm  px-2'>
          revisado
        </div>
        <div className='pt-6 text-center font-bold  '>
          <div className='h-10 items-center  '>
            <h1 className=' font-extralight'>{nombreTask} segundo</h1>
          </div>
        </div>
      </a>
    </>
  )
}
