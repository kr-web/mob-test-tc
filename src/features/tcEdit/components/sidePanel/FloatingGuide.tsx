import { AnimatePresence, motion } from 'framer-motion';

interface FloatingGuideProps {
  isSidePanelOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

import Alarm from '@/assets/icons/alarm/alarm.svg';
import AlarmActive from '@/assets/icons/alarm/alarm-active.svg';
import { AiGuidePanel } from './AiGuidePanel';
import { AiGuideItems } from '../../constants/AiGuideItems';

export const FloatingGuide = ({ isSidePanelOpen, onToggle, onClose }: FloatingGuideProps) => {
  return (
    <>
      {/* 버튼 */}
      <motion.button
        onClick={onToggle}
        initial={false}
        animate={{ right: isSidePanelOpen ? 400 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        className={`fixed bottom-12 z-40 flex items-center justify-center ${
          isSidePanelOpen ? 'mr-5' : 'mr-10'
        }`}
      >
        <img
          src={AiGuideItems.length > 0 ? AlarmActive : Alarm}
          alt="AI Guide Alarm"
          className="h-14 w-14"
        />
      </motion.button>

      {/* 패널 */}
      <AnimatePresence>
        {isSidePanelOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.25 }}
            className="fixed right-0 top-0 z-50 h-screen w-[380px]"
          >
            <AiGuidePanel onClose={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
