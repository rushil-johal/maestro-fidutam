// pages/create-path.js

'use client';

import { useState } from 'react';
import Head from 'next/head';
// import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SureToProceed() {
  const [textInput, setTextInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('Quick');


  return (
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
        <main className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-16 font-avenir">Generate A Course</h1>
          <div className="max-w-3xl max-h-[500px] min-w-[700px] min-h-[600px] p-8 bg-[#fdf3db] rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div>
                <label htmlFor="learningTopic" className="block text-2xl font-avenir font-medium text-black">
                  What do you want to learn?
                </label>
                <input
                  type="text"
                  id="learningTopic"
                  name="learningTopic"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="mt-2 block w-full rounded-3xl border-2 border-[#e8d28b] p-4 text-lg font-avenir font-medium text-black"
                  placeholder="e.g., Machine Learning"
                  required
                />
              </div>
              <fieldset className="mb-4">
                <legend className="block text-2xl font-avenir font-medium text-black mb-4">
                  Select an Option:
                </legend>
                <div className="flex flex-col">
                  <label className="flex items-center mb-2 p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-[#e8d28b] text-black font-bold font-avenir">
                    <input
                      type="radio"
                      name="option"
                      value="Quick"
                      checked={selectedOption === 'Quick'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="form-radio h-5 w-5 text-[#e8d28b] mr-4"
                    />
                    <div className="block text-xl font-avenir font-medium text-black mb-4">
                      Quick
                      <div className="text-gray-600 text-xs">I want to learn this topic ASAP</div>
                    </div>
                  </label>
                  <label className="flex items-center mb-2 p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-[#e8d28b] text-black font-bold font-avenir">
                    <input
                      type="radio"
                      name="option"
                      value="Balanced"
                      checked={selectedOption === 'Balanced'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="form-radio h-5 w-5 text-[#e8d28b] mr-4"
                    />
                    <div className="block text-xl font-avenir font-medium text-black mb-4">
                      Balanced
                      <div className="text-gray-600 text-xs">I want to learn this topic at a moderate pace</div>
                    </div>
                  </label>
                  <label className="flex items-center mb-2 p-4 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:bg-[#e8d28b] text-black font-bold font-avenir">
                    <input
                      type="radio"
                      name="option"
                      value="Deeply"
                      checked={selectedOption === 'Deeply'}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="form-radio h-5 w-5 text-[#e8d28b] mr-4"
                    />
                    <div className="block text-xl font-avenir font-medium text-black mb-4">
                      Deeply
                      <div className="text-gray-600 text-xs">I want to learn this topic in a deep manner</div>
                    </div>
                  </label>
                </div>
              </fieldset>
              <div className="text-center">
                <Link
                  href={{
                    pathname: '/sure-to-proceed',
                    query: { textInput, selectedOption },
                  }}
                >
                  <p className="bg-[#e8d28b] text-black ml-4 px-4 py-4 rounded-full font-bold font-avenir">
                    Generate Path
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
