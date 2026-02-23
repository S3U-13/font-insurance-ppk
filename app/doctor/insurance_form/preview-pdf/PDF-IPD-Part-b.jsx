"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import False from "@/components/false";

export default function PDFIpdPartB({
  isOpen,
  onClose,
  base64PdfIpdPartB,
  loading,
}) {
  return (
    <div>
      {" "}
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        size="4xl"
        classNames={{
          body: "max-h-[calc(90vh-80px)]",
          header: "border-b border-divider py-6",
          footer: "border-t border-divider",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="text-center text-2xl font-bold">Preview PDF IPD part B</h1>
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className="flex justify-center items-center h-[80vh]">
                    <Spinner size="lg" label="Loading..." />
                  </div>
                ) : base64PdfIpdPartB === null ? (
                  <False />
                ) : (
                  <iframe
                    src={`data:application/pdf;base64,${base64PdfIpdPartB?.base64}`}
                    className="w-full h-[90vh]"
                  ></iframe>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
