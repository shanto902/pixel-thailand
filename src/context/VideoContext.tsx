import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type VideoContextType = {
  activeVideoId: string | null;
  registerVideo: (id: string) => void;
  unregisterVideo: (id: string) => void;
  playVideo: (id: string) => void;
  isPopupOpen: boolean;
  setPopupOpen: (isOpen: boolean) => void;
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [registeredVideos, setRegisteredVideos] = useState<Set<string>>(
    new Set(),
  );

  const registerVideo = (id: string) => {
    setRegisteredVideos((prev) => new Set(prev).add(id));
  };

  const unregisterVideo = (id: string) => {
    setRegisteredVideos((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
    if (activeVideoId === id) {
      setActiveVideoId(null);
    }
  };

  const playVideo = (id: string) => {
    setActiveVideoId(id);
  };

  return (
    <VideoContext.Provider
      value={{
        activeVideoId,
        registerVideo,
        unregisterVideo,
        playVideo,
        isPopupOpen,
        setPopupOpen: setIsPopupOpen,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};
