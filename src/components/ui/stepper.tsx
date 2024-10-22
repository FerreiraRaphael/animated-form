import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion'

import { Step, Stepper } from '@stepperize/react';
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';

export type StepType = { id: string, component: (step: Step) => React.ReactNode }
type CustomStep = Stepper<StepType[]>

interface IStepperShareProps {
  stepper: CustomStep,
  title: string,
}

export const StepperTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.h1 layout className="text-2xl font-bold text-center mt-16 mb-6">{children}</motion.h1>
  )
}

function StepperComp(props: IStepperShareProps) {
  const {
    stepper,
    title,
  } = props;
  const listRef = useRef<HTMLUListElement>(null)
  const currentIndex = stepper.current.index;

  const renderedSteps = useMemo(() => {
    const steps = []
    for (let i = 0; i <= currentIndex; i++) {
      steps.push(stepper.all[i])
    }
    return steps
  }, [currentIndex, stepper.all])
  const renderedStepsRef = useRef<number>(renderedSteps.length)
  useEffect(() => {
    if (listRef.current) {
      setTimeout(() => {
        listRef.current?.lastElementChild?.scrollIntoView({
          behavior: 'smooth'
        })
      }, 0)
    }
    renderedStepsRef.current = renderedSteps.length
  }, [renderedSteps])

  const renderSteps = useCallback((currentStep: Step) => {
    return renderedSteps.map((step) => {
      const isCurrent = step.id === currentStep.id

      return (
        <motion.li
          key={step.id}
          layout
          className={cn(
            "relative",
            "after:transition-colors",
            {
              " after:bg-background/90 after:z-10 after:block after:w-full after:h-full after:absolute after:top-0 after:content-['']": !isCurrent
            }
          )}
        >
          {step.component(step)}
        </motion.li>
      )
    })
  }, [renderedSteps])
  return (

    <ul ref={listRef} className="space-y-9 pr-2">
      <AnimatePresence>
        <StepperTitle>{title}</StepperTitle>
        {renderSteps(stepper.current)}
      </AnimatePresence>
    </ul>
  );
}

export default StepperComp;
