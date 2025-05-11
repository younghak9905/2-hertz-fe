import { z } from 'zod';

export const registerUserSchema = z.object({
  providerId: z.string().nonempty(),
  provider: z.enum(['KAKAO']),
  profileImage: z.string().min(1, { message: '프로필 이미지를 선택해주세요.' }),
  email: z.string().optional(),
  nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  ageGroup: z.enum(['AGE_20S', 'AGE_30S', 'AGE_40S', 'AGE_50S', 'AGE_60_PLUS'], {
    errorMap: () => ({ message: '나이를 선택해주세요.' }),
  }),
  gender: z.enum(['MALE', 'FEMALE'], {
    errorMap: () => ({ message: '성별을 선택해주세요.' }),
  }),
  oneLineIntroduction: z
    .string()
    .min(10, { message: '최소 10자 이상 작성해주세요.' })
    .max(100, { message: '최대 100자까지만 작성할 수 있어요.' })
    .regex(/^[\w\s가-힣ㄱ-ㅎㅏ-ㅣ.-]*$/, {
      message: '특수문자는 _ , - , 점(.) , 공백만 사용할 수 있어요.',
    }),
  isTest: z.boolean(),
});
