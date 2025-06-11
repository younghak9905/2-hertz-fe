'use client';

import { usePathname } from 'next/navigation';
import BottomNavigationBar from '@/components/layout/BottomNavigationBar';
import Header from '@/components/layout/Header';
import { useState, useEffect, useMemo } from 'react';
import { useSSE } from '@/hooks/useSSE';
import toast from 'react-hot-toast';
import { useConfirmModalStore } from '@/stores/modal/useConfirmModalStore';
import { ConfirmModal } from '../common/ConfirmModal';
import WaitingModal from '../common/WaitingModal';
import { useWaitingModalStore } from '@/stores/modal/useWaitingModalStore';
import { postMatchingAccept, postMatchingReject } from '@/lib/api/matching';

const hiddenRoutes = ['/login', '/onboarding', '/not-found'];

const HEADER_HEIGHT = 56;
const BOTTOM_NAV_HEIGHT = 56;

export default function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [padding, setPadding] = useState({ top: 0, bottom: 0 });
  const [isHiddenUI, setIsHiddenUI] = useState(false);
  const closeConfirmModal = useConfirmModalStore((state) => state.closeModal);
  const closeWaitingModal = useWaitingModalStore((state) => state.closeModal);
  const openWaitingModal = useWaitingModalStore((state) => state.openModal);

  const sseHandlers = useMemo(
    () => ({
      'signal-matching-conversion': (data: unknown) => {
        const { partnerNickname, channelRoomId } = data as {
          partnerNickname: string;
          channelRoomId: number;
        };
        toast.success(`🎉 ${partnerNickname}님과 매칭이 가능해졌어요!`);
      },
      'signal-matching-conversion-in-room': (data: unknown) => {
        const { partnerNickname, channelRoomId, hasResponeded, partnerHasResponded } = data as {
          partnerNickname: string;
          channelRoomId: number;
          hasResponeded: boolean;
          partnerHasResponded: boolean;
        };

        if (hasResponeded || partnerHasResponded) return;

        useConfirmModalStore.getState().openModal({
          title: (
            <>
              {partnerNickname}님과의 매칭에
              <br />
              동의하시겠습니까?
            </>
          ),
          confirmText: '네',
          cancelText: '아니요',
          imageSrc: '/images/friends.png',
          variant: 'confirm',
          onConfirm: () => {
            handleAccept(channelRoomId, partnerNickname);
            useConfirmModalStore.getState().closeModal();
          },
          onCancel: () => {
            handleReject(channelRoomId);
            useConfirmModalStore.getState().closeModal();
            toast('매칭이 실패하였습니다', { icon: '🥺' });
          },
        });
      },
      'matching-success': (data: unknown) => {
        const { partnerNickname } = data as {
          channelRoomId: number;
          partnerId: number;
          partnerProfileImage: string;
          partnerNickname: string;
        };
        toast(`${partnerNickname}님과 매칭을 성공했어요!`, { icon: '🥳' });
      },
      'matching-rejection': (data: unknown) => {
        const { partnerNickname } = data as {
          channelRoomId: number;
          partnerId: number;
          partnerProfileImage: string;
          partnerNickname: string;
        };
        toast(`${partnerNickname}님과 매칭을 실패했어요`, { icon: '🥺' });
      },
    }),

    [],
  );

  const handleAccept = async (channelRoomId: number, partnerNickname: string) => {
    try {
      const res = await postMatchingAccept({ channelRoomId });

      switch (res.code) {
        case 'MATCH_SUCCESS':
          toast('매칭이 성사되었습니다!', { icon: '🥳' });
          closeWaitingModal();
          closeConfirmModal();

          break;
        case 'MATCH_PENDING':
          toast('상대방의 응답을 기다리는 중입니다.');
          closeConfirmModal();
          openWaitingModal(partnerNickname);
          break;
        case 'MATCH_FAILED':
          toast.error('상대방이 매칭을 거절했습니다.');
          closeConfirmModal();
          closeWaitingModal();
          break;
        case 'USER_DEACTIVATED':
          toast.error('상대방이 탈퇴한 사용자입니다.');
          break;
        default:
          toast.error('예상치 못한 응답입니다.');
      }
    } catch (e) {
      toast.error('매칭 수락 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async (channelRoomId: number) => {
    try {
      const res = await postMatchingReject({ channelRoomId });

      if (res.code === 'MATCH_REJECTION_SUCCESS') {
        toast.success('매칭을 거절했습니다.');
      } else {
        toast.error('예상치 못한 응답입니다.');
      }
    } catch (e) {
      toast.error('매칭 거절 중 오류가 발생했습니다.');
    }
  };

  useSSE({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/sse/subscribe`,
    handlers: sseHandlers,
  });

  useEffect(() => {
    setMounted(true);
    setIsHiddenUI(hiddenRoutes.some((route) => pathname.startsWith(route)));
  }, [pathname]);

  useEffect(() => {
    if (mounted) {
      setPadding(
        isHiddenUI ? { top: 0, bottom: 0 } : { top: HEADER_HEIGHT, bottom: BOTTOM_NAV_HEIGHT },
      );
    }
  }, [mounted, isHiddenUI]);

  if (!mounted) {
    return <div className="relative flex min-h-[100dvh] w-full max-w-[430px] flex-col" />;
  }

  return (
    <div
      className={`relative flex min-h-[100dvh] w-full max-w-[430px] flex-col ${
        isHiddenUI ? '' : 'bg-white'
      }`}
    >
      {!isHiddenUI && <Header title="" showBackButton={false} showNotificationButton={false} />}
      <div
        className={`flex-grow overflow-y-auto shadow-lg ${isHiddenUI ? '' : 'pt-[56px] pb-[56px]'}`}
      >
        {children}
      </div>
      {!isHiddenUI && <BottomNavigationBar />}
      <ConfirmModal />
      <WaitingModal />
    </div>
  );
}
