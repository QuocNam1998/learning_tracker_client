import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Trigger from './components/Trigger/Trigger';
type Actions = {
  onOpenDialog?: any;
};
type Props = {
  children?: ReactNode;
  actions: Actions;
};
const AppDialog = ({ children, actions }: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Trigger actions={actions}>{children}</Trigger>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
export default AppDialog;
