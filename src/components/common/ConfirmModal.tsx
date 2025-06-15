import { useConfirmModalStore } from '@/stores/modal/useConfirmModalStore';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

export function ConfirmModal() {
  const {
    isOpen,
    title,
    description,
    imageSrc,
    confirmText = '네',
    cancelText = '아니요',
    onConfirm,
    onCancel,
    variant = 'confirm',
    closeModal,
  } = useConfirmModalStore();

  if (!isOpen) return null;

  const isSingleButton = !cancelText;

  const handleCancel = () => {
    onCancel?.();
    closeModal();
  };

  const handleConfirm = () => {
    onConfirm?.();
    closeModal();
  };

  return isOpen ? (
    <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xs space-y-4 rounded-2xl bg-white p-6 text-center">
        <button onClick={handleCancel} className="absolute top-4 right-4">
          <IoClose size={20} />
        </button>
        {imageSrc && (
          <div className="flex w-full justify-center">
            <Image src={imageSrc} alt="friends Image" width={40} height={40} />
          </div>
        )}
        <h2 className="text-md px-4 font-bold">{title}</h2>
        {description && <p className="text-sm text-[var(--gray-400)]">{description}</p>}

        <div className={`mt-5 flex justify-center gap-6 px-4 pt-2`}>
          <button
            onClick={handleConfirm}
            className={`flex-1 rounded-[10] px-4 py-[2.3] text-sm font-semibold text-white ${
              variant === 'quit' ? 'bg-[var(--pink)]' : 'bg-[#7BA1FF]'
            } ${!isSingleButton ? 'w-full' : ''}`}
          >
            {confirmText}
          </button>

          {!isSingleButton && (
            <button
              onClick={handleCancel}
              className="flex-1 rounded-[10] bg-gray-500 px-4 py-2 text-sm font-semibold text-gray-100"
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
