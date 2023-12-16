"use client"
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'
import ReactPlayer from 'react-player'
interface VideoPlayerProps{
     urlLink : string;
}

const VideoPlayer = ({urlLink}:VideoPlayerProps) => {
// const ReactPlayer = useMemo(()=> dynamic(()=> import('react-player'),{ssr:false}),[])
 
  return (

        <ReactPlayer
        ulr={urlLink}
        controls
        width={300}
        height={300}
        className=" border border-red-500"
        />

  )
}


export default dynamic(() => Promise.resolve(VideoPlayer), { ssr: false });