import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { defineStepper } from '@stepperize/react';
import { createLazyFileRoute } from '@tanstack/react-router'
import { useForm, useFormContext } from 'react-hook-form';
import { z } from "zod"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FileUpload from '@/components/ui/file-upload';
import { Progress } from '@/components/ui/progress';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PropsWithChildren, useMemo } from 'react';
import { motion } from 'framer-motion'
import StepperComp, { StepperTitle, StepType } from '@/components/ui/stepper';
import { cn } from '@/lib/utils';
import { SkeletonTextarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const { useStepper } = defineStepper(
  {
    id: 'upload',
    title: 'Upload Presentation',
  },
  {
    id: 'about',
    title: 'About the presentation',
  },
  {
    id: 'client',
    title: 'About the client'
  },
  {
    id: 'meeting',
    title: 'About the meeting'
  },
  {
    id: 'context',
    title: 'Presentation Context'
  },
);
const ACCEPTED_FILE_TYPES = ['application/json']

const formSchema = z.object({
  file: z.custom<File>(val => val instanceof File, 'Please upload a file')
    .refine(
      file => ACCEPTED_FILE_TYPES.includes(file.type),
      { message: 'Please choose .json format files only' }
    ),
  whatTypeOfPresentation: z.array(z.string()).nonempty().max(3),
  whatCoreSections: z.array(z.string()).nonempty().max(3),
  isThisAsNewOrExistingClient: z.array(z.string()).nonempty().max(3),
  typeOfClient: z.array(z.string()).nonempty().max(3),
  typeOfMeeting: z.array(z.string()).nonempty().max(3),
  howWillTheMeetingBeDelivered: z.array(z.string()).nonempty().max(3),
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
})

// type FormType = UseFormReturn<z.infer<typeof formSchema>>

// const toogleValue

type ToggleValue = {
  label: string
  value: string
}

const ControlledToggle = ({ name, label, values, desc }: { desc?: string, name: string, label: string, values: ToggleValue[] }) => {
  const { control } = useFormContext()

  return (
    <FormField
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <FormItem className='space-y-9'>
          <div className='space-y-1'>
            <FormLabel>{label}</FormLabel>
            <FormDescription>{desc}</FormDescription>
          </div>
          <div className='space-y-2'>
            <ToggleGroup value={field.value} className='justify-start flex-wrap gap-3' type="multiple" onValueChange={(value) => {
              if (value.length > 3) {
                return field.onChange(value.slice(1, 4))
              }
              return field.onChange(value)
            }}>
              {values.map(({ value, label }) => (
                <ToggleGroupItem key={value} variant={'fidelity'} value={value}>{label}</ToggleGroupItem>
              ))}
            </ToggleGroup>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

const Fadein: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ ease: "easeOut", duration: .2 }}
    >
      {children}
    </motion.div>
  )
}

const { useStepper: useAboutStepper } = defineStepper<StepType[]>(
  {
    id: 'about1',
    component: (step) => (
      <ControlledToggle
        key={step.id}
        values={[
          {
            label: "Pooled Vehicle",
            value: "pooledVehicle"
          },
          {
            label: "Segregated",
            value: "segregated"
          },
          {
            label: "Capability",
            value: "capability"
          },
          {
            label: "Advisory",
            value: "advisory"
          },
          {
            label: "Other",
            value: "other"
          }
        ]} label="What type of presentation are you uploading?" name='whatTypeOfPresentation' />
    ),
  },
  {
    id: 'about2',
    component: (step) => (
      <ControlledToggle
        key={step.id}
        label="What core sections does the deck include?"
        name='whatCoreSections'
        desc='Remove as appropriate'
        values={[
          {
            label: "Strategy Overview",
            value: "strategyOverview"
          },
          {
            label: "Team Overview",
            value: "teamOverview"
          },
          {
            label: "Investment Philosophy",
            value: "investmentPhilosophy"
          },
          {
            label: "Investment Process",
            value: "investmentProcess"
          },
          {
            label: "Positioning Review",
            value: "positioningReview"
          },
          {
            label: "Macro-economic Outlook",
            value: "macroEconomicOutlook"
          },
        ]} />
    ),
  },
);


const { useStepper: useClientStepper } = defineStepper<StepType[]>(
  {
    id: 'client1',
    component: (step) => (
      <ControlledToggle
        key={step.id}
        values={[
          {
            label: "It's a new client",
            value: "itsANewClient"
          },
          {
            label: "It's an existing client",
            value: "itsAnExistingClient"
          },
        ]} label="Is this as new or existing client?" name='isThisAsNewOrExistingClient' />
    ),
  },
  {
    id: 'client2',
    component: (step) => (
      <ControlledToggle
        key={step.id}
        label="What type of client are they?"
        name='typeOfClient'
        values={[
          {
            label: "Consultant",
            value: "consultant"
          },
          {
            label: "Rating Agency",
            value: "ratingAgency"
          },
          {
            label: "Institutional",
            value: "institutional"
          },
          {
            label: "Private Bank",
            value: "privateBank"
          },
          {
            label: "Wealth Manager",
            value: "wealthManager"
          },
          {
            label: "Financial Advisor",
            value: "financialAdvisor"
          },
          {
            label: "Wholesale Bank",
            value: "wholesaleBank"
          },
          {
            label: "Retail Investor",
            value: "retailInvestor"
          }
        ]} />
    ),
  },
);

const { useStepper: useMeetingStepper } = defineStepper<StepType[]>(
  {
    id: 'meeting1',
    component: () => (
      <ControlledToggle values={[
        {
          label: "A short introduction",
          value: "shortIntroduction"
        },
        {
          label: "A general introduction",
          value: "generalIntroduction"
        },
        {
          label: "An update",
          value: "update"
        },
        {
          label: "A retention meeting",
          value: "retentionMeeting"
        },
        {
          label: "A pitch",
          value: "pitch"
        },
        {
          label: "A final's pitch",
          value: "finalsPitch"
        },
      ]} label="What type of meeting are you preparing for?" name='typeOfMeeting' />
    ),
  },
  {
    id: 'meeting2',
    component: () => (
      <ControlledToggle
        label="How will the meeting be delivered?"
        name='howWillTheMeetingBeDelivered'
        values={[
          {
            label: "1 to 1",
            value: "1 to 1"
          },
          {
            label: "Small Group",
            value: "Small Group"
          },
          {
            label: "Webinar",
            value: "Webinar"
          },
          {
            label: "Roundtable",
            value: "Roundtable"
          },
          {
            label: "Stage",
            value: "Stage"
          },
        ]} />
    ),
  },
);

function Index() {
  const stepper = useStepper()
  const aboutStepper = useAboutStepper()
  const clientStepper = useClientStepper()
  const meetingStepper = useMeetingStepper()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // username: "",
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log('passei aqui')
    console.log(values)
  }
  const progress = [
    20,
    20 * ((aboutStepper.current.index + 1) / aboutStepper.all.length),
    20 * ((clientStepper.current.index + 1) / clientStepper.all.length),
    20 * ((meetingStepper.current.index + 1) / meetingStepper.all.length),
    20,
  ]
  const sum = stepper.all.reduce((prev, _, i) => {
    if (i <= stepper.current.index) {
      return prev + progress[i]
    }
    return prev
  }, 0)

  const childrenSteps = useMemo(() => [
    undefined,
    aboutStepper,
    clientStepper,
    meetingStepper,
  ], [aboutStepper, clientStepper, meetingStepper])

  const onBackClick = useMemo(() => {
    const childrenStep = childrenSteps[stepper.current.index]
    if (childrenStep) {
      return childrenStep.isFirst ? stepper.prev : childrenStep.prev
    }
    return stepper.prev
  },
    [childrenSteps, stepper]
  )

  const onSkipClick = useMemo(() => {
    return stepper.next
  },
    [stepper]
  )
  const onNextClick = useMemo(() => {
    const childrenStep = childrenSteps[stepper.current.index]
    if (childrenStep) {
      return childrenStep.isLast ? stepper.next : childrenStep.next
    }
    return stepper.next
  },
    [childrenSteps, stepper]
  )


  return (
    <div className="relative max-w-md mx-auto mt-10 bg-background w-[450px]">
      <div className='absolute z-10 top-0 h-16 w-full space-y-4 bg-gradient-to-b from-background/90 to-transparent p-[1px]'>
        <Progress value={sum} className='h-2 w-full' pulse />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className={cn(
            'overflow-y-hidden p-[1px] flex flex-col justify-end',
            'min-h-[calc(50vh)]',
            { 'max-h-[calc(50vh)]': stepper.current.id !== 'upload' }
          )}>
            {stepper.switch({
              upload: (step) => (
                <Fadein key={step.id}>
                  <StepperTitle>{stepper.current.title}</StepperTitle>
                  <FileUpload name='file' />
                </Fadein>
              ),
              about: (step) => (
                <Fadein key={step.id}>
                  <StepperComp title={stepper.current.title} stepper={aboutStepper} />
                </Fadein>
              ),
              client: (step) => (
                <Fadein key={step.id}>
                  <StepperComp title={stepper.current.title} stepper={clientStepper} />
                </Fadein>
              ),
              meeting: (step) => (
                <Fadein key={step.id}>
                  <StepperComp title={stepper.current.title} stepper={meetingStepper} />
                </Fadein>
              ),
              context: (step) => (
                <Fadein key={step.id}>
                  <StepperTitle>{stepper.current.title}</StepperTitle>
                  <SkeletonTextarea variant={'fidelity'} className='block space-y-2'>
                    <Skeleton className="bg-foreground/10 h-2.5 w-full rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-full rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-[80%] rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-full rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-full rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-[50%] rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-full rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-full rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-[30%] rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-full rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-full rounded-xl" />
                    <Skeleton className="bg-foreground/10 h-2.5 w-[50%] rounded-xl" />
                  </SkeletonTextarea>
                </Fadein>
              )
            })}
          </div>
          <div className="flex justify-between items-center p-[1px]">
            <div>
              <Button
                variant="fidelity"
                onClick={onBackClick}
                className={cn({ hidden: stepper.isFirst })}
              >
                Back
              </Button>
            </div>
            <div className='inline-block space-x-1'>
              <Button
                variant="fidelity"
                onClick={onSkipClick}
                className={cn({ hidden: stepper.isFirst || stepper.isLast })}
              >
                Skip
              </Button>
              <Button
                variant={'fidelity'} onClick={onNextClick}>
                {'Next'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
