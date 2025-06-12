"use client"

import React from 'react';
import {FiLinkedin} from 'react-icons/fi';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function Credits() {
    return (
        <>
            <Head>
                <title>Credits</title>
            </Head>
            <div className="flex flex-col h-screen bg-black text-white">
                <nav className="flex justify-end items-center p-4">
                    <div className="space-x-8 pr-10">
                        <Link href="/" passHref>
                            <button
                                className="text-xl font-medium font-avenir hover:underline"
                                style={{ textDecorationColor: '#e8d28b' }}
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
                src="/fidulogo.png" // The path to your logo image file
                alt="Fidu logo"
                width={80} // Adjust width as needed
                height={80} // Adjust height as needed
                className="font-avenir"
              />
            </div>
          </Link>
                </nav>
                <main className="flex-grow flex flex-col items-center justify-center">
                    <div className="max-w-4xl p-8 bg-[#1A1A1A] rounded-2xl shadow-lg text-center">
                        <h1 className="text-3xl font-avenir text-[#e8d28b] font-medium mb-8">Development Acknowledgements</h1>
                        <p className="text-xl font-avenir text-white mb-4">
                             Project Lead : Nicolas Gertler
                               <a href="https://www.linkedin.com/in/nicolas-gertler/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-2">
                              <FiLinkedin className="text-[#e8d28b] text-2xl" />
                                     </a>
                                                     <br></br>
                            Created By : Rithvik Sabnekar
                            <a href="https://www.linkedin.com/in/rithvik-sabnekar-1971a3266/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-2">
                                <FiLinkedin className="text-[#e8d28b] text-2xl" />
                                 </a>
                                 <br></br>
                            Special Thanks to Emilie Garrabrant
                            <a href="https://www.linkedin.com/in/emiliegarrabrant/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center ml-2">
                                <FiLinkedin className="text-[#e8d28b] text-2xl" />
                                 </a>
                        </p>
                        {/* Add more developer entries as needed */}
                    </div>
                </main>
            </div>
        </>
    );
}
