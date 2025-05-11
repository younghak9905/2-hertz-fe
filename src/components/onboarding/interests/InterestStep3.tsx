import { EnumSelectGrid } from './EnumSelectGrid';
import { CurrentInterests, FavoriteFoods, LikedSports, Pets } from '@/constants/enum';
import HorizonBar from '@/components/common/horizonBar';
import { useFormContext } from 'react-hook-form';

export default function InterestStep3() {
  const { setValue, watch } = useFormContext();

  const selectedCurrentInterests = watch('interests.currentInterests');
  const selectedFavoriteFoods = watch('interests.favoriteFoods');
  const selectedLikedSports = watch('interests.likedSports');
  const selectedPets = watch('interests.pets');

  return (
    <>
      <EnumSelectGrid
        title="요즘 관심사는 무엇인가요?"
        description="* 중복 선택 가능"
        options={CurrentInterests}
        selected={selectedCurrentInterests}
        onSelect={(value) => {
          setValue('interests.currentInterests', value, { shouldValidate: true });
        }}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="좋아하는 음식은 무엇인가요?"
        description="* 중복 선택 가능"
        options={FavoriteFoods}
        selected={selectedFavoriteFoods}
        onSelect={(value) => {
          setValue('interests.favoriteFoods', value, { shouldValidate: true });
        }}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="어떤 스포츠에 관심이 있으신가요?"
        description="* 중복 선택 가능"
        options={LikedSports}
        selected={selectedLikedSports}
        onSelect={(value) => {
          setValue('interests.likedSports', value, { shouldValidate: true });
        }}
        multi
        maxSelect={10}
      />
      <HorizonBar />

      <EnumSelectGrid
        title="반려동물을 키우고 계신가요?"
        description="* 중복 선택 가능"
        options={Pets}
        selected={selectedPets}
        onSelect={(value) => {
          setValue('interests.pets', value, { shouldValidate: true });
        }}
        multi
        maxSelect={10}
      />
    </>
  );
}
