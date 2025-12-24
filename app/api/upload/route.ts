import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            // --- IMAGES ---
            'image/jpeg', 
            'image/png', 
            'image/gif', 
            'image/webp', 
            'image/svg+xml', // Fixes the previous SVG error
            'image/bmp',

            // --- AUDIO (Comprehensive List) ---
            'audio/mpeg',    // mp3
            'audio/wav',     // wav
            'audio/webm',    // webm (Standard browser recording format)
            'audio/ogg',     // ogg
            'audio/x-m4a',   // m4a (iOS Voice Memos)
            'audio/mp4',     // mp4 audio
            'audio/aac',     // aac
            'audio/flac',    // flac
            'audio/midi',    // midi
            'audio/x-wav'    // alternative wav header
          ],
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload completed:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}