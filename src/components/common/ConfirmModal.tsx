import { IoClose } from 'react-icons/io5';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: React.ReactNode;
  confirmText: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'quit' | 'confirm'; // quit: 로그아웃, 탈퇴 / confirm: 채널 나가기, 매칭 동의
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText = '네',
  cancelText = '아니요',
  onConfirm,
  onCancel,
  variant = 'confirm',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const isSingleButton = !cancelText;

  return isOpen ? (
    <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xs space-y-4 rounded-2xl bg-white p-6 text-center">
        <button onClick={onCancel} className="absolute top-4 right-4">
          <IoClose size={20} />
        </button>
        <h2 className="text-md pt-4 font-bold">{title}</h2>
        {description && <p className="text-sm text-[var(--gray-400)]">{description}</p>}
        <div className={`flex justify-center gap-2 pt-2 ${!isSingleButton ? 'justify-end' : ''}`}>
          {onCancel && (
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="닫기"
            >
              <IoClose size={20} className="text-[var(--black)]" />
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`mt-2 rounded-[10] px-4 py-3 text-sm font-semibold text-white ${
              variant === 'quit' ? 'bg-[var(--pink)]' : 'bg-[#7BA1FF]'
            } ${!isSingleButton ? 'w-full' : ''}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
