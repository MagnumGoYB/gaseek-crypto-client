import { createRef, render } from 'preact'
import { forwardRef, unmountComponentAtNode } from 'preact/compat'
import { useState, useEffect, useImperativeHandle } from 'preact/hooks'

import { resolveContainer } from '@/utils'

import Dialog, { DialogProps } from './Dialog'

export type DialogShowProps = Omit<DialogProps, 'visible'>

export type DialogShowRef = {
  close: () => void
}

const unmount = (container: HTMLDivElement) => {
  const unmountResult = unmountComponentAtNode(container)
  if (unmountResult && container.parentNode) {
    container.parentNode.removeChild(container)
  }
}

const show = (props: DialogShowProps) => {
  const { onClose } = props
  const container = document.createElement('div')
  const bodyContainer = resolveContainer(() => document.body)
  bodyContainer.appendChild(container)

  const Wrapper = forwardRef<DialogShowRef>((_, ref) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      setVisible(true)
    }, [])

    const handleClose = () => {
      onClose?.()
      setVisible(false)
      setTimeout(() => {
        unmount(container)
      }, 300)
    }

    useImperativeHandle(ref, () => ({
      close: handleClose
    }))

    const componentProps = {
      ...props,
      visible,
      onClose: handleClose
    }

    return <Dialog {...componentProps} />
  })

  Wrapper.displayName = 'DialogShowWrapper'

  const ref = createRef<DialogShowRef>()
  render(<Wrapper ref={ref} />, container)

  return {
    close: () => {
      ref.current?.close()
    }
  }
}

export default show
