import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import CloseIcon from "@/assets/icons/actionBar/close.svg?react-no-replace";
import AlarmActiveIcon from "@/assets/icons/alarm/alarm-active.svg?react";

interface AlarmTypes {
  type: "pc" | "mob",
  active: boolean;
  setActive: (active: boolean) => void;
}

export const Alarm = ({ type, active, setActive } : AlarmTypes) => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // message 열릴 때 -----------------------------------------------------------
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (active) {
      timer = setTimeout(() => setShowMessage(true), 500);
    }
    return () => clearTimeout(timer);
  }, [active]);

  // message 닫힐 때 -----------------------------------------------------------
  const handleClose = () => {
    setShowMessage(false);
    setTimeout(() => setActive(false), 500);
  };

  return (
    <motion.div
      initial={{ right: -60 }}
      animate={{ right: type === "pc" ? (active ? 60 : -60) : (active ? 20 : -60) }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed w-14 h-14 ${type === "pc" ? "bottom-[60px]" : "bottom-[87px]"}`}
    >
      <AlarmActiveIcon className="w-14 h-14"/>

      {showMessage &&
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0 }}
					transition={{ delay : 0.081 }}
					className="absolute right-[22px] top-[-24px] w-3 h-3 bg-primary-navy bubble"
        />
      }

      <motion.div
        initial={{height: 0, opacity: 0 }}
        animate={{ height: showMessage ? 146 : 0, opacity: showMessage ? 1 : 0 }}
        className="absolute bottom-[72px] right-0 w-[260px] p-4 bg-primary-navy rounded-lg flex flex-col gap-2 text-white text-xs overflow-hidden"
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">컴즈봇 알림</p>
          <button onClick={handleClose}>
            <CloseIcon className="w-5 h-5"/>
          </button>
        </div>
        <div className="text-xs font-medium text-secondary-gray2 break-keep">
          해당 검색어로는 테스트케이스를 생성할 수 없어요. 어떤 용도의 테스트케이스를 생성할 것인지 명확하게 입력해주셔야 해요.<br/><br/>
          <span className="text-white">(ex)전자상거래 로그인 테스트케이스를 뽑아줘</span>
        </div>
      </motion.div>
    </motion.div>
  )
}