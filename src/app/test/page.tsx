'use client';

import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

const TestPage = () => {
  return (
    <Dialog.Root placement="center" open>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <div className="flex justify-center">
              <h2 className="font-bold text-4xl">Title</h2>
            </div>
            <Dialog.Body>
              <p>Hekko</p>
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
export default TestPage;
