import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-y-4 p-4">
      <img src="/icons/404.png" alt="404 이미지" className="mb-8 h-auto w-full max-w-[200px]"></img>
      <p className="mb-18 text-center text-lg">
        찾을 수 없는 페이지입니다.
        <br />
        요청하신 페이지가 사라졌거나 <br />
        잘못된 경로입니다.
      </p>
      <Button variant="outline" className="text-md rounded-3xl">
        이전 화면으로 돌아가기
      </Button>
    </main>
  );
}
