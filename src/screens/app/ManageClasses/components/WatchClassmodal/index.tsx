import { Title } from "@/components/typography/Title";
import { useThemeStore } from "@/store/theme";
import {
  reactModalCustomStyles,
  reactModalCustomStylesDark,
} from "@/styles/react-modal";
import { IconButton } from "@material-tailwind/react";
import Feather from "feather-icons-react";
import { KeyboardEvent, MouseEvent, useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import Modal from "react-modal";
import Player from "react-player";

interface WatchClassModalProps {
  //TODO-Pablo: Define the class using real IClass properties
  classToWatch: string;
  isOpen: boolean;
  onRequestClose: (
    event: MouseEvent<Element, MouseEvent> | KeyboardEvent<Element>
  ) => void;
  onClose: () => void;
}

export function WatchClassModal({
  isOpen,
  onRequestClose,
  onClose,
  classToWatch,
}: WatchClassModalProps) {
  const { theme } = useThemeStore();
  const [playing, setPlaying] = useState(false);

  const extendedStyles =
    theme === "light"
      ? {
          ...reactModalCustomStyles,
          content: {
            ...reactModalCustomStyles.content,
            width: "800px",
            margin: "0 auto",
          },
        }
      : {
          ...reactModalCustomStyles,
          content: {
            ...reactModalCustomStylesDark.content,
            width: "800px",
            margin: "0 auto",
          },
        };

  const vimeoVideo = "https://vimeo.com/993530822?share=copy";

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose as never}
      style={extendedStyles}
    >
      <div className="flex flex-row w-full justify-between items-start mb-2">
        <Title
          content={classToWatch}
          className="text-center text-black dark:text-white mb-4 font-bold text-[14px] md:text-lg"
        />
        <IconButton variant="text" onClick={onClose} className="mt-[-8px]">
          <RiCloseCircleLine className="md:h-8 md:w-8 h-5 w-5 text-red-500" />
        </IconButton>
      </div>
      <div className="w-full h-[400px] bg-black flex items-center justify-center">
        <Player
          url={vimeoVideo}
          playing={playing}
          controls
          width="100%"
          style={{ aspectRatio: 16 / 9 }}
          onPause={() => setPlaying(false)}
          volume={1}
        />
        {!playing && (
          <div
            className="w-full h-full flex items-center justify-center absolute inset-0"
            onClick={() => setPlaying(true)}
          >
            <div className="h-[80px] w-[80px] bg-black rounded-[60px] flex items-center justify-center opacity-[0.8] mt-[52px]">
              <Feather
                icon="play-circle"
                className="text-blue-400 h-[40px] w-[40px]"
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
