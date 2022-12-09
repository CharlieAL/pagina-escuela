import React, { useRef, useState } from 'react'
import 'primereact/resources/themes/lara-dark-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'
import { Toast } from 'primereact/toast'

import { FileUpload } from 'primereact/fileupload'

export default function Formulario({ id }) {
  // const [totalSize, setTotalSize] = useState(0);
  const toast = useRef(null)
  const onBasicUpload = (e) => {
    toast.current.show({
      severity: 'info',
      summary: 'Exelente',
      detail: 'Archivo subido'
    })
  }

  return (
    <div className='mobile:w-[50%] w-full mobile:h-[420px] h-[100px] mobile:border-r mobile:border-b-0 border-b '>
      <Toast ref={toast}></Toast>
      <form className=''>
        <div className='flex flex-col justify-center items-center space-y-10 mobile:h-[400px]  '>
          <div className='pt-8'>
            <FileUpload
              mode='basic'
              name='demo'
              url={`/api/aws/upload/${id}`}
              onUpload={onBasicUpload}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
