import ChatText from './ChatText'

export default function MenuTask({ onClick, comentarios, status }) {
  return (
    <>
      <div id='menuContainer' className='z-50 '>
        <section className='bg-gray-900 shadow-xl w-full mobile:w-3/4  h-3/4 relative '>
          <div className='absolute top-1 left-1'>
            <button onClick={onClick}>❌</button>
          </div>

          <div className='flex justify-between'>
            <iframe
              src='caca.pdf'
              type='application/pdf'
              width='70%'
              height='460px'
            />
            <div className='w-[30%]'>
              <div className='h-3/4'>
                {comentarios?.map((data) => (
                  <ChatText
                    key={data.id}
                    person={data.nombre}
                    text={data.mensaje}
                  />
                ))}
              </div>
              <div className='flex items-center space-x-1'>
                <textarea
                  cols={2}
                  rows={2}
                  className='ml-1 rounded-lg w-full py-2 border-none outline-none break-words font-thin resize-none px-2 text-sm'
                ></textarea>
                <button className='h-10 right-2 top-1 bg-blue-500 py-1 px-2 font-thin rounded-lg '>
                  enviar
                </button>
              </div>
            </div>
          </div>

          {status !== 'revisado' && (
            <div className='flex justify-start space-x-72  pt-3 pl-20'>
              <button className='py-2 px-5 bg-red-500 font-light rounded-lg'>
                Devolver
              </button>
              <button className='py-2 px-5 bg-green-500 font-light rounded-lg'>
                aceptar
              </button>
            </div>
          )}
        </section>
      </div>
      <style jsx>{`
        #menuContainer {
          height: 90%;
          width: 100%;
          border-radius: 5px;
          display: flex;
          position: absolute;
          backdrop-filter: blur(3px);
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  )
}
