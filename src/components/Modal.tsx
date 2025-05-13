import {
  Modal as ModalUI,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

interface IModalProps {
  isOpen: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  header: string;
  body: React.JSX.Element;
  onSave?: () => void;
  isSaveDisabled?: boolean;
}

export function Modal({
  isOpen,
  onOpenChange,
  header,
  body,
  onSave,
  isSaveDisabled,
}: Readonly<IModalProps>) {
  return (
    <ModalUI
      backdrop={"opaque"}
      classNames={{
        backdrop: "dark:blur",
      }}
      isDismissable={false}
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={!isSaveDisabled}
                onPress={() => {
                  onSave?.();
                  onClose();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ModalUI>
  );
}
