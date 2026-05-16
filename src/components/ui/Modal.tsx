import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface IProps {
  isOpen: boolean
  close: () => void
  children: React.ReactNode
  title?: string
}

const Modal = ({ isOpen, close, children, title }: IProps) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/25 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel transition className="w-full max-w-md rounded-xl flex flex-col gap-y-2 bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
            {title && <DialogTitle as="h3" className="text-base/7 font-medium">{title}</DialogTitle>}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal