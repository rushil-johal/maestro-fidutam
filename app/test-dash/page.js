'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';


export default function TestDash() {
    const [openAIResponse, setOpenAIResponse] = useState('');

    useEffect(() => {
        // Retrieve the response from sessionStorage
        const storedResponse = sessionStorage.getItem('openAIResponse');
        if (storedResponse) {
            setOpenAIResponse(storedResponse);
            // Optionally clear the stored response after retrieving it
            sessionStorage.removeItem('openAIResponse');
        }
    }, []);

    return (
        <>
            <Head>
                <title>OpenAI Response</title>
            </Head>
            <div className="flex flex-col h-screen bg-black text-white">
                <nav className="flex justify-end items-center p-4">
                    {/* The image/logo should go here if you need it */}
                    <div className="space-x-8 pr-10">
                        {/* Apply the Beatrice font using the class you created */}

                        <Link href="/" passHref>
                            <button
                                className="text-xl font-medium font-beatriceFont hover:underline"
                                style={{ textDecorationColor: '#e8d28b' }}
                            >
                                App
                            </button>
                        </Link>

                        <button
                            className="text-xl font-medium font-beatriceFont hover:underline"
                            style={{ textDecorationColor: '#e8d28b' }}
                        >
                            Slack
                        </button>

                        <button
                            className="text-xl font-medium font-beatriceFont hover:underline"
                            style={{ textDecorationColor: '#e8d28b' }}
                        >
                            Feedback
                        </button>

                    </div>
                    <Link href="/" passHref>
                        <div className="p-4">
                            <Image
                                src="/fidulogo.png"
                                alt="Fidu logo"
                                width={80}
                                height={80}
                                className="font-beatriceFont"
                            />
                        </div>
                    </Link>
                </nav>
                <main className="flex-grow flex flex-col items-center justify-center">
                    <div className="max-w-5xl p-8 bg-[#fdf3db] rounded-2xl shadow-lg text-center">
                        <h1 className="text-5xl font-beatriceFont text-black font-medium mb-8">Course Dashboard (Working)</h1>
                        <div className="response-container font-beatriceFont bg-white text-black p-4 rounded-lg shadow">
                            <pre>{openAIResponse}</pre>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
