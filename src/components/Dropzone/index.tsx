import Image from "next/image";
import { DropzoneState } from "react-dropzone";
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, File as FileIcon } from "lucide-react";
import IconButton from "../Iconbutton";

interface IDropzoneProps extends DropzoneState {
  className?: string;
  acceptedFilesText?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export interface ExtendedFile extends File {
  id: string;
  preview: string;
  isLoading: boolean;
  description?: string;
}

const Dropzone = (state: IDropzoneProps) => {
  return (
    <div
      className={cn(
        `flex h-96 w-full items-center justify-center rounded-2xl border-4 border-dashed bg-neutral-50 p-5 transition-all duration-200 `,
        state.isDragAccept && "border-green-500 bg-green-100",
        state.isDragReject && "border-red-500 bg-red-100",
        state.className && state.className
      )}
      {...state.getRootProps()}
    >
      <input {...state.getInputProps({ onChange: state.onChange })} />
      <div className="flex flex-col">
        {!state.isDragAccept && !state.isDragReject && (
          <>
            <span className="flex justify-center text-5xl">
              <FileIcon />
            </span>
            <span>
              <h3 className="inline-flex items-center text-neutral-600">
                Drag file here or
                <span>
                  <button
                    type="button"
                    className="inline-block px-1 py-1 font-semibold underline"
                    onClick={state.open}
                  >
                    click to upload
                  </button>
                </span>
              </h3>
            </span>
            {state.acceptedFilesText ? (
              <span className="inline-flex items-center justify-center text-sm text-neutral-400">
                {state.acceptedFilesText}
              </span>
            ) : null}
          </>
        )}
        {state.isDragAccept && (
          <>
            <span className="flex justify-center text-5xl text-green-600">
              <CheckCircle />
            </span>
            <span>
              <h3 className="inline items-center text-neutral-600">
                Aaaaaaand... <span className="font-bold"> Drop!</span>
              </h3>
            </span>
          </>
        )}
        {state.isDragReject && (
          <>
            <span className="flex justify-center text-5xl text-red-600">
              <XCircle />
            </span>
            <span>
              <h3 className="inline-flex items-center text-neutral-600">
                This file is not accepted..
              </h3>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export const PreviewList = ({
  files,
  setFiles,
}: {
  files: ExtendedFile[];
  setFiles: Dispatch<SetStateAction<ExtendedFile[]>>;
}) => {
  const showPreview = files && files.length >= 1;
  return (
    <ul
      className={cn(
        "brand-scrollbar mt-2 flex bg-white h-20 w-full flex-nowrap gap-2  rounded-md px-2 py-0 transition-all duration-200 ",
        showPreview && "h-20 py-4 "
      )}
    >
      {files.map((file) => (
        <Preview file={file} key={file.id} setFiles={setFiles} />
      ))}
    </ul>
  );
};

export const useEditImage = (
  file: ExtendedFile,
  setFiles: Dispatch<SetStateAction<ExtendedFile[]>>
) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [fileName, setFileName] = useState(file.name);
  const [description, setDescription] = useState(file.description);

  const cancelEdit = () => {
    setFileName(file.name);
    setIsEditOpen(false);
  };

  const edit = (id: string, newName: string, description: string) => {
    setFiles((prev) => {
      const updated = prev.map((file) => {
        if (file.id === id) {
          const fileExtension =
            newName.substring(newName.lastIndexOf(".") + 1, newName.length) ||
            newName;
          if (fileExtension != "jpeg" && fileExtension != "jpg") {
            newName = newName.concat(".jpg");
          }
          setFileName(newName);
          setDescription(description);
          const renamedFile = new File([file], newName, { type: "image/jpg" });
          const extendedNewFile = Object.assign(renamedFile, {
            id: file.id,
            preview: file.preview,
            description: description,
            isLoading: false,
          });
          return extendedNewFile;
        }
        return file;
      });
      return updated;
    });
    setIsEditOpen(false);
  };
  const removePreview = (id: string) => {
    setFiles((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    isEditOpen,
    setIsEditOpen,
    fileName,
    setFileName,
    description,
    setDescription,
    cancelEdit,
    edit,
    removePreview,
  };
};

export const Preview = ({
  file,
  setFiles,
}: {
  file: ExtendedFile;
  setFiles: Dispatch<SetStateAction<ExtendedFile[]>>;
}) => {
  const {
    isEditOpen,
    setIsEditOpen,
    fileName,
    setFileName,
    description,
    setDescription,
    removePreview,
    cancelEdit,
    edit,
  } = useEditImage(file, setFiles);

  return (
    <li className="relative flex h-20 w-20 flex-shrink-0 flex-col overflow-hidden rounded-md  ">
      <div className="relative m-2 flex flex-grow">
        <Image
          src={file.preview}
          alt={"Uploaded file"}
          fill
          className="absolute object-contain"
          loading={"lazy"}
        />
      </div>
    </li>
  );
};

export default Dropzone;
