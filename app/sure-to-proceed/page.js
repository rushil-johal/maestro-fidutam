// // pages/sure-to-proceed.js
'use client';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Suspense } from 'react';

export default function SureToProceed() {
    const [searchParams, setSearchParams] = useState(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(15);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            setSearchParams(params);
        }
    }, []);

    const textInput = searchParams ? searchParams.get('textInput') : '';
    const selectedOption = searchParams ? searchParams.get('selectedOption') : '';

    function createPrompt(topic, intensity) {
        return `Create a course outline for ${topic} and the user wants to learn this at intensity level of ${intensity} . Format each lesson as 'Lesson X: [Title] (for ${topic})' . Separate each lesson by a new line and have no spaced out lines or empty lines in between. Please give links of videos that actually exist legit links please. `;
//         return `Create a course outline tailored for learning about ${topic}. Design the curriculum to match an intensity level of ${intensity}, ensuring that each lesson is specifically relevant to ${topic} and caters to the designated depth of knowledge and application. Structure each lesson entry as follows:
        
// "Lesson X (For ${topic})" 

// [strucutre each title such that videos are not found repeatedly for each lesson]

// Ensure each lesson title incorporates ${topic} explicitly and aligns with the chosen intensity level. Avoid any gaps or empty lines between lessons to maintain a concise, focused outline.
    }

    async function handleGoAhead(event) {
        event.preventDefault();

        const text = createPrompt(textInput, selectedOption);
        console.log("Received request with prompt:", text);

        setIsLoading(true);
        setCountdown(15);

        // Start a timer that decrements the countdown every second
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown <= 1) {
                    clearInterval(timer); // Stop the timer when countdown reaches 0
                    setIsLoading(false); // Hide the loading indicator
                }
                return prevCountdown - 1;
            });
        }, 1000);

        try {

            const response = await fetch("/api/course-gen", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response');
            }

            const reader = response.body.getReader();
            let receivedText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                receivedText += new TextDecoder().decode(value);
            }

            // Store the received text in sessionStorage
            sessionStorage.setItem('openAIResponse', receivedText);

            // Redirect to /test-dash page
            router.push('/model-dash');
        } catch (error) {
            console.error('Error:', error);
        }
        finally {
            clearInterval(timer); // Ensure to clear the timer in case of API call completion or failure
            setIsLoading(false); // Stop loading regardless of success or failure
        }

    };





    return (
        <Suspense fallback={<div>Loading...</div>}>
            <>
                <Head>
                    <title>Create New Path</title>
                </Head>
                <div className="flex flex-col h-screen bg-black text-white">
                    <nav className="flex justify-end items-center p-4">
                        {/* The image/logo should go here if you need it */}
                        <div className="space-x-8 pr-10">
                            {/* Apply the Beatrice font using the class you created */}

                            <Link href="/" passHref>
                                <button
                                    className="text-xl font-medium font-avenir hover:underline"
                                    style={{ textDecorationColor: '#e8d28b' }} // Replace with your color
                                >
                                    App
                                </button>
                            </Link>

                            <button
                                className="text-xl font-medium font-avenir hover:underline"
                                style={{ textDecorationColor: '#e8d28b' }}
                                onClick={() => window.location.href = 'https://join.slack.com/t/fidutam/shared_invite/zt-2ahd1s1va-tZ2DwtA_IfNAk9O1eT9aPg'}
                            >
                                Slack
                            </button>


                            <button
                                className="text-xl font-medium font-avenir hover:underline"
                                style={{ textDecorationColor: '#e8d28b' }}
                                onClick={() => window.location.href = 'mailto:fidutamteam@gmail.com'}
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
                                    className="font-avenir"
                                />
                            </div>
                        </Link>
                    </nav>
                    <div className="flex flex-col h-screen bg-black text-black">
                        {/* Navigation bar and other layout components */}
                        <main className="flex-grow flex flex-col items-center justify-center">
                            <div className="max-w-2xl p-8 bg-[#fdf3db] rounded-2xl shadow-lg text-center">
                                <h1 className="text-5xl font-avenir font-medium mb-8">Confirm Your Path <div className="text-gray-900 text-xl">It can take about 15 sec to generate a course</div></h1>
                                <p className="text-2xl font-avenir mb-6">Topic: <div className="block text-xl font-avenir font-medium text-[#a37f0a] mb-4">{textInput}</div></p>
                                <p className="text-2xl font-avenir mb-6">Intensity: <div className="block text-xl font-avenir font-medium text-[#a37f0a] mb-4">{selectedOption}</div></p>
                                <div className="flex justify-center space-x-4">
                                    <Link href="/create-path" passHref>
                                        <button className="px-8 py-4 bg-[#e8d28b] text-black text-xl font-avenir font-semibold rounded-full shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#e8d28b] focus:ring-opacity-50">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        onClick={handleGoAhead}
                                        className="mt-0 px-10 py-4 bg-[#e8d28b] text-black text-xl font-avenir font-semibold rounded-full shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#e8d28b] focus:ring-opacity-50"
                                    >
                                        Go Ahead
                                    </button>
                                </div>
                            </div>
                        </main>
                        {isLoading && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="text-white text-3xl font-bold font-avenir">
                                    Generating Course: {countdown} seconds remaining
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>
        </Suspense>
    );
};
