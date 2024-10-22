import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: About,
})

function About() {
  // const [step, setStep] = useState(0)
  return (
    <div className="max-w-md mx-auto mt-10 bg-background rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-primary">About the presentation</h1>
      {/* <motion.div
        key={"about"}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: .2 }}
      >
        <p>
          What type of presentation are you uploading?
        </p>
        <div className='flex flex-wrap gap-2 mt-8'>
          <Toggle variant={'outline'}>
            Pooled Vehicle
          </Toggle>
          <Toggle variant={'outline'}>
            Pooled Vehicle
          </Toggle>
          <Toggle variant={'outline'}>
            Pooled Vehicle
          </Toggle>
          <Toggle variant={'outline'}>
            Pooled Vehicle
          </Toggle>
          <Toggle variant={'outline'}>
            Pooled Vehicle
          </Toggle>
          <Toggle variant={'outline'}>
            Pooled Vehicle
          </Toggle>
          <Toggle variant={'outline'}>
            Pooled Vehicle
          </Toggle>
        </div>
      </motion.div> */}
      {/* <Stepper /> */}
      {/* <Button variant={'secondary'} className="mt-6 float-end">
      Next
    </Button> */}
    </div>)
}
