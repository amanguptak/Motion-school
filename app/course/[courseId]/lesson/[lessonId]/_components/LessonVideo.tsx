"use client";
import { Chapter } from "@prisma/client";
import { Loader2, Lock } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
import YouTubePlayer from "react-player/youtube";

interface LessonVideoProps {
  lessonId: string;
  title: string;
  courseId: string;
  nextChapterId: string;
  isLocked: boolean;
  isFree: boolean;

  lesson: Chapter;
}

const LessonVideo = ({
  lessonId,
  title,
  courseId,
  nextChapterId,
  isLocked,
  isFree,
  lesson,
}: LessonVideoProps) => {
  // let player;
  // function onYouTubeIframeAPIReady() {
  //   player = new window.YT.Player('your-player-id', {
  //     events: {
  //       'onReady': onPlayerReady,
  //     }
  //   });
  // }

  // const handlePlayerReady = (player) => {
  //   // Now the player is ready, and you can perform any YouTube-related actions.
  //   // For example:
  //   player.play();
  // };

  return (
    <div className="relative aspect-video">
      {/* { !isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <Loader2 className="h-8 w-8 animate-spin text-secondary" />
          </div>
        )} */}
      {(isLocked && isFree) && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-700 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}

      {(!isLocked || !isFree) && (
        <div className="flex items-center justify-center w-full">
          <div className="relative aspect-video h-fit w-fit mt-2  [&_iframe]:rounded-lg [&_iframe]:border-2 [&_iframe]:border-white">
            {(lesson?.youtubeUrl && !lesson?.videoUrl)&&(
              <div>
                <div className="hidden lg:block">
                  <ReactPlayer
                    url={lesson?.youtubeUrl!}
                    className="h-8 "
                    width={1010}
                    height={550}
                    controls={true}
                  />
                </div>
                <div className="block lg:hidden">
                  <ReactPlayer
                    url={lesson?.youtubeUrl!}
                    width={360}
                    height={220}
                    controls={true}
                  />
                </div>
              </div>
            )}

            {(lesson?.videoUrl)&&(
              <div className="relative aspect-video h-fit w-fit mt-2  [&_iframe]:rounded-lg [&_iframe]:border-2 [&_iframe]:border-white">
                <div className="hidden lg:block">
                  <ReactPlayer
                    url={lesson?.videoUrl!}
                    className=""
                    width={1010}
                    height={550}
                    controls={true}
                  />
                </div>
                <div className="block lg:hidden">
                  <ReactPlayer
                    url={lesson?.videoUrl!}
                    width={360}
                    height={220}
                    controls={true}
                  />
                   <iframe src={lesson?.videoUrl} allowFullScreen className='border-2 w-full h-full border-white rounded-lg' />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(LessonVideo), { ssr: false });
