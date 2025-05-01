'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

interface ProfileImageSelectorProps {
  selectedUrl: string;
  onSelect: (url: string) => void;
}

const PROFILE_IMAGES = [
  '/images/cat-profile.png',
  '/images/dog-profile.png',
  '/images/duck-profile.png',
  '/images/rabbit-profiile.png',
  '/images/elephant-profile.png',
  '/images/penguin-profile.png',
];

export default function ProfileImageSelector({ selectedUrl, onSelect }: ProfileImageSelectorProps) {
  const [errorFallback, setErrorFallback] = useState<Record<string, boolean>>({});

  const handleError = (url: string) => {
    setErrorFallback((prev) => ({ ...prev, [url]: true }));
  };

  return (
    <main className="space-y-4 px-2">
      <p className="font-semibold">프로필 이미지를 선택해주세요</p>
      <div className="mx-auto mt-6 grid w-[20rem] grid-cols-3 justify-center gap-5">
        {PROFILE_IMAGES.map((url) => {
          const isSelected = selectedUrl === url;
          const fallback = '/images/default-profile.png';
          const finalUrl = errorFallback[url] ? fallback : url;

          return (
            <button
              type="button"
              key={url}
              onClick={() => onSelect(url)}
              className={`relative aspect-square overflow-hidden rounded-full border-1 transition-all duration-200 ${
                isSelected
                  ? 'ring-0.3 border-[var(--gray-200)] shadow-md ring-[var(--gray-100)]'
                  : 'border-muted hover:ring-muted-foreground/30 hover:ring-1'
              }`}
            >
              <Image
                src={finalUrl}
                alt="프로필 이미지"
                width={100}
                height={100}
                className="h-full w-full object-cover"
                onError={() => handleError(url)}
                draggable={false}
              />

              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full shadow">
                    <FaCheck className="bg-transparent text-2xl text-white" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </main>
  );
}
