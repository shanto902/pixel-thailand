import { useEffect, useRef, useState } from "react";
import { useVideoContext } from "../context/VideoContext";

export const useVideoIntersection = (videoId: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    activeVideoId,
    playVideo,
    registerVideo,
    unregisterVideo,
    isPopupOpen,
  } = useVideoContext();
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    registerVideo(videoId);
    return () => unregisterVideo(videoId);
  }, [videoId, registerVideo, unregisterVideo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }, // Play when at least 50% visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPopupOpen) {
      video.pause();
      return;
    }

    // If this video is in view, request to play it
    if (isInView) {
      playVideo(videoId);
    } else {
      // If not in view, pause it (already handled by effect below, but good for immediate reaction)
      video.pause();
    }
  }, [isInView, isPopupOpen, playVideo, videoId]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (activeVideoId === videoId && isInView && !isPopupOpen) {
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    } else {
      video.pause();
    }
  }, [activeVideoId, isInView, isPopupOpen, videoId]);

  return { videoRef, isInView };
};
