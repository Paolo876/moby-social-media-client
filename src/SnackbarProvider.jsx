import { useRef } from 'react'
import { SnackbarProvider } from 'notistack'
import SnackbarComponent from './components/SnackbarComponent'
import SnackbarListener from './SnackbarListener'

const SnackbarRootProvider = ({ children }) => {
  const notistackRef = useRef(null);

  return (
    <SnackbarProvider
      maxSnack={3} 
      ref={notistackRef}
      hideIconVariant={true}
      preventDuplicate={true}
      content={(key, message) => {
        return <SnackbarComponent snackKey={key} key={key} {...{ message, notistackRef }} />;
      }}
    >
      <SnackbarListener/>
      {children}
    </SnackbarProvider>
  )
}

export default SnackbarRootProvider