
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { useFormContext } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FormField } from './form'

interface FileUploadComp {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function FileUploadComp(props: FileUploadComp) {
  const { onChange } = props
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type === 'application/vnd.ms-powerpoint' || uploadedFile.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
      setFile(uploadedFile)
      // Simulate upload progress
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setProgress(currentProgress)
        if (currentProgress >= 100) {
          clearInterval(interval)
        }
      }, 500)
    } else {
      alert('Please upload a PPT or PDF file')
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div className="bg-background">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-primary bg-muted p-8 text-center cursor-pointer"
      >
        <input {...getInputProps({ onChange })} />
        <CloudUpload className="mx-auto mb-4 text-primary" size={69} />
        <p className="text-base mb-2">
          Drag & drop files or <span className="text-primary font-semibold">Browse</span>
        </p>
        <p className="text-xsm text-muted-foreground">Supported formats: PPT, PDF</p>
      </div>
      {file && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="mt-9">
          <h2 className="text-sm font-semibold mb-2">Presentation upload</h2>
          <div className="bg-muted p-3 mt-6">
            <p className="text-sm truncate">{file.name}</p>
          </div>
          <Progress pulse={progress < 100} value={progress} className="w-full h-2 mt-1 duration-75" />
        </motion.div>
      )}
    </div>
  )
}

const FileUpload = ({ name }: { name: string }) => {
  const { control } = useFormContext()

  return (
    <FormField
      render={({ field }) => (
        <FileUploadComp
          onChange={e => { field.onChange(e.target.files ? e.target.files[0] : null) }
          }
        />
      )}
      name={name}
      control={control}
      defaultValue={null}
    />
  )
}

export default FileUpload
