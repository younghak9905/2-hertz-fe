'use client';
import { useState } from 'react';
import { EnumSelectGrid } from './EnumSelectGrid';
import { CurrentInterests, FavoriteFoods, LikedSports, Pets } from '@/constants/enum';
import HorizonBar from '@/components/common/horizonBar';

export default function InterestStep3() {
  const [selectedCurrentInterests, setSelectedCurrentInterests] = useState<string[]>([]);
  const [selectedFavoriteFoods, setSelectedFavoriteFoods] = useState<string[]>([]);
  const [selectedLikedSports, setSelectedLikedSports] = useState<string[]>([]);
  const [selectedPets, setSelectedPets] = useState<string[]>([]);

  return (
    <>
      <EnumSelectGrid
        title="요즘 관심사는 무엇인가요?"
        description="* 중복 선택 가능"
        options={CurrentInterests}
        selected={selectedCurrentInterests}
        onSelect={setSelectedCurrentInterests}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="좋아하는 음식은 무엇인가요?"
        description="* 중복 선택 가능"
        options={FavoriteFoods}
        selected={selectedFavoriteFoods}
        onSelect={setSelectedFavoriteFoods}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="어떤 스포츠에 관심이 있으신가요?"
        description="* 중복 선택 가능"
        options={LikedSports}
        selected={selectedLikedSports}
        onSelect={setSelectedLikedSports}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="좋아하는 음식은 무엇인가요?"
        description="* 중복 선택 가능"
        options={FavoriteFoods}
        selected={selectedPets}
        onSelect={setSelectedPets}
        multi
        maxSelect={10}
      />
    </>
  );
}
