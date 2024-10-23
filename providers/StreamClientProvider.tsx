'use client'

import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { ReactNode, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
// import { TokenProvider } from '@stream-io/video-react-sdk';
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/ui/Loader';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = 'user-id';
// const token = 'authentication-token';
// const user: User = { id: userId };


const StreamVideoProvider = ({ children }: {children:ReactNode}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if(!isLoaded || !user) return;
    if(!apiKey) throw new Error('Stream API key missing')

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider
    })

    setVideoClient(client);

    // ↓記述不足でエラー
  }, [user, isLoaded])

  if (!videoClient) return <Loader/>;

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider;
