'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import ChannelsGroupPage from '@/app/chat/group/page';
import ChannelsIndividualPage from '@/app/chat/individual/page';

export default function ChannelsPage() {
  const [selectedTab, setSelectedTab] = useState<'individual' | 'group'>('individual');

  return (
    <>
      <Header title="채팅" showBackButton={false} showNotificationButton={true} />
      <main className="flex h-full flex-col overflow-y-auto px-4 py-2">
        <div className="flex justify-between px-16 pb-2">
          <button
            onClick={() => setSelectedTab('individual')}
            className={`text-md font-semibold ${
              selectedTab === 'individual'
                ? 'border-b-2 border-[var(--blue)] text-black'
                : 'text-gray-500'
            }`}
          >
            개인 채널
          </button>
          <button
            onClick={() => setSelectedTab('group')}
            className={`text-md font-semibold ${
              selectedTab === 'group'
                ? 'border-b-2 border-[var(--blue)] text-black'
                : 'text-gray-500'
            }`}
          >
            그룹 채널
          </button>
        </div>

        <section key={selectedTab} className="animate-fade-slide-in mt-4">
          {selectedTab === 'individual' ? <ChannelsIndividualPage /> : <ChannelsGroupPage />}
        </section>
      </main>
    </>
  );
}
