import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';

interface MyModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  title: string;
  content: string;
}

const MyModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  title,
  content,
}: MyModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>{title}</h1>
              </ModalHeader>
              <ModalBody>
                <h1 className="text-white">{content}</h1>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyModal;
