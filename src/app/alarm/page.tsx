'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/layout/Header';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useRouter } from 'next/navigation';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const mockAlarmList = [
  {
    type: 'NOTICE',
    title: ' 새로운 ‘튠 로그’ 기능이 추가되었습니다!',
    content:
      '안녕하세요, Hertz 팀입니다. 이번 업데이트를 통해 여러분의 감정 연결을 기록해주는 ‘튠 로그’ 기능이 새롭게 추가되었습니다. 튠 로그는 매칭된 순간과 그 이후의 감정 흐름을 시그널처럼 기록하여, 나중에 다시 꺼내볼 수 있는 감정 아카이브 역할을 합니다. 오늘의 연결이 스쳐 지나가지 않도록, 따뜻한 감정을 기억할 수 있도록 준비했어요.',
    isRead: false,
    createdDate: '2025-05-19T21:13:00',
  },
  {
    type: 'REPORT',
    title: '튜닝 결과가 도착했습니다!',
    content: '',
    isRead: true,
    createdDate: '2025-05-12T14:13:00',
  },
  {
    type: 'NOTICE',
    title: ' 새로운 ‘튠 로그’ 기능이 추가되었습니다!',
    content:
      '안녕하세요, Hertz 팀입니다. 이번 업데이트를 통해 여러분의 감정 연결을 기록해주는 ‘튠 로그’ 기능이 새롭게 추가되었습니다.',
    isRead: false,
    createdDate: '2025-05-19T21:13:00',
  },
  {
    type: 'REPORT',
    title: '튜닝 결과가 도착했습니다!',
    content: '',
    isRead: true,
    createdDate: '2025-05-12T14:13:00',
  },
];

export default function AlarmPage() {
  const router = useRouter();

  return (
    <>
      <Header title="알림" showBackButton={true} showNotificationButton={false} />
      <div className="space-y-3 px-4 py-2">
        <Accordion type="single" collapsible className="w-full">
          {mockAlarmList.map((alarm, index) => {
            if (alarm.type === 'REPORT') {
              return (
                <div
                  key={index}
                  onClick={() => router.push('/report')}
                  className="cursor-pointer rounded-xl border-b bg-white px-4 py-4 transition hover:bg-gray-50"
                >
                  <div className="mt-1 mb-1 flex items-center justify-between">
                    <span className="flex-shrink-0 rounded-2xl bg-[var(--light-blue)] px-2.5 py-1 text-xs font-semibold text-[var(--dark-blue)]">
                      튜닝
                    </span>
                    <span className="text-xs text-[var(--gray-300)]">
                      {dayjs(alarm.createdDate).fromNow()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-left text-sm font-medium">
                    <div className="flex flex-col gap-1 px-1">
                      <span className={alarm.isRead ? 'text-[var(--gray-300)]' : 'text-black'}>
                        💌 {alarm.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mt-1 rounded-xl border-b bg-white px-4 py-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="flex-shrink-0 rounded-2xl bg-[var(--gray-100)] px-2.5 py-1 text-xs font-semibold text-[var(--gray-300)]">
                    공지
                  </span>
                  <span className="text-xs text-gray-400">
                    {dayjs(alarm.createdDate).fromNow()}
                  </span>
                </div>
                <AccordionTrigger className="flex items-center justify-between text-left text-sm font-medium">
                  <div className="flex w-full flex-col gap-1">
                    <div className="inline-flex items-center gap-1">
                      <span
                        className={`px-1 text-sm font-semibold text-black ${alarm.isRead ? 'font-normal text-gray-500' : ''}`}
                      >
                        📢 {alarm.title}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 whitespace-pre-wrap text-[var(--gray-300)]">
                  {alarm.content}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </>
  );
}
