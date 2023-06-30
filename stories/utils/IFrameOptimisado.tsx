import { ReactNode, useEffect, useRef } from 'react'

interface iFrameProps {
  height: string
  color?: string
  children: ReactNode
  padding?: string
  border?: string
}

export const IframeOptimizado = ({
  height,
  color = '#C5C1BC',
  padding = '10px',
  border = 'none',
  children,
}: iFrameProps) => {
  const iframeRef = useRef(null)

  const insertar = () => {
    const iframe: any = iframeRef.current
    if (iframe != null) {
      const iframeDocument = iframe.contentDocument
      const stylesheets = Array.from(document.styleSheets)
      stylesheets.forEach((stylesheet) => {
        const newStylesheet = iframeDocument.createElement('style')
        newStylesheet.innerHTML = Array.from(stylesheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n')
        iframeDocument.head.appendChild(newStylesheet)
      })
      const compo = document.getElementById('componente')
      iframeDocument.body.innetHTML = '<div></div>'
      iframeDocument.body.appendChild(compo)
    }
  }
  useEffect(() => {
    insertar()
  }, [])
  return (
    <div style={{ border: border, padding: padding, background: color }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: height,
        }}
      >
        <iframe
          // src={'/'}
          id="vec"
          ref={iframeRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            boxShadow: 'none',
            border: 'none',
          }}
        ></iframe>
      </div>
      <div id={'componente'}>{children}</div>
    </div>
  )
}
