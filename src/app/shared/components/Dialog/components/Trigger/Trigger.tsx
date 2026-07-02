import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';
type Actions = {
  onOpenDialog?: any;
};
type props = {
  children?: ReactNode;
  actions: Actions;
};
function Trigger({ children }: props) {
  return (
    children ?? (
      <Button variant="outline" size="sm">
        Open Dialog
      </Button>
    )
  );
}
export default Trigger;
