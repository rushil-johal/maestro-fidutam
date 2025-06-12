'use client';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Analytics } from "@vercel/analytics/react";
import { IoIosArrowForward } from 'react-icons/io';

const Home = () => {

  return (
    <>
      <Head>
        <title>FIDUTAM</title>
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
                src="/fidulogo.png" // The path to your logo image file
                alt="Fidu logo"
                width={80} // Adjust width as needed
                height={80} // Adjust height as needed
                className="font-avenir"
              />
            </div>
          </Link>
        </nav>
        <main className="flex-grow flex flex-col items-center justify-center px-4">
          {/* Add padding below the logo */}
          <h1 className="text-7xl font-medium mb-6 font-avenir">Fidutam</h1>

          <div className="flex items-center mb-16 "> {/* Adjust 'mb-16' as needed for padding */}
            <Image
              src="/fidulogo.png" // The path to your logo image file
              alt="Fidu logo"
              width={200} // Set the width as needed
              height={200} // Set the height as needed
              priority
            />
          </div>
          <Link href="/create-path" passHref>
            <div className="text-center mb-12">
              <h1 className="text-5xl font-medium mb-8 font-avenir">Maestro</h1>
              <button className="bg-[#e8d28b] text-black px-6 py-2 rounded-full font-medium font-avenir">
                + New Path
              </button>
            </div>
          </Link>
          <div className="w-full max-w-4xl px-4">
            {/* Climate Change */}
            <Link href={{
              pathname: '/sure-to-proceed',
              query: { textInput: 'Climate Change', selectedOption: 'Balanced' }
            }} passHref>
              <div className="bg-[#fbf3db] rounded-lg p-6 mb-4 shadow-md flex justify-between items-center text-[#000000] font-avenir cursor-pointer">
                <h2 className="font-medium font-avenir">Climate Change</h2>
                <IoIosArrowForward size={24} />
              </div>
            </Link>

            {/* Menstrual Health */}
            <Link href={{
              pathname: '/sure-to-proceed',
              query: { textInput: 'Daily Healthy Habits', selectedOption: 'Balanced' }
            }} passHref>
              <div className="bg-[#fbf3db] rounded-lg p-6 mb-4 shadow-md flex justify-between items-center text-[#000000] font-avenir cursor-pointer">
                <h2 className="font-medium font-avenir">Daily Healthy Habits</h2>
                <IoIosArrowForward size={24} />
              </div>
            </Link>

            {/* Linear Algebra */}
            <Link href={{
              pathname: '/sure-to-proceed',
              query: { textInput: 'Linear Algebra', selectedOption: 'Balanced' }
            }} passHref>
              <div className="bg-[#fbf3db] rounded-lg p-6 mb-4 shadow-md flex justify-between items-center text-[#000000] font-avenir cursor-pointer">
                <h2 className="font-medium font-avenir">Linear Algebra</h2>
                <IoIosArrowForward size={24} />
              </div>
            </Link>
          </div>


        </main>
        <footer className="p-4">
          <div className="text-center">
            <Link href="/credits" passHref>
              <button className="bg-[#e8d28b] text-black px-6 py-2 rounded-full font-medium font-avenir">
                Development Acknowledgments
              </button>
            </Link>
          </div>
              <br></br>
               <br></br>
               <div className="text-center">
                          <Link href="/disclaimer" passHref>
              <button className="bg-[#e8d28b] text-black px-6 py-2 rounded-full font-medium font-avenir">
                Terms and Conditions
              </button>
            </Link>
               </div>
        </footer>
      </div>
    <Analytics />
    </>
  );
};

export default Home;



// Now all the core functioning and the backedn stuff. This is basically how the app should work

// 1st screen - User landing page 
// 2nd screen - Ask to generate course and how intensive leanring should be 
// 3rd screen  - Course Screen

// We pretty much design 1st screen fully. 2nd screen UI is done as well. We need to do 3rd screen. But before we get into 3rd screen, we just need to implement something in 2nd screen. In the input text box, the user enters what they want to learn. in the fieldset, they tell how intensively they want to learn the specific course that they input in the text box. Based on that info, a prompt is sent to Open AI GPT API, where GPT Generates a course as seen in screen 3. (10 Steps with low diffculty for Quickly, 30 Steps starting from low to high diffciult for Deeply, and 20 steps with low to medium difficult for Balanced) Each step, has three youtube videos pertaining to the learning step, and as you can see, it is presented in khan acaademy course style



