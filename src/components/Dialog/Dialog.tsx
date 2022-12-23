import {
  Dialog as DialogUI,
  Transition as TransitionUI
} from '@headlessui/react'
import { Fragment, FunctionComponent } from 'preact'
import { useState, useEffect } from 'preact/hooks'

export type DialogProps = {
  title?: string
  content: string
  visible?: boolean
  onClose?: () => void
  confirmText?: string
  onConfirm?: () => Promise<void>
}

const Dialog: FunctionComponent<DialogProps> = (props) => {
  const { title, content, confirmText = 'Got it, thanks!' } = props
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const onClose = () => {
    setVisible(false)
    props.onClose?.()
  }

  const onConfirm = async () => {
    setLoading(true)
    try {
      await props.onConfirm?.()
      setLoading(false)
    } catch (error) {}
    setVisible(false)
  }

  useEffect(() => {
    if (typeof props.visible !== 'undefined') {
      setVisible(props.visible)
    }
  }, [props.visible])

  return (
    <TransitionUI appear show={visible} as={Fragment}>
      <DialogUI className="relative z-10" onClose={onClose}>
        <TransitionUI.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionUI.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionUI.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogUI.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                  <DialogUI.Title className="text-lg font-medium leading-6 text-gray-900">
                    {title}
                  </DialogUI.Title>
                )}
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{content}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onConfirm}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          />
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      confirmText
                    )}
                  </button>
                </div>
              </DialogUI.Panel>
            </TransitionUI.Child>
          </div>
        </div>
      </DialogUI>
    </TransitionUI>
  )
}

export default Dialog
