import { AnimatePresence, motion } from "framer-motion";
import Picture from "./Picture";

interface Props {
  index: number;
  dailyWord: { data: { dailyWord: string } };
}

export default function ImageContainer({ index, dailyWord }: Props) {
  return (
    <div className="relative flex justify-center h-full m-auto overflow-hidden w-72 sm:w-96 min-h-[180px] xs:h-96">
      <Picture
        index={index}
        blur={index > 5 ? 0 : 100 / (index * index)}
        className="absolute inset-0 object-cover w-full m-auto blur-lg"
      />
      <AnimatePresence>
        {index > 5 && (
          <motion.div
            initial={{ y: 150 }}
            animate={{ y: 0 }}
            exit={{ y: 150 }}
            transition={{ delay: 0.5, stiffness: 80 }}
            className="absolute bottom-0 max-w-[350px] text-center border-2 border-black border-b-0 p-3 rounded-t-lg bg-black/50"
          >
            <p className="text-xl">{dailyWord.data?.dailyWord}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
