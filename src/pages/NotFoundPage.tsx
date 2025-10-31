import { Button } from "@/components/ui/button/Button";
import { Text } from "@/components/ui/Typography/Text";
import NotFound from "@/assets/icons/notFound/notFound.svg?react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";

export const NotFoundPage = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const TitleVariant = isMobile ? "body-lg" : "title-lg";
  const TextVariant = isMobile ? "body" : "menu-lg";

  const message = isMobile
    ? `입력하신 페이지 주소가 정확한지\n다시 한번 확인하시거나\n메인으로 이동하여\n다른 링크를 이용해 주세요.`
    : `입력하신 페이지 주소가 정확한지 다시 한번 확인하시거나\n메인으로 이동하여 다른 링크를 이용해 주세요.`;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 bg-primary-gray text-secondary-gray1">
      <div className="flex flex-col items-center justify-center gap-3">
        <NotFound className="size-12 text-secondary-gray1 mobile:size-10" />
        <Text variant={TitleVariant}>잘못된 접근입니다.</Text>
        <Text variant={TextVariant} className="whitespace-pre-line text-center">
          {message}
        </Text>
      </div>

      <div className="flex gap-2 mobile:fixed mobile:bottom-5 mobile:w-full mobile:px-5">
        <Button
          variant="mini"
          className="border border-secondary-gray2 bg-primary-gray text-secondary-gray2 mobile:flex-1 mobile:border-none mobile:bg-secondary-gray0 mobile:text-secondary-gray2"
          onClick={() => navigate(-1)}
        >
          이전으로
        </Button>
        <Button
          variant="mini"
          className="bg-primary-navy text-secondary-gray0 mobile:flex-1"
          onClick={() => navigate("/")}
        >
          메인으로
        </Button>
      </div>

      {/* {isMobile ? (
        <div className="fixed bottom-5 h-[50px] rounded-xl">
          <button className="fixed bottom-5 h-[50px] w-[calc(100%-60px)] rounded-[12px] bg-secondary-darkgray1 text-[18px] font-bold tracking-[.36px] text-white">
            생성하기
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="mini"
            className="border border-secondary-gray2 bg-primary-gray text-secondary-gray2"
            onClick={() => navigate(-1)}
          >
            이전으로
          </Button>
          <Button
            variant="mini"
            className="bg-primary-navy text-secondary-gray0"
            onClick={() => navigate("/")}
          >
            메인으로
          </Button>
        </div>
      )} */}
    </div>
  );
};
